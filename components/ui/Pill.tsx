interface PillProps {
	children: React.ReactNode;
	variant?: "default" | "on";
	className?: string;
}

export function Pill({ children, variant = "default", className }: PillProps) {
	return (
		<span className={`pill${variant === "on" ? " pill-on" : ""}${className ? ` ${className}` : ""}`}>
			{children}
		</span>
	);
}
