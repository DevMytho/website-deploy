"use client";

/**
 * TextureCanvas — stage background texture (BACKGROUND UPGRADE spec).
 *
 * Primary: Componentry "Silk Aurora" WebGL shader (componentry.dev/r/silk-aurora),
 * adapted for this design system:
 *   - forced grayscale: all four palette uniforms pinned inside the
 *     #0d0d0d–#3a3a3a luminance range (no hue anywhere);
 *   - the warm cream glint in the upstream shader neutralized to pure white;
 *   - device pixel ratio capped at 1.5 (upstream caps at 2);
 *   - requestAnimationFrame paused whenever the stage is off-screen
 *     (IntersectionObserver) or the tab is hidden — so only stages actually
 *     on screen run, keeping one active shader at a time in practice;
 *   - prefers-reduced-motion: a single static frame, no drift, grain kept.
 *
 * Fallback (WebGL unavailable or the component throws): a 2D canvas
 * contour-line ripple — 1.5px lines every ~9px, #2a2a2a on #0d0d0d, slow
 * drift, soft radial highlight — per the same spec.
 */

import * as React from "react";
import { ContourCanvas } from "@/components/ui/ContourCanvas";

export type TextureVariant = "hero" | "dim";

/* Grayscale palette — luminance range #0d0d0d..#3a3a3a only */
const BASE = "#0d0d0d";
const MID = "#1b1b1b";
const SHEEN = "#3a3a3a";
const ACCENT = "#2a2a2a";

const MAX_DPR = 1.5;

const SILK_VERTEX = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/* Componentry "Silk Aurora" fragment shader (MIT, componentry.dev), with the
   hardcoded warm glint vec3(1.0,0.93,0.82) neutralized to pure white. */
const SILK_FRAGMENT = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform float u_speed;
uniform float u_intensity;
uniform float u_grain;
uniform float u_vignette;
uniform vec3 u_base;
uniform vec3 u_mid;
uniform vec3 u_sheen;
uniform vec3 u_accent;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.93, 289.17))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.82, 0.57, -0.57, 0.82);

  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p = rot * p * 2.03;
    amp *= 0.5;
  }

  return value;
}

