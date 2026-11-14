import type { ReactNode } from "react";

export interface CellData {
	label: string;
	title: ReactNode;
	sentence?: string;
	highlight?: boolean;
	code?: string;
}

/**
 * CellRow — ONE bordered grid (1px #242424, radius 16px, bg #0d0d0d) with
 * equal cells separated only by 1px hairlines. No separate cards.
 */
export function CellRow({
	cells,
	ariaLabel,
}: {
	cells: CellData[];
	ariaLabel?: string;
}) {
	return (
		<div
			className="cell-row"
			style={{ "--cells": cells.length } as React.CSSProperties}
			role="group"
			aria-label={ariaLabel}
		>
			{cells.map((cell, i) => (
				<div
					className="cell"
					key={`${cell.label}-${i}`}
					data-highlight={cell.highlight || undefined}
					id={cell.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
				>
					<p className="cell-label">{cell.label}</p>
					<p className="cell-title">
						{cell.title}
						{cell.code ? (
							<>
								{" "}
								<span className="code-chip">{cell.code}</span>
							</>
						) : null}
					</p>
					{cell.sentence && <p className="cell-sentence">{cell.sentence}</p>}
				</div>
			))}
		</div>
	);
}
