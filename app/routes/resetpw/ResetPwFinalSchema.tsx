import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);

const ResetPwFinalSchema = z.object({

    password: z.string()
        .min(1, { message: "Please enter new password." })
        .min(8, { message: "Password must be up to 8 characters." })
        .regex(passwordValidation, {
            message: 'Please enter a valid password',
        }),
    password2: z.string()
        .min(1, { message: "Please enter new password." })
        .min(8, { message: "Password must be at least 8 characters." })
        .regex(passwordValidation, {
            message: 'Please enter a valid password',
        })
}).superRefine((data, ctx) => {
    if (data.password !== data.password2) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['password2'],
            message: "Your new password don't match",
        });
    }
})
export default ResetPwFinalSchema
