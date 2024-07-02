import { z } from 'zod'

export const registerSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: 'Your fisrt name must be bigger, right?' })
        .max(255, { message: "Can't believe your first name is that big..." }),
    lastName: z
        .string()
        .min(1, { message: 'Your last name must be bigger, right?' })
        .max(255, { message: "Can't believe your last name is that big..." }),
    email: z.string().email(),
    dob: z.date(),
    password: z.string().min(7).max(66),
    confirmPassword: z.string().min(7).max(66),
})
