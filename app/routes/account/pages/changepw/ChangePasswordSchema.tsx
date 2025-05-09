import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);

const ChangePasswordSchema = z.object({

    oldpassword: z.string()
        .min(1, { message: "Please enter old password." })
        .min(8, { message: "Password must be up to 8 characters." })
        .regex(passwordValidation, {
            message: 'Please enter a valid password',
        }),
    newpassword: z.string()
        .min(1, { message: "Please enter new password." })
        .min(8, { message: "Password must be at least 8 characters." })
        .regex(passwordValidation, {
            message: 'Please enter a valid password',
        }),
    newpassword2: z.string()
        .min(1, { message: "Please retype new password." })
        .min(8, { message: "Password must be at least 8 characters." })
        .regex(passwordValidation, {
            message: 'Please enter a valid password',
        }),
}).superRefine((data, ctx) => {
    if (data.oldpassword === data.newpassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['newpassword'],
            message: 'New password cannot be the same as old password',
        });
    }
    if (data.newpassword !== data.newpassword2) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['newpd2'],
            message: "Your new password don't match",
        });
    }
})
export default ChangePasswordSchema
