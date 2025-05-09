import React, { useEffect, useState } from 'react'
import Hours from './Hours'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import WeeklyHoursSchema from './WeeklyHoursSchema'

const days = [
    {
        day: "Monday",
        from: "monday_from",
        to: "monday_to",
    },
    {
        day: "Tuesday",
        from: "tuesday_from",
        to: "tuesday_to",
    },
    {
        day: "Wednesday",
        from: "wednesday_from",
        to: "wednesday_to",
    },
    {
        day: "Thursday",
        from: "thursday_from",
        to: "thursday_to",
    },
    {
        day: "Friday",
        from: "friday_from",
        to: "friday_to",
    },
    {
        day: "Saturday",
        from: "saturday_from",
        to: "saturday_to",
    },
    {
        day: "Sunday",
        from: "sunday_from",
        to: "sunday_to",
    },
]

const WeeklyHours = ({ data }: any) => {
    const [formData, setFormData] = useState(null)
    const [selectedFrom, setSelectedFrom] = useState(null)
    const [selectedTo, setSelectedTo] = useState(null)

    const changeHandler = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setFormData((previousValue: any) => ({ ...previousValue, [name]: value }))
    }

    function timeToMinutes(time: string): number {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    useEffect(() => {
        if (selectedTo && selectedFrom) {
            const timeFrom = timeToMinutes(selectedFrom);
            const timeTo = timeToMinutes(selectedTo);

            if (timeTo < timeFrom) {
                alert('Closing time cannot be less than opening time.')
                setSelectedFrom(null)
                setSelectedTo(null)
            }
        }
    }, [selectedFrom, selectedTo])



    const {
        register,
        handleSubmit,
        control,
        watch,
        setError,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: data.operatingHours,
        resolver: zodResolver(WeeklyHoursSchema)
    })

    useEffect(() => {
        /* days.map((day, index) => {
            let from = getValues(day.from)
            let to = getValues(day.to)

            setSelectedFrom(from)
            setSelectedTo(getValues(day.to))
        }) */
    }, [])

    return (
        <div className={`flex flex-col`}>
            {days.map((day, index) => {

                return (
                    <div key={index} className={`grid grid-cols-12 gap-y-2 
                    border-b pb-3 pt-3`}>
                        <div className={`col-span-12 lg:col-span-3 text-[14px] font-bold
                            flex place-items-center ml-1`}>
                            {day.day}
                        </div>
                        <div className={`col-span-12 lg:col-span-9`}>
                            <div className={`flex place-content-center place-items-center gap-3 `}>
                                <div className=''>
                                    <Hours
                                        register={register}
                                        changeHandler={changeHandler}
                                        controlName={day.from}
                                        error={errors[day.from]}
                                        setSelectedFrom={setSelectedFrom}
                                        setSelectedTo={setSelectedTo}
                                        selectedFrom={selectedFrom}
                                        selectedTo={selectedTo}
                                    />
                                </div>
                                <div>
                                    -
                                </div>
                                <div>
                                    <Hours
                                        register={register}
                                        changeHandler={changeHandler}
                                        controlName={day.to}
                                        error={errors[day.to]}
                                        setSelectedFrom={setSelectedFrom}
                                        setSelectedTo={setSelectedTo}
                                        selectedFrom={selectedFrom}
                                        selectedTo={selectedTo}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default WeeklyHours
