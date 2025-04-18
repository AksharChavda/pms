import { z } from "zod";



export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,"Password must be at least 8 characters long"),
});

export const RegisterSchema = z.object({
    name: z.string().trim().nonempty("Name is required"),
    email: z.string().email(),
    password: z.string().min(8,"Password must be at least 8 characters long"),
});
