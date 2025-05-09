import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'




const phoneRegex = new RegExp(/^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/);
const zipcoderegex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/)

const getMaxWords = (wordsInput: any, maxWords: any) => {


    let reconstruct = ""
    let wordsLength = 0
    let testWordLength = wordsInput.length

    if (testWordLength > 0) {

        let trimmedText = wordsInput.trim()

        let words = trimmedText.split(" ")
        wordsLength = words.length


        for (let i = 0; i < maxWords; i++) {
            let word = words[i]

            if (i < wordsLength) {
                if (i == (maxWords - 1)) {
                    reconstruct += word
                } else {
                    reconstruct += word + " "
                }
            }
        }
    }

    return wordsLength
}

function isValidPostalCode(postalCode: any, countryCode: any) {
    let postalCodeRegex
    switch (countryCode) {
        case "US":
            postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;

            break;
        case "CA":
            postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
            break;
        default:
            postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    }
    return postalCodeRegex.test(postalCode);
}

const AddBusinessSchema = z.object({
    title: z.string()
        .min(1, { message: "Enter a business name" })
        .min(3, { message: "Busines Name must not be less than 3 characters" })
        .max(100, { message: "Business name must not be more than 100 characters." }),


    category: z.string()
        .min(1, { message: "Please select a business category." }),

    country_code: z.string({ message: "Please select a country" })
        .min(1, { message: "Please enter a country code." }),

    state_code: z.any(),

    city_id: z.any(),

    zipcode: z.string()
        .min(1, { message: "Zipcode must not be empty" })
        .max(7, { message: "Zipcode must not be more than 7 characters" }),

    short_description: z.string({ message: "Please enter business phrase" })
        .min(3, { message: "Short Description must not be less than 3 characters" })
        .max(1000, { message: "Short Description must not be more than 1000 characters" }),

    email_address: z.string({ message: "Please enter an email." })
        .min(1, { message: "Email must not be empty" })
        .email({ message: "Please enter a valid email" }),

    phone: z.string()
        .min(1, { message: "Phone must not be empty" })
        .max(30, { message: "PHone must not be more than 30 characters" }),

    address_one: z.string({ message: "Please enter an address" })
        .min(3, { message: "Address must not be less than 3 characters" })
        .max(100, { message: "Address must not be more than 100 characters" }),

    address_two: z.any(),

    established: z.string({ message: "Please enter year established" })
        .min(4, { message: "Year must be at least 4 characters" })

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


export default AddBusinessSchema
