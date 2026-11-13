import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

/**
 * Contact submission — collection "contacts" in the "wci" database.
 * Fields mirror the live contact form: name, email, phone (optional),
 * message. The form has no subject input, so subject is stored optional;
 * status supports the new / read / replied workflow.
 */
const ContactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required."],
			trim: true,
			maxlength: [120, "Name is too long."],
		},
		email: {
			type: String,
			required: [true, "Email is required."],
			trim: true,
			lowercase: true,
			maxlength: [254, "Email is too long."],
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid."],
		},
		phone: {
			type: String,
			trim: true,
			maxlength: [40, "Phone is too long."],
			default: "",
		},
		subject: {
			type: String,
			trim: true,
			maxlength: [200, "Subject is too long."],
			default: "",
		},
		message: {
			type: String,
			required: [true, "Message is required."],
			trim: true,
			minlength: [10, "Message must be at least 10 characters."],
			maxlength: [5000, "Message is too long."],
		},
		status: {
			type: String,
			enum: ["new", "read", "replied"],
			default: "new",
		},
	},
	{
		timestamps: true, // createdAt / updatedAt
		collection: "contacts",
	},
);

ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ status: 1, createdAt: -1 });
/* Same person resubmitting quickly is throttled at the API layer. */
ContactSchema.index({ email: 1, createdAt: -1 });

export type ContactDocument = InferSchemaType<typeof ContactSchema>;

/* Reuse the compiled model across Next.js hot reloads. */
export const Contact: Model<ContactDocument> =
	(mongoose.models.Contact as Model<ContactDocument>) ??
	mongoose.model<ContactDocument>("Contact", ContactSchema);
