/**
 * GlyphTiles — row of 3 dark tiles, each with a 150px line-art SVG
 * (concentric / overlapping / dashed circles, stroke #a6a6a6, 1px) rotating
 * once per 40s (pure CSS; paused under reduced motion), a mono caption and
 * one grey sentence.
 */

function ConcentricCircles() {
	return (
		<svg viewBox="0 0 150 150" fill="none" aria-hidden="true">
			{[16, 32, 48, 64].map((r) => (
				<circle key={r} cx="75" cy="75" r={r} stroke="currentColor" strokeWidth="1" />
			))}
			<circle cx="75" cy="75" r="4" fill="currentColor" opacity="0.6" />
		</svg>
	);
}

function OverlappingCircles() {
	return (
		<svg viewBox="0 0 150 150" fill="none" aria-hidden="true">
			<circle cx="55" cy="75" r="36" stroke="currentColor" strokeWidth="1" />
			<circle cx="95" cy="75" r="36" stroke="currentColor" strokeWidth="1" />
			<circle cx="75" cy="52" r="36" stroke="currentColor" strokeWidth="1" opacity="0.65" />
			<circle cx="75" cy="98" r="36" stroke="currentColor" strokeWidth="1" opacity="0.65" />
		</svg>
	);
}

function DashedCircles() {
	return (
		<svg viewBox="0 0 150 150" fill="none" aria-hidden="true">
			<circle cx="75" cy="75" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
			<circle cx="75" cy="75" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" opacity="0.75" />
			<circle cx="75" cy="75" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" />
		</svg>
	);
}

export interface GlyphTileData {
	caption: string;
	sentence: string;
}

const GLYPHS = [ConcentricCircles, OverlappingCircles, DashedCircles];

export function GlyphTiles({ tiles }: { tiles: GlyphTileData[] }) {
	return (
		<div className="glyph-tiles">
			{tiles.map((tile, i) => {
				const Glyph = GLYPHS[i % GLYPHS.length];
				return (
					<div className="glyph-tile" key={tile.caption}>
						<div className="glyph-figure">
							<Glyph />
						</div>
						<p className="glyph-caption">{tile.caption}</p>
						<p className="glyph-sentence">{tile.sentence}</p>
					</div>
				);
			})}
		</div>
	);
}
