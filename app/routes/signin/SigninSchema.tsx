import { z } from "zod"

const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/

const SigninSchema = z.object({
    username: z.string({ message: "Please enter an email" })
        .min(7, { message: "Email must be greater than 7 characters" })
        .email({ message: "Please enter a valid email" }),

    password: z.string({ message: "Please enter a password" })
        .min(8, "Password must be at least 8 characters")
        .regex(password_regex, "Please enter a valid password")
})

export default SigninSchema