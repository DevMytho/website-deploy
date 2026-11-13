import mongoose from "mongoose";

/**
 * Reusable Mongoose connection with caching for Next.js development.
 * Hot reload recreates modules, so the connection is cached on globalThis
 * to prevent opening a new database connection on every code change.
 *
 * Server-only: this module must never be imported from client components.
 * The URI comes from MONGODB_URI (.env.local); swap it for a MongoDB Atlas
 * connection string when deploying — no code changes needed.
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"MONGODB_URI is not set. Add it to .env.local (e.g. mongodb://127.0.0.1:27017/wci).",
	);
}

interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

const globalForMongoose = globalThis as unknown as {
	__wciMongoose?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose.__wciMongoose ?? {
	conn: null,
	promise: null,
};

globalForMongoose.__wciMongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI as string, {
				bufferCommands: false,
				serverSelectionTimeoutMS: 5_000,
				maxPoolSize: 10,
			})
			.catch((err: unknown) => {
				/* Reset so the next request can retry a fresh connection. */
				cached.promise = null;
				throw err;
			});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
