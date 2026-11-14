"use client";

import { useId, useRef } from "react";

interface TabsRowProps {
	tabs: string[];
	active: number;
	onChange: (index: number) => void;
}

/**
 * TabsRow — mono 13px tabs, inactive #8c8c8c, active #f4f4f4 with a 1px
 * underline. Keyboard-operable: arrow keys move selection (Left/Right/Home/
 * End), roving tabindex, role=tablist.
 */
export function TabsRow({ tabs, active, onChange }: TabsRowProps) {
	const baseId = useId();
	const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

	const onKeyDown = (event: React.KeyboardEvent) => {
		let from = tabRefs.current.indexOf(document.activeElement as HTMLButtonElement);
		if (from === -1) from = active;
		let next: number | null = null;
		if (event.key === "ArrowRight") next = (from + 1) % tabs.length;
		else if (event.key === "ArrowLeft") next = (from - 1 + tabs.length) % tabs.length;
		else if (event.key === "Home") next = 0;
		else if (event.key === "End") next = tabs.length - 1;
		if (next !== null) {
			event.preventDefault();
			onChange(next);
			tabRefs.current[next]?.focus();
		}
	};

	return (
		<div className="tabs-row" role="tablist" onKeyDown={onKeyDown}>
			{tabs.map((tab, i) => (
				<button
					key={tab}
					ref={(el) => {
						tabRefs.current[i] = el;
					}}
					className="tab"
					role="tab"
					id={`${baseId}-tab-${i}`}
					aria-selected={i === active}
					aria-controls={`${baseId}-panel`}
					data-active={i === active}
					tabIndex={i === active ? 0 : -1}
					onClick={() => onChange(i)}
				>
					{tab}
				</button>
			))}
		</div>
	);
}

export function tabPanelId(baseId: string) {
	return `${baseId}-panel`;
}
