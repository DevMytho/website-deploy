import type { ComponentType, CSSProperties } from "react";

/**
 * Type surface for the vendored Originkit "folding-particle-shell" compiled
 * module (components/ui/folding-particle-shell.mjs). Props extracted from the
 * module's own defaults — nothing guessed.
 */
export interface FoldingParticleShellProps {
	speed?: number;
	scale?: number;
	fold?: number;
	density?: number;
	color?: string;
	background?: string;
	style?: CSSProperties;
	advanced?: Record<string, unknown>;
}

declare const FoldingParticleShell: ComponentType<FoldingParticleShellProps>;
export default FoldingParticleShell;
