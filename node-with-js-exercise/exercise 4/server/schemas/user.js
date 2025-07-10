import z from 'zod'

export const userSchema = z.object({
    username:z.string().min(1,"name is required"),
    email:z.string().email("email is not valid"),
    password:z.string().min(6,"minimum is 6 characters").max(30,"max is 30 characters"),
    role:z.enum(["user","admin"]).default("user"),
    profile:z.string().optional()
})