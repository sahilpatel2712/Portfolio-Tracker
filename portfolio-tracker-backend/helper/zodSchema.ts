import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export const signinSchema = signupSchema.pick({ email: true, password: true });

export type SigninValuesType = z.infer<typeof signinSchema>;
export type SignupValuesType = z.infer<typeof signupSchema>;
