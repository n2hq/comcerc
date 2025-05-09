import { z } from "zod"

const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/

const ResetPwSchema = z.object({
    username: z.string({ message: "Please enter an email" })
        .min(7, { message: "Email must be greater than 7 characters" })
        .email({ message: "Please enter a valid email" }),

})

export default ResetPwSchema