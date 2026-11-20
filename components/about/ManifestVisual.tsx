export type ManifestVisual = "project" | "stage" | "input" | "cloud" | "mode" | "review";

export const MANIFEST_VISUALS: ManifestVisual[] = [
	"project",
	"stage",
	"input",
	"cloud",
	"mode",
	"review",
];

/**
 * Six original grayscale diagrams for the about manifest. They are drawn as
 * SVG so they stay sharp at any size, render instantly, and cannot introduce
 * hue into the system. Each one maps to a manifest key.
 */
export function ManifestVisual({ variant }: { variant: ManifestVisual }) {
	const svg = {
		viewBox: "0 0 480 270",
		preserveAspectRatio: "xMidYMid slice",
		className: "about-visual",
		"aria-hidden": true,
		focusable: "false",
	} as const;

	switch (variant) {
		case "project":
			return (
				<svg {...svg}>
					<defs>
						<radialGradient id="av-project-glow" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#f4f4f4" stopOpacity="0.55" />
							<stop offset="100%" stopColor="#f4f4f4" stopOpacity="0" />
						</radialGradient>
					</defs>
					<rect width="480" height="270" fill="#0b0b0b" />
					<g stroke="#252525" strokeWidth="1">
						{[12, 58, 104, 150, 196, 242, 288].map((y) => (
							<line key={`l-${y}`} x1="0" y1={y} x2="240" y2="137" />
						))}
						{[12, 58, 104, 150, 196, 242, 288].map((y) => (
							<line key={`r-${y}`} x1="480" y1={y} x2="240" y2="137" />
						))}
						{[24, 86, 148, 210, 272, 334, 396, 458].map((x) => (
							<line key={`t-${x}`} x1={x} y1="0" x2="240" y2="137" />
						))}
						{[24, 86, 148, 210, 272, 334, 396, 458].map((x) => (
							<line key={`b-${x}`} x1={x} y1="270" x2="240" y2="137" />
						))}
					</g>
					<g stroke="#3a3a3a" strokeWidth="1" opacity="0.65">
						<line x1="86" y1="0" x2="240" y2="137" />
						<line x1="394" y1="0" x2="240" y2="137" />
						<line x1="86" y1="270" x2="240" y2="137" />
						<line x1="394" y1="270" x2="240" y2="137" />
						<line x1="0" y1="86" x2="240" y2="137" />
						<line x1="480" y1="86" x2="240" y2="137" />
					</g>
					<circle cx="240" cy="137" r="96" fill="url(#av-project-glow)" opacity="0.5" />
					<circle cx="240" cy="137" r="13" fill="none" stroke="#f4f4f4" strokeOpacity="0.16" />
					<circle cx="240" cy="137" r="2.4" fill="#f4f4f4" />
					<g fill="#8c8c8c">
						<circle cx="113" cy="68" r="1.4" opacity="0.7" />
						<circle cx="367" cy="72" r="1.4" opacity="0.5" />
						<circle cx="154" cy="216" r="1.4" opacity="0.6" />
						<circle cx="338" cy="208" r="1.4" opacity="0.4" />
					</g>
				</svg>
			);

		case "stage":
			return (
				<svg {...svg}>
					<rect width="480" height="270" fill="#0b0b0b" />
					<g stroke="#242424" strokeWidth="1">
						<line x1="0" y1="230" x2="480" y2="230" />
						<line x1="0" y1="240" x2="480" y2="240" opacity="0.55" />
						<line x1="46" y1="252" x2="434" y2="252" opacity="0.35" />
					</g>
					<g stroke="#3d3d3d" strokeWidth="1" fill="none">
						<line x1="140" y1="58" x2="140" y2="230" />
						<line x1="240" y1="44" x2="240" y2="230" />
						<line x1="340" y1="58" x2="340" y2="230" />
						<line x1="140" y1="58" x2="340" y2="58" />
						<line x1="140" y1="112" x2="340" y2="112" />
						<line x1="140" y1="172" x2="340" y2="172" />
						<line x1="140" y1="58" x2="240" y2="112" />
						<line x1="240" y1="112" x2="340" y2="58" />
						<line x1="140" y1="112" x2="240" y2="172" />
						<line x1="240" y1="172" x2="340" y2="112" />
						<line x1="140" y1="172" x2="240" y2="230" />
						<line x1="240" y1="230" x2="340" y2="172" />
					</g>
					<g stroke="#5a5a5a" strokeWidth="1" opacity="0.5" strokeDasharray="4 9">
						<rect x="116" y="28" width="248" height="208" fill="none" />
						<line x1="116" y1="58" x2="364" y2="58" />
					</g>
					<line x1="116" y1="58" x2="364" y2="58" stroke="#f4f4f4" strokeOpacity="0.5" />
					<circle cx="240" cy="44" r="2" fill="#f4f4f4" opacity="0.65" />
					<g stroke="#2a2a2a" strokeWidth="1">
						<line x1="0" y1="196" x2="96" y2="230" />
						<line x1="480" y1="196" x2="384" y2="230" />
					</g>
				</svg>
			);

		case "input":
			return (
				<svg {...svg}>
					<defs>
						<linearGradient id="av-input-edge" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stopColor="#f4f4f4" stopOpacity="0" />
							<stop offset="55%" stopColor="#f4f4f4" stopOpacity="0.55" />
							<stop offset="100%" stopColor="#f4f4f4" stopOpacity="0" />
						</linearGradient>
					</defs>
					<rect width="480" height="270" fill="#0b0b0b" />
					<g stroke="#252525" fill="#0e0e0e">
						<rect x="78" y="42" width="296" height="160" rx="6" opacity="0.8" />
						<rect x="94" y="58" width="296" height="160" rx="6" fill="#101010" />
						<rect x="110" y="74" width="296" height="160" rx="6" fill="#131313" />
					</g>
					<g stroke="#2c2c2c" strokeWidth="1">
						<line x1="166" y1="92" x2="166" y2="218" />
						<line x1="222" y1="92" x2="222" y2="218" />
						<line x1="278" y1="92" x2="278" y2="218" />
						<line x1="334" y1="92" x2="334" y2="218" />
						<line x1="126" y1="120" x2="390" y2="120" />
						<line x1="126" y1="156" x2="390" y2="156" />
						<line x1="126" y1="192" x2="390" y2="192" />
					</g>
					<line x1="110" y1="74.5" x2="406" y2="74.5" stroke="url(#av-input-edge)" />
					<rect x="110" y="74" width="296" height="160" rx="6" fill="none" stroke="#464646" />
					<circle cx="126" cy="90" r="2" fill="#f4f4f4" opacity="0.45" />
					<line x1="136" y1="90" x2="176" y2="90" stroke="#3a3a3a" />
				</svg>
			);

		case "cloud":
			return (
				<svg {...svg}>
					<defs>
						<radialGradient id="av-cloud-glow" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#f4f4f4" stopOpacity="0.26" />
							<stop offset="100%" stopColor="#f4f4f4" stopOpacity="0" />
						</radialGradient>
					</defs>
					<rect width="480" height="270" fill="#0a0a0a" />
					<circle cx="240" cy="137" r="78" fill="url(#av-cloud-glow)" />
					<g stroke="#353535" strokeWidth="1" fill="none">
						<rect x="2" y="2" width="476" height="266" />
						<rect x="54" y="42" width="372" height="186" opacity="0.95" />
						<rect x="104" y="77" width="272" height="116" opacity="0.9" />
						<rect x="144" y="102" width="192" height="66" opacity="0.85" />
						<rect x="176" y="120" width="128" height="30" opacity="0.8" />
					</g>
					<g stroke="#2b2b2b" strokeWidth="1">
						<line x1="0" y1="0" x2="240" y2="137" />
						<line x1="480" y1="0" x2="240" y2="137" />
						<line x1="0" y1="270" x2="240" y2="137" />
						<line x1="480" y1="270" x2="240" y2="137" />
					</g>
					<g fill="#f4f4f4">
						{[118, 142, 200].map((y, i) => (
							<circle key={`l-${y}`} cx="58" cy={y} r="1.3" opacity={0.7 - i * 0.12} />
						))}
						{[118, 142, 200].map((y, i) => (
							<circle key={`r-${y}`} cx="422" cy={y} r="1.3" opacity={0.7 - i * 0.12} />
						))}
						{[96, 118, 152].map((y, i) => (
							<circle key={`l2-${y}`} cx="108" cy={y} r="1.1" opacity={0.55 - i * 0.09} />
						))}
						{[96, 118, 152].map((y, i) => (
							<circle key={`r2-${y}`} cx="372" cy={y} r="1.1" opacity={0.55 - i * 0.09} />
						))}
					</g>
					<line x1="104" y1="192" x2="376" y2="192" stroke="#4a4a4a" opacity="0.7" />
					<circle cx="240" cy="137" r="1.8" fill="#f4f4f4" opacity="0.9" />
				</svg>
			);

		case "mode":
			return (
				<svg {...svg}>
					<defs>
						<linearGradient id="av-mode-beam" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stopColor="#f4f4f4" stopOpacity="0" />
							<stop offset="50%" stopColor="#f4f4f4" stopOpacity="0.75" />
							<stop offset="100%" stopColor="#f4f4f4" stopOpacity="0" />
						</linearGradient>
					</defs>
					<rect width="480" height="270" fill="#0b0b0b" />
					<ellipse cx="240" cy="232" rx="128" ry="17" fill="#0d0d0d" stroke="#252525" />
					<g stroke="#4a4a4a" strokeWidth="1" fill="rgba(244,244,244,0.025)">
						<polygon points="240,70 304,102 240,134 176,102" />
						<polygon points="176,102 176,186 240,218 240,134" />
						<polygon points="304,102 304,186 240,218 240,134" />
					</g>
					<g stroke="#2e2e2e" strokeWidth="1" opacity="0.8">
						<line x1="176" y1="144" x2="304" y2="144" />
						<line x1="176" y1="102" x2="240" y2="218" opacity="0.35" />
					</g>
					<line x1="64" y1="42" x2="240" y2="100" stroke="url(#av-mode-beam)" strokeWidth="1.4" />
					<line
						x1="240"
						y1="100"
						x2="404"
						y2="52"
						stroke="#3a3a3a"
						strokeDasharray="5 9"
						opacity="0.8"
					/>
					<circle cx="240" cy="166" r="10" fill="none" stroke="#6a6a6a" />
					<circle cx="240" cy="166" r="2" fill="#f4f4f4" opacity="0.7" />
					<g stroke="#f4f4f4" strokeOpacity="0.18" strokeWidth="1">
						<line x1="170" y1="232" x2="310" y2="232" />
					</g>
				</svg>
			);

		case "review":
			return (
				<svg {...svg}>
					<defs>
						<radialGradient id="av-review-glow" cx="68%" cy="44%" r="58%">
							<stop offset="0%" stopColor="#f4f4f4" stopOpacity="0.24" />
							<stop offset="100%" stopColor="#f4f4f4" stopOpacity="0" />
						</radialGradient>
					</defs>
					<rect width="480" height="270" fill="#0a0a0a" />
					<rect width="480" height="270" fill="url(#av-review-glow)" />
					<g stroke="#363636" fill="none">
						{[94, 202, 310].map((x) =>
							[42, 112].map((y) => (
								<rect
									key={`${x}-${y}`}
									x={x}
									y={y}
									width="84"
									height="54"
									rx="3"
									strokeOpacity={y === 112 && x === 202 ? 1 : 0.8}
								/>
							)),
						)}
					</g>
					<g stroke="#3c3c3c" strokeWidth="1">
						{[94, 202, 310].map((x) =>
							[42, 112].map((y) => (
								<g key={`bars-${x}-${y}`}>
									<line x1={x + 12} y1={y + 18} x2={x + 58} y2={y + 18} />
									<line x1={x + 12} y1={y + 30} x2={x + 44} y2={y + 30} />
									<line x1={x + 12} y1={y + 42} x2={x + 52} y2={y + 42} opacity="0.7" />
								</g>
							)),
						)}
					</g>
					<g stroke="#5c5c5c" strokeWidth="1">
						<line x1="214" y1="130" x2="260" y2="130" />
						<line x1="214" y1="142" x2="246" y2="142" />
						<line x1="214" y1="154" x2="254" y2="154" />
					</g>
					<path
						d="M 20 270 C 34 216 68 194 112 194 C 148 194 170 210 180 238 L 190 270 Z"
						fill="#0a0a0a"
						stroke="#3d3d3d"
						strokeWidth="1"
					/>
					<circle cx="112" cy="174" r="24" fill="#0a0a0a" stroke="#494949" strokeWidth="1" />
					<path
						d="M 130 160 C 139 167 141 184 136 196"
						fill="none"
						stroke="#8c8c8c"
						strokeOpacity="0.55"
						strokeWidth="1"
					/>
					<path
						d="M 176 236 C 180 248 184 260 186 270"
						fill="none"
						stroke="#6a6a6a"
						strokeOpacity="0.5"
						strokeWidth="1"
					/>
				</svg>
			);
	}
}
