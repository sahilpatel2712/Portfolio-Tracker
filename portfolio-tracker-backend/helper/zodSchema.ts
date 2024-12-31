import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export const signinSchema = signupSchema.pick({ email: true, password: true });

export type SigninValuesType = z.infer<typeof signinSchema>;
export type SignupValuesType = z.infer<typeof signupSchema>;

export const stockSchema = z.object({
  stockName: z.string({required_error:"Stock name required"}).min(1, "Name is required"),
  ticker: z.string({required_error:"Ticker required"}).min(1, "Ticker is required"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .min(1, "Quantity must be at least 1"),
  averagePrice: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be positive"),
});

export type StockValueType = z.infer<typeof stockSchema>;

export const updateStockSchema = stockSchema.partial();

export type UpdateStockValueType = z.infer<typeof updateStockSchema>;
