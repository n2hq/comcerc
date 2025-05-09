import React from 'react'
import { z } from 'zod'

const WeeklyHoursSchema = z.object({
    active: z.any(),
    monday_from: z.any(),
    tuesday_from: z.any(),
    wednesday_from: z.any(),
    thursday_from: z.any(),
    friday_from: z.any(),
    saturday_from: z.any(),
    sunday_from: z.any(),
    monday_to: z.any(),
    tuesday_to: z.any(),
    wednesday_to: z.any(),
    thursday_to: z.any(),
    friday_to: z.any(),
    saturday_to: z.any(),
    sunday_to: z.any()
})
export default WeeklyHoursSchema
