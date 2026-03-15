import { z } from "zod";

// ─── Register Schemas ────────────────────────────────────────────────

export const registerEmailSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
});

export const registerPhoneSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z
        .string()
        .min(1, "Phone is required")
        .regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
});

export type RegisterEmailFormData = z.infer<typeof registerEmailSchema>;
export type RegisterPhoneFormData = z.infer<typeof registerPhoneSchema>;

// ─── Login Schemas ────────────────────────────────────────────────────

export const loginEmailSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required"),
});

export const loginPhoneSchema = z.object({
    phone: z
        .string()
        .min(1, "Phone is required")
        .regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number"),
    password: z
        .string()
        .min(1, "Password is required"),
});

export type LoginEmailFormData = z.infer<typeof loginEmailSchema>;
export type LoginPhoneFormData = z.infer<typeof loginPhoneSchema>;
