import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const urlvalidator = /^(?!https?)(?!www\.?).*\..+$/g


const SettingsSchema = z.object({
    username: z.any(),
    title: z.string()
        .min(1, { message: "Enter a business name" })
        .min(3, { message: "Busines Name must not be less than 3 characters" })
        .max(100, { message: "Business name must not be more than 100 characters." }),
    country_code: z.string({ message: "Please select a country" })
        .min(1, { message: "Please enter a country code." }),
    address_one: z.string({ message: "Please enter an address" })
        .min(3, { message: "Address must not be less than 3 characters" })
        .max(100, { message: "Address must not be more than 100 characters" }),
    address_two: z.any(),
    state_code: z.any(),
    state_text: z.any(),
    country_text: z.any(),
    city: z.any(),
    established: z.string({ message: "Please enter year established" })
        .min(4, { message: "Year must be at least 4 characters" }),
    call_code: z.any(),
    call_mobile: z.any(),
    zipcode: z.any(),
    intro: z.any(),
    category: z.string()
        .min(2, { message: "Please select a business category" }),
    business_phrases: z.string({ message: "Please enter business phrase" })
        .min(3, { message: "Business Phrases must not be less than 3 characters" })
        .max(1000, { message: "Business Phrases must not be more than 100 characters" }),
    products: z.string({ message: "Please enter products offered" }),
    services: z.union([
        z.string({ message: "Please enter services offered" })
            .min(3, { message: "Please enter up to 3 characters" }),
        z.literal("")]),
    xsocial: z.any(),
    fbsocial: z.any(),
    linksocial: z.any(),
    website: z.union(
        [
            z.string().regex(urlvalidator).nullish(),
            z.literal("")
        ]
    ),

    email: z.string({ message: "Please enter an email." })
        .min(1, { message: "Email must not be empty" })
        .email({ message: "Please enter a valid email" })
}).superRefine((data, ctx) => {

    if (data?.address_two?.length !== 0) {
        if (data?.address_two?.length < 3) {

            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['address_two'],
                message: 'Enter a minimum of 3 characters',
            });
        }
    }

})
export default SettingsSchema
