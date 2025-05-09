import React from 'react'
import { z } from 'zod'

const ProfileSchema = z.object({
    first_name: z.string()
        .min(1, { message: "Enter a first name" }),
    lastname: z.any(),
    country_code: z.any(),
    state_code: z.any(),
    city_id: z.any(),
    phone: z.any(),
    address_one: z.any(),
    address_two: z.any(),
    country: z.any(),
    xsocial: z.any(),
    linksocial: z.any(),
    fbsocial: z.any(),
    zipcode: z.any()
})
export default ProfileSchema
