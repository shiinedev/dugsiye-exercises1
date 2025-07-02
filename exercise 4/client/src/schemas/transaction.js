
import z from 'zod';

export const transactionSchema = z.object({
  title: z.string().min(1,"title is required"),
  amount: z.coerce.number().min(1,"amount must be greater than 0 "),
  type: z.enum(["expense","income"]).optional().default("expense"),
  category: z.string().min(1,"category is required"),
  date: z.coerce.date("date is required")
})