import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { headers } from '~/lib/Lib'
import ResetPasswordSchema from './DeactivateUserSchema'
import { loader } from '~/routes/api/users'
import DeactivateUserSchema from './DeactivateUserSchema'



const DeactivateUserForm = ({ loaderData, user }: any) => {
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

    const handleDeactivateUser: SubmitHandler<any> = async (data: any) => {
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let guid = loaderData.userProfileData.user_guid as string

        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/users/activate_deactivate/" + guid
        const url = BASE_URL + endpoint

        data["active"] = loaderData.userProfileData.active ? false : true as boolean



        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    alert(data.message)
                })

            } else {
                alert(`You are now ${data["active"] ? 'activated' : 'deactivated'}`)
                window.location.reload()
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
        defaultValues: (loaderData.userProfileData),
        resolver: zodResolver(DeactivateUserSchema)
    })


    return (
        <form onSubmit={handleSubmit(handleDeactivateUser)}>
            <div className='form__wrapper__class'>
                <div className='input__wrapper_class'>
                    <div className=' text-xl text-gray-700 font-semibold border-b pb-1'>
                        {loaderData.userProfileData?.active ? 'Deactivate User' : 'Activate User'}

                    </div>
                    <div className=' pt-3 text-[15px] leading-5'>
                        <b>{loaderData.userProfileData?.email}</b> is your current email. It will be used for password resets or changes.
                    </div>
                </div>


                <Input
                    controlTitle={"Your Email Address"}
                    controlPlaceholder={"Retype new password"}
                    controlName={"email"}
                    controlType={"text"}
                    disabled={true}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.newpassword2}
                />

                <Button working={working} value={`${loaderData.userProfileData?.active ? 'Deactivate User' : 'Activate User'}`} />
            </div>
        </form>
    )
}

export default DeactivateUserForm
