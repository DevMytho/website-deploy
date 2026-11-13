import mongoose from "mongoose";
import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/lib/models/Contact";

/* In-memory sliding rate limit store (IP -> array of timestamps).
   Single-instance dev/prod-small; move to a shared store (e.g. Redis) when
   running multiple server instances. */
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const timestamps = rateLimitMap.get(ip) || [];
	const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

	if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
		rateLimitMap.set(ip, recent);
		return true;
	}

	recent.push(now);
	rateLimitMap.set(ip, recent);
	return false;
}

/* Guard against oversized request bodies. */
const MAX_PAYLOAD_BYTES = 10_000;

export async function POST(request: NextRequest) {
	try {
		const ip =
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
			request.headers.get("x-real-ip") ||
			"127.0.0.1";

		if (isRateLimited(ip)) {
			return NextResponse.json(
				{ error: "Too many requests. Please wait a moment before trying again." },
				{ status: 429 },
			);
		}

		const contentLength = Number(request.headers.get("content-length") || "0");
		if (contentLength > MAX_PAYLOAD_BYTES) {
			return NextResponse.json(
				{ error: "Invalid request payload." },
				{ status: 400 },
			);
		}

		const body = await request.json().catch(() => null);
		if (!body || typeof body !== "object") {
			return NextResponse.json(
				{ error: "Invalid request payload." },
				{ status: 400 },
			);
		}

		const { name, email, phone, subject, message, _hp } =
			body as Record<string, unknown>;

		/* 1. Honeypot: hidden field filled -> bot. Silently accept without
		      storing so bots do not learn the form is protected. */
		if (typeof _hp === "string" && _hp.trim().length > 0) {
			return NextResponse.json({ ok: true });
		}

		/* 2. Server-side validation (never trust the client). */
		if (typeof name !== "string" || !name.trim() || name.trim().length > 120) {
			return NextResponse.json(
				{ error: "Full Name is required." },
				{ status: 400 },
			);
		}

		if (
			typeof email !== "string" ||
			!email.trim() ||
			email.trim().length > 254 ||
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
		) {
			return NextResponse.json(
				{ error: "A valid email address is required." },
				{ status: 400 },
			);
		}

		if (typeof message !== "string" || message.trim().length < 10) {
			return NextResponse.json(
				{ error: "Message must be at least 10 characters long." },
				{ status: 400 },
			);
		}

		/* 3. Connect and store. The response is only sent after MongoDB
		      confirms the insert. */
		await connectToDatabase();

		await Contact.create({
			name: name.trim(),
			email: email.trim(),
			phone: typeof phone === "string" ? phone.trim().slice(0, 40) : "",
			subject: typeof subject === "string" ? subject.trim().slice(0, 200) : "",
			message: message.trim(),
		});

		return NextResponse.json(
			{ ok: true, message: "Thanks. We'll get back to you." },
			{ status: 201 },
		);
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			return NextResponse.json(
				{ error: "Please check the form and try again." },
				{ status: 400 },
			);
		}

		/* Never leak database details to the client. */
		console.error("[CONTACT FORM ERROR]", err);
		return NextResponse.json(
			{ error: "An unexpected error occurred. Please try again." },
			{ status: 500 },
		);
	}
}
