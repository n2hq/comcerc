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

const EmailSchema = z.object({
    email: z.string({ message: "Please enter an email." })
        .min(1, { message: "Email must not be empty" })
        .email({ message: "Please enter a valid email" }),

})

export default EmailSchema