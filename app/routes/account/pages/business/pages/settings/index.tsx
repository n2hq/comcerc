import React, { useState } from 'react'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '~/components/content/input/Input'

import { LoaderFunction, useLoaderData } from 'react-router'
import SettingsSchema from './SettingsSchema'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import BusinessMenu from '../../BusinessMenu'
import Hours from './components/operatingTime/Hours'
import WeeklyHours from './components/operatingTime/WeelyHours'
import { getOperatingHours } from '~/lib/Lib'
import BusinessWorkingHours from './components/operatingTime/BusinessWorkingHours'

const businesses = [
    {
        title: "Drew Consortium",
        category: "Services",
        country: "United States",
        activated: "Active",
        guid: "21safa-uwowm3ns-93ms32j-kajsmkl3shgm"
    },
    {
        title: "Cuppertino Adverts",
        category: "Technology Integrated",
        country: "United Kingdom",
        activated: "Inactive",
        guid: "21safa-uwowm3ns-93ms32j-kajsmkl3shgc"
    }
]

const categoryJson = [
    {
        id: "entertainment",
        name: "Entertainment"
    },
    {
        id: "services",
        name: "Services"
    }
]

export const loader: LoaderFunction = async ({ request, params }) => {
    const businessGuid = params.business_guid || null
    const userGuid = params.user_guid || null
    const operatingHours = await getOperatingHours(businessGuid, userGuid)
    const data = {
        businessGuid: businessGuid,
        userGuid: userGuid,
        operatingHours: operatingHours
    }

    console.log(data)


    return data;
}

type OpenStatus =
    | "no_hours"
    | "always_open"
    | "permanently_closed"
    | "temporarily_closed"
    | "selected_hours";

interface BusinessHours {
    day: string;
    open: string;
    close: string;
}

const index = () => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const loaderData: any = useLoaderData()

    const [workingHours, setWorkingHours] = useState<BusinessHours[]>([]);

    const options = [
        { value: "no_hours", label: "No Hours Available", more: "Visitors won't see business hours on this Page" },
        { value: "always_open", label: "Always Open", more: "e.g. Parks, beaches, roads" },
        { value: "permanently_closed", label: "Permanently Closed", more: "Permantently closed" },
        { value: "temporarily_closed", label: "Temporarily Closed", more: "Temporarily closed" },
        { value: "selected_hours", label: "Open During Selected Hours", more: "Open during selected hours" },
    ];

    const userGuid = loaderData.userGuid
    const businessGuid = loaderData.businessGuid

    const changeHandler = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setFormdata((previousValue: any) => {
            return (
                {
                    ...previousValue, [name]: value
                }
            )
        })
    }

    const handleBusinessHours = async (data: any) => {
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setWorking(false)
    }



    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        defaultValues: ({}),
        resolver: zodResolver(SettingsSchema)
    })
    return (
        <ProfileLayout title={"Edit Settings"}>
            <BusinessMenu guid={businessGuid} userGuid={userGuid} />
            <div className='form__wrapper__class '>

                {
                    loaderData &&
                    <div className={`mt-6`}>
                        <BusinessWorkingHours
                            data={loaderData}
                            onChange={setWorkingHours}
                            options={options}
                        />
                    </div>
                }


            </div>
        </ProfileLayout>
    )
}

export default index
