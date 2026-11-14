"use client";

import { TextureCanvas } from "@/components/ui/TextureCanvas";

export function ContactHeroTexture() {
	return (
		<div className="contact-texture-layer" aria-hidden="true">
			<TextureCanvas variant="hero" />
		</div>
	);
}
