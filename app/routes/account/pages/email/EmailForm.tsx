import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { headers } from '~/lib/Lib'
import EmailSchema from './EmailSchema'

const EmailForm = ({ loaderData, user }: any) => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)

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

    const handleEmailChangeRequest: SubmitHandler<any> = async (data: any) => {
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/users/change_email_request"
        const url = BASE_URL + endpoint
        data["guid"] = loaderData.userProfileData.user_guid

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    alert(data.error)
                })

            } else {
                alert('Email Change Request Successfully Sent!')
            }

        } catch (error) {
            return undefined
        } finally {
            setWorking(false)
        }
    }

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        defaultValues: (loaderData.listing),
        resolver: zodResolver(EmailSchema)
    })


    return (
        <form onSubmit={handleSubmit(handleEmailChangeRequest)}>
            <div className='form__wrapper__class'>
                <div className='input__wrapper_class'>
                    <div className=' text-xl text-gray-700 font-semibold border-b pb-1'>
                        Current email
                    </div>
                    <div className=' pt-3 pb-4 text-[15px] leading-5'>
                        [{loaderData.userProfileData?.email}] will be used for account-related notifications and can be used for password resets.
                    </div>
                    <div className='border-[1px] rounded-[8px] px-3 py-3 bg-gray-100'>
                        {loaderData.userProfileData?.email} &nbsp;
                    </div>

                </div>

                <Input
                    controlTitle={"Update Email"}
                    controlPlaceholder={"Enter new email address"}
                    controlName={"email"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.email}
                />

                <Button working={working} />
            </div>
        </form>
    )
}

export default EmailForm
