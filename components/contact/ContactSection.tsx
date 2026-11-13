"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeroTexture } from "@/components/contact/ContactHeroTexture";
import { ContactToolsSection } from "@/components/contact/ContactToolsSection";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactSection() {
	const shouldReduce = useReducedMotion();

	const headingWords = ["Let's", "Chat"];

	const wordVariants: Variants = {
		hidden: { opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 16 },
		show: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				delay: shouldReduce ? 0 : i * 0.08,
				ease: EASE,
			},
		}),
	};

	const itemsContainerVariants: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduce ? 0 : 0.08,
				delayChildren: shouldReduce ? 0 : 0.2,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 12 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: EASE },
		},
	};

	return (
		<main id="content">
			{/* ─────────────────────────────────────────────────────────────
			    Hero Section (630px tall, full-bleed, near-black)
			    ───────────────────────────────────────────────────────────── */}
			<section className="contact-hero" aria-label="Contact hero">
				{/* Grayscale smoky silk texture on the left ~60% */}
				<ContactHeroTexture />

				{/* Centered 866px 2-column container */}
				<div className="contact-container">
					<div className="contact-grid">
						{/* Left Column: Heading & Contact Details */}
						<div className="contact-left">
							<motion.p
								className="contact-kicker"
								initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								09 / Contact
							</motion.p>

							<h1 className="contact-heading" aria-label="Let's Chat">
								{headingWords.map((word, idx) => (
									<motion.span
										key={word}
										custom={idx}
										variants={wordVariants}
										initial="hidden"
										animate="show"
										className="contact-heading-word"
									>
										{word}
									</motion.span>
								))}
							</h1>

							<motion.p
								className="contact-lede"
								initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: shouldReduce ? 0 : 0.16 }}
							>
								WCI is being built in the open. Send feedback, ask about V1, or tell us which check should come next.
							</motion.p>

							{/* Three contact items with 28px gaps */}
							<motion.div
								className="contact-items"
								variants={itemsContainerVariants}
								initial="hidden"
								animate="show"
							>
								{/* 1. Email */}
								<motion.div variants={itemVariants} className="contact-item">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="contact-item-icon"
										aria-hidden="true"
									>
										<rect x="2" y="4" width="20" height="16" rx="2" />
										<path d="M22 6L12 13L2 6" />
									</svg>
									<div className="contact-item-content">
										<p className="contact-item-title mono">[YOUR EMAIL]</p>
										<p className="contact-item-caption">
											For general questions, feedback and project discussions.
										</p>
									</div>
								</motion.div>

								{/* 2. GitHub */}
								<motion.div variants={itemVariants} className="contact-item">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="contact-item-icon"
										aria-hidden="true"
									>
										<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
									</svg>
									<div className="contact-item-content">
										<p className="contact-item-title mono">[GITHUB URL]</p>
										<p className="contact-item-caption">
											Follow the project and its progress.
										</p>
									</div>
								</motion.div>

								{/* 3. Status */}
								<motion.div variants={itemVariants} className="contact-item">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="contact-item-icon"
										aria-hidden="true"
									>
										<circle cx="12" cy="12" r="9" />
										<circle cx="12" cy="12" r="3" fill="currentColor" />
									</svg>
									<div className="contact-item-content">
										<p className="contact-item-title">Open source. Early development.</p>
										<p className="contact-item-caption">
											Follow along as each stage comes online.
										</p>
									</div>
								</motion.div>
							</motion.div>
						</div>

						{/* Right Column: Form starting at midpoint */}
						<div className="contact-right">
							<ContactForm />
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────────────────────
			    Second Section: Built for the tools engineers already use
			    ───────────────────────────────────────────────────────────── */}
			<ContactToolsSection />
		</main>
	);
}
