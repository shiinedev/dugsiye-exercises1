
import z from 'zod';


export const transactionSchema = z.object({
  title: z.string().min(1,"title is required"),
  amount: z.number("amount is required"),
  type: z.enum(["expense","income"]).optional(),
  category: z.string(),
  date: z.string()
})