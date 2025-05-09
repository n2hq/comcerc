import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { headers } from '~/lib/Lib'
import ChangePasswordSchema from './ChangePasswordSchema'


const ChangePasswordForm = ({ loaderData, user }: any) => {
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
        const endpoint = "/api/users/change_password/" + loaderData.userProfileData.user_guid
        const url = BASE_URL + endpoint
        data["password"] = data.newpassword

        delete (data["oldpassword"])
        delete (data["newpassword"])
        delete (data["newpassword2"])

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    alert(data.error)
                })

            } else {
                alert('Password Successfully Changed! Use new password on next login')
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
        resolver: zodResolver(ChangePasswordSchema)
    })


    return (
        <form onSubmit={handleSubmit(handleEmailChangeRequest)}>
            <div className='form__wrapper__class'>
                <div className='input__wrapper_class'>
                    <div className=' text-xl text-gray-700 font-semibold border-b pb-1'>
                        Change Password
                    </div>
                    <div className=' pt-3 text-[15px] leading-5'>
                        <b>{loaderData.userProfileData?.email}</b> is your current email. It will be used be used for password resets or changes.
                    </div>
                </div>

                <Input
                    controlTitle={"Current Password"}
                    controlPlaceholder={"Enter current password"}
                    controlType={"password"}
                    controlName={"oldpassword"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.oldpassword}
                />

                <Input
                    controlTitle={"New Password"}
                    controlType={"password"}
                    controlPlaceholder={"Enter new password"}
                    controlName={"newpassword"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.newpassword}
                />

                <Input
                    controlTitle={"Retype New Password"}
                    controlPlaceholder={"Retype new password"}
                    controlName={"newpassword2"}
                    controlType={"password"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.newpassword2}
                />

                <Button working={working} />
            </div>
        </form>
    )
}

export default ChangePasswordForm
