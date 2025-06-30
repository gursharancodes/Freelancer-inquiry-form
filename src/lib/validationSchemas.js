// src/lib/validationSchemas.js
import * as z from "zod";

export const personalInfoSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    phone: z.string().optional(),
});

export const projectDetailsSchema = z.object({
    projectType: z.string().min(1, { message: "Select a project type" }),
    budget: z.string().optional(),
    timeline: z.string().min(1, { message: "Timeline is required" }),
});

export const descriptionUploadSchema = z.object({
    description: z
        .string()
        .min(20, { message: "Minimum 20 characters required." }),

    file: z
        .any()
        .refine(
            (files) =>
                !files || files.length === 0 || (
                    files[0] &&
                    ["application/pdf", "image/png", "image/jpeg"].includes(files[0].type)
                ),
            {
                message: "Allowed file types: PDF, PNG, JPG",
            }
        )
        .optional(),
});
  

export const reviewSubmitSchema = z.object({
    confirm: z.literal(true, {
        errorMap: () => ({ message: "You must confirm before submitting" }),
    }),
});
