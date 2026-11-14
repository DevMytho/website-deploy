"use client";

import { useState, useRef, type FormEvent, type ChangeEvent, type FocusEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FormValues {
	name: string;
	email: string;
	phone: string;
	message: string;
	_hp: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

export function ContactForm() {
	const shouldReduce = useReducedMotion();
	const [values, setValues] = useState<FormValues>({
		name: "",
		email: "",
		phone: "",
		message: "",
		_hp: "",
	});
	const [focusedField, setFocusedField] = useState<string | null>(null);
	/* Honeypot stays readOnly so browser autofill/password managers skip it
	   (they never fill readonly fields — that was filling _hp on real
	   submissions and silently dropping them). It unlocks on focus, which
	   only bots reaching it programmatically would do. */
	const [hpLocked, setHpLocked] = useState(true);
	const [errors, setErrors] = useState<FormErrors>({});
	const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
	const [serverError, setServerError] = useState<string | null>(null);

	function validateField(name: keyof FormValues, val: string): string | undefined {
		if (name === "name") {
			if (!val.trim()) return "Full name is required.";
		}
		if (name === "email") {
			if (!val.trim()) return "Email address is required.";
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
				return "Please enter a valid email address.";
			}
		}
		if (name === "message") {
			if (!val.trim()) return "Message is required.";
			if (val.trim().length < 10) {
				return "Message must be at least 10 characters.";
			}
		}
		return undefined;
	}

	function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormErrors]) {
			const err = validateField(name as keyof FormValues, value);
			setErrors((prev) => ({ ...prev, [name]: err }));
		}
	}

	function handleFocus(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setFocusedField(e.target.name);
	}

	function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setFocusedField(null);
		const { name, value } = e.target;
		const err = validateField(name as keyof FormValues, value);
		setErrors((prev) => ({ ...prev, [name]: err }));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const nameErr = validateField("name", values.name);
		const emailErr = validateField("email", values.email);
		const msgErr = validateField("message", values.message);

		if (nameErr || emailErr || msgErr) {
			setErrors({
				name: nameErr,
				email: emailErr,
				message: msgErr,
			});
			return;
		}

		setStatus("pending");
		setServerError(null);

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			const data = await res.json().catch(() => null);

			if (!res.ok) {
				throw new Error(data?.error || "Submission failed. Please try again.");
			}

			setStatus("success");
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : "Submission failed.";
			setServerError(msg);
			setStatus("error");
		}
	}

	function handleReset() {
		setValues({
			name: "",
			email: "",
			phone: "",
			message: "",
			_hp: "",
		});
		setHpLocked(true);
		setErrors({});
		setStatus("idle");
		setServerError(null);
	}

	if (status === "success") {
		return (
			<motion.div
				className="contact-state-panel"
				initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				role="status"
				aria-live="polite"
			>
				<span className="contact-sent-tag">
					<span>SENT</span>
				</span>
				<p className="contact-state-msg">Thanks. We&apos;ll get back to you.</p>
				<button
					type="button"
					onClick={handleReset}
					className="contact-state-btn"
				>
					Send another message &rarr;
				</button>
			</motion.div>
		);
	}

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduce ? 0 : 0.06,
				delayChildren: 0.1,
			},
		},
	};

	const fieldVariants: Variants = {
		hidden: { opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 14 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: EASE },
		},
	};

	return (
		<form onSubmit={handleSubmit} className="contact-form" noValidate>
			{serverError && (
				<div
					className="contact-state-panel"
					style={{ borderColor: "#333", padding: "16px 20px" }}
					role="alert"
					aria-live="polite"
				>
					<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<span className="contact-error-tag">ERROR</span>
						<span style={{ fontSize: "13px", color: "var(--text)" }}>{serverError}</span>
					</div>
				</div>
			)}

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				style={{ display: "grid", gap: "24px" }}
			>
				{/* 1. Full Name* */}
				<motion.div
					variants={fieldVariants}
					className={`contact-field-group ${
						focusedField === "name" || values.name ? "is-active" : ""
					} ${focusedField === "name" ? "is-focused" : ""}`}
				>
					<label htmlFor="contact-name" className="contact-floating-label">
						Full Name*
					</label>
					<input
						id="contact-name"
						type="text"
						name="name"
						autoComplete="name"
						value={values.name}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						className="contact-input"
						required
						aria-required="true"
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? "contact-name-error" : undefined}
					/>
					<span className="contact-input-line" aria-hidden="true" />
					{errors.name && (
						<span
							id="contact-name-error"
							className="contact-field-error"
							aria-live="polite"
						>
							<span className="contact-error-tag">ERROR</span>
							<span>{errors.name}</span>
						</span>
					)}
				</motion.div>

				{/* 2. Your Email* */}
				<motion.div
					variants={fieldVariants}
					className={`contact-field-group ${
						focusedField === "email" || values.email ? "is-active" : ""
					} ${focusedField === "email" ? "is-focused" : ""}`}
				>
					<label htmlFor="contact-email" className="contact-floating-label">
						Your Email*
					</label>
					<input
						id="contact-email"
						type="email"
						name="email"
						autoComplete="email"
						value={values.email}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						className="contact-input"
						required
						aria-required="true"
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? "contact-email-error" : undefined}
					/>
					<span className="contact-input-line" aria-hidden="true" />
					{errors.email && (
						<span
							id="contact-email-error"
							className="contact-field-error"
							aria-live="polite"
						>
							<span className="contact-error-tag">ERROR</span>
							<span>{errors.email}</span>
						</span>
					)}
				</motion.div>

				{/* 3. Phone (optional) */}
				<motion.div
					variants={fieldVariants}
					className={`contact-field-group ${
						focusedField === "phone" || values.phone ? "is-active" : ""
					} ${focusedField === "phone" ? "is-focused" : ""}`}
				>
					<label htmlFor="contact-phone" className="contact-floating-label">
						Phone
					</label>
					<input
						id="contact-phone"
						type="tel"
						name="phone"
						autoComplete="tel"
						value={values.phone}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						className="contact-input"
					/>
					<span className="contact-input-line" aria-hidden="true" />
				</motion.div>

				{/* 4. Write Your Message* */}
				<motion.div
					variants={fieldVariants}
					className={`contact-field-group ${
						focusedField === "message" || values.message ? "is-active" : ""
					} ${focusedField === "message" ? "is-focused" : ""}`}
				>
					<label htmlFor="contact-message" className="contact-floating-label">
						Write Your Message*
					</label>
					<textarea
						id="contact-message"
						name="message"
						rows={3}
						value={values.message}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						className="contact-input contact-textarea"
						required
						aria-required="true"
						aria-invalid={!!errors.message}
						aria-describedby={errors.message ? "contact-message-error" : undefined}
					/>
					<span className="contact-input-line" aria-hidden="true" />
					{errors.message && (
						<span
							id="contact-message-error"
							className="contact-field-error"
							aria-live="polite"
						>
							<span className="contact-error-tag">ERROR</span>
							<span>{errors.message}</span>
						</span>
					)}
				</motion.div>

				{/* Submit Button */}
				<motion.div variants={fieldVariants} style={{ paddingTop: "8px" }}>
					<button
						type="submit"
						disabled={status === "pending"}
						className="contact-glass-btn"
						aria-label={status === "pending" ? "Sending message..." : "Send message"}
					>
						{status === "pending" ? (
							<>
								<svg
									style={{
										width: "14px",
										height: "14px",
										animation: "spin 1s linear infinite",
									}}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
									<path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
								</svg>
								<span>Sending...</span>
							</>
						) : (
							<>
								<span>Send message</span>
								<span className="contact-arrow" aria-hidden="true">
									↗
								</span>
							</>
						)}
					</button>
				</motion.div>
			</motion.div>

			{/* Honeypot — last field in the form, off-screen, invisible.
			    Real users never see or reach it; autofill skips readonly. */}
			<input
				type="text"
				name="_hp"
				id="contact-hp"
				tabIndex={-1}
				aria-hidden="true"
				autoComplete="off"
				spellCheck={false}
				readOnly={hpLocked}
				value={values._hp}
				onChange={handleChange}
				onFocus={() => setHpLocked(false)}
				style={{
					position: "absolute",
					left: "-9999px",
					width: "1px",
					height: "1px",
					opacity: 0,
					pointerEvents: "none",
				}}
			/>
		</form>
	);
}
