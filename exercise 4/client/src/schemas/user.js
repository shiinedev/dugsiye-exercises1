import z from 'zod'

export const userSchema = z.object({
    username:z.string().min(1,"name is required"),
    email:z.string().email("email is not valid"),
    role:z.enum(["user","admin"]).optional(),
    profile:z.string().optional(),
    password:z.string().min(6,"minimum is 6 characters").max(30,"max is 30 characters"),
    confirmPassword:z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email:z.string().email("email is not valid"),
    password:z.string(),
})