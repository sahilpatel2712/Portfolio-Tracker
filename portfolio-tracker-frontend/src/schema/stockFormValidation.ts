import { z } from "zod";

export const stockFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ticker: z.string().min(1, "Ticker is required"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .min(1, "Quantity must be at least 1"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be positive"),
});

export type StockFormType = z.infer<typeof stockFormSchema>;