float ribbon(vec2 p, float offset, float width, float softness) {
  float y = p.y + sin(p.x * 1.8 + offset) * 0.18;
  y += sin(p.x * 4.2 - offset * 0.7) * 0.045;
  return smoothstep(width + softness, width, abs(y));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.12 * u_speed;

  vec2 silk = p;
  silk.x += fbm(p * 1.6 + vec2(t * 0.8, -t * 0.35)) * 0.16;
  silk.y += fbm(p * 2.2 + vec2(-t * 0.25, t * 0.7)) * 0.10;

  float veilA = ribbon(silk + vec2(-0.18, 0.08), t * 2.1, 0.055, 0.22);
  float veilB = ribbon(silk * vec2(0.86, 1.18) + vec2(0.2, -0.14), -t * 2.8 + 1.7, 0.038, 0.18);
  float veilC = ribbon(silk * vec2(1.18, 0.9) + vec2(-0.08, 0.24), t * 1.4 - 2.1, 0.03, 0.16);

  float atmosphere = fbm(p * 1.35 + vec2(t * 0.22, -t * 0.1));
  float pearlescent = pow(max(0.0, sin((p.x - p.y) * 7.5 + atmosphere * 4.0 - t * 2.5)), 5.0);
  float glint = pow(max(0.0, noise(gl_FragCoord.xy * 0.065 + t * 18.0) - 0.72), 5.0);

  vec3 col = u_base;
  col = mix(col, u_mid, smoothstep(-0.45, 0.75, p.y + atmosphere * 0.75));
  col += u_accent * veilA * 0.72 * u_intensity;
  col += u_sheen * veilB * 0.64 * u_intensity;
  col += mix(u_sheen, u_accent, 0.35) * veilC * 0.42 * u_intensity;
  col += u_sheen * pearlescent * 0.075 * u_intensity;
  col += vec3(1.0) * glint * 0.22 * u_intensity;

  float vignette = smoothstep(1.25, 0.22, length(p));
  col *= mix(1.0 - u_vignette * 0.42, 1.06, vignette);

  float grain = (hash(gl_FragCoord.xy + t * 90.0) - 0.5) * 0.08 * u_grain;
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function hexToRgb01(hex: string): [number, number, number] {
	return [
		parseInt(hex.slice(1, 3), 16) / 255,
		parseInt(hex.slice(3, 5), 16) / 255,
		parseInt(hex.slice(5, 7), 16) / 255,
	];
}

/* ------------------------------------------------------------------ */

interface TextureCanvasProps {
	variant: TextureVariant;
	/** Additional scroll parallax handled by the Stage wrapper. */
	className?: string;
}

export function TextureCanvas({ variant, className }: TextureCanvasProps) {
	const [mode, setMode] = React.useState<"pending" | "silk" | "contour">(
		"pending",
	);

	return (
		<div
			className={`texture-layer ${variant === "hero" ? "hero-texture" : "dimmed-texture"}${className ? ` ${className}` : ""}`}
			aria-hidden="true"
		>
			{mode !== "contour" && (
				<SilkShader
					variant={variant}
					onFailure={() => setMode("contour")}
					visible={mode === "silk"}
					onReady={() => setMode((m) => (m === "pending" ? "silk" : m))}
				/>
			)}
			{mode === "contour" && <ContourCanvas />}
			{/* While WebGL resolves, keep the stage base color visible */}
			{mode === "pending" && (
				<div style={{ position: "absolute", inset: 0, background: BASE }} />
			)}
		</div>
	);
}

/* ------------------------------------------------------------------ */

class ShaderErrorBoundary extends React.Component<
	{ children: React.ReactNode; onFailure: () => void },
	{ failed: boolean }
> {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch() {
		this.props.onFailure();
	}
	render() {
		return this.state.failed ? null : this.props.children;
	}
}

interface SilkShaderProps {
	variant: TextureVariant;
	visible: boolean;
	onReady: () => void;
	onFailure: () => void;
}

function SilkShader({ variant, visible, onReady, onFailure }: SilkShaderProps) {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
	const readyRef = React.useRef(false);

	React.useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let gl: WebGLRenderingContext | null = null;
		let rafId = 0;
		let running = false;
		let inView = false;
		let cleaned = false;

		const intensity = variant === "hero" ? 1 : 0.75;

		try {
			gl = canvas.getContext("webgl", { antialias: false, alpha: false });
		} catch {
			gl = null;
		}
		if (!gl) {
			onFailure();
			return;
		}

		const compile = (type: number, source: string) => {
			const shader = gl!.createShader(type)!;
			gl!.shaderSource(shader, source);
			gl!.compileShader(shader);
			if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
				gl!.deleteShader(shader);
				return null;
			}
			return shader;
		};

		const vs = compile(gl.VERTEX_SHADER, SILK_VERTEX);
		const fs = compile(gl.FRAGMENT_SHADER, SILK_FRAGMENT);
		if (!vs || !fs) {
			onFailure();
			return;
		}

		const program = gl.createProgram()!;
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			onFailure();
			return;
		}
		gl.useProgram(program);

		const position = gl.getAttribLocation(program, "position");
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
			gl.STATIC_DRAW,
		);
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

		const uniforms = [
			"u_res",
			"u_time",
			"u_speed",
			"u_intensity",
			"u_grain",
			"u_vignette",
			"u_base",
			"u_mid",
			"u_sheen",
			"u_accent",
		].map((n) => gl!.getUniformLocation(program, n));

		if (uniforms.some((u) => !u)) {
			onFailure();
			return;
		}
		const [
			uRes,
			uTime,
			uSpeed,
			uIntensity,
			uGrain,
			uVignette,
			uBase,
			uMid,
			uSheen,
			uAccent,
		] = uniforms as WebGLUniformLocation[];

		/* Grayscale palette */
		const [br, bg2, bb] = hexToRgb01(BASE);
		const [mr, mg, mb] = hexToRgb01(MID);
		const [sr, sg, sb] = hexToRgb01(SHEEN);
		const [ar, ag, ab] = hexToRgb01(ACCENT);
		gl.uniform3f(uBase, br, bg2, bb);
		gl.uniform3f(uMid, mr, mg, mb);
		gl.uniform3f(uSheen, sr, sg, sb);
		gl.uniform3f(uAccent, ar, ag, ab);
		gl.uniform1f(uGrain, 0.85);
		gl.uniform1f(uVignette, 0.55);
		gl.uniform1f(uSpeed, 0.55);
		gl.uniform1f(uIntensity, intensity);

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			const rect = container.getBoundingClientRect();
			canvas.width = Math.max(1, Math.floor(rect.width * dpr));
			canvas.height = Math.max(1, Math.floor(rect.height * dpr));
			gl!.viewport(0, 0, canvas.width, canvas.height);
			gl!.uniform2f(uRes, canvas.width, canvas.height);
		};
		resize();
		const ro = new ResizeObserver(() => {
			if (!inView) return;
			resize();
			if (reducedMotion) drawFrame(true);
		});
		ro.observe(container);

		const start = performance.now();

		function drawFrame(staticFrame: boolean) {
			if (!gl) return;
			const now = performance.now();
			gl.uniform1f(
				uTime,
				staticFrame ? 40 : (now - start) / 1000, // fixed t for the static frame
			);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		}

		function ensureLoop() {
			if (running || cleaned) return;
			running = true;
			const loop = (now: number) => {
				if (!running) return;
				drawFrame(false);
				rafId = requestAnimationFrame(loop);
			};
			rafId = requestAnimationFrame(loop);
		}

		function pauseLoop() {
			running = false;
			cancelAnimationFrame(rafId);
		}

		drawFrame(reducedMotion); // first frame
		if (!readyRef.current) {
			readyRef.current = true;
			onReady();
		}

		const io = new IntersectionObserver(
			(entries) => {
				inView = entries[0]?.isIntersecting ?? false;
				if (reducedMotion) {
					if (inView) drawFrame(true);
					return;
				}
				if (inView) ensureLoop();
				else pauseLoop();
			},
			{ threshold: 0 },
		);
		io.observe(container);

		const onVisibility = () => {
			if (reducedMotion || !inView) return;
			if (document.hidden) pauseLoop();
			else ensureLoop();
		};
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			cleaned = true;
			pauseLoop();
			io.disconnect();
			ro.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
			gl?.deleteBuffer(buffer);
			gl?.deleteProgram(program);
			gl?.deleteShader(vs);
			gl?.deleteShader(fs);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [variant]);

	return (
		<div
			ref={containerRef}
			style={{ position: "absolute", inset: 0, visibility: visible ? "visible" : "hidden" }}
		>
			<canvas
				ref={canvasRef}
				style={{ width: "100%", height: "100%", display: "block" }}
			/>
		</div>
	);
}

export { ShaderErrorBoundary };
