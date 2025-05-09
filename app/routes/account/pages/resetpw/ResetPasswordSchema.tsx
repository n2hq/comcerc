import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);

const ResetPasswordSchema = z.object({

    email: z.string({ message: "Please enter an email." })
        .min(1, { message: "Email must not be empty" })
        .email({ message: "Please enter a valid email" })

})
export default ResetPasswordSchema
