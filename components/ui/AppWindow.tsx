import type { ReactNode } from "react";

interface AppWindowProps {
	/** Window title, left side of the header row. */
	title: string;
	/** Optional label, right side of the header row. */
	label?: string;
	children: ReactNode;
	className?: string;
}

/**
 * AppWindow — dark window panel: mono header row (title left, label right),
 * 1px bottom border, body in mono 14px/1.85 #a6a6a6.
 */
export function AppWindow({ title, label, children, className }: AppWindowProps) {
	return (
		<div className={`app-window${className ? ` ${className}` : ""}`}>
			<div className="app-window-header">
				<span>{title}</span>
				{label && <span className="app-window-label">{label}</span>}
			</div>
			{children}
		</div>
	);
}
