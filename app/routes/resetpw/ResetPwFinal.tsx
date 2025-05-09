import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SigninSchema from './ResetPwFinalSchema'
import { useAuth } from '~/context/AuthContext'
import ResetPasswordSchema from './ResetPwFinalSchema'
import { headers } from '~/lib/Lib'
import { useNotification } from '~/context/NotificationContext'


type ResetPasswordType = {
    password: string
    password2: string
}

const ResetPwFinal = ({ userGuid }: any) => {
    const [formdata, setFormdata] = useState<ResetPasswordType | null>(null)
    const { signin } = useAuth()
    const [working, setWorking] = useState<boolean>(false)
    const [guid, setGuid] = useState('')
    const notification = useNotification()

    useEffect(() => {
        if (userGuid) {
            setGuid(userGuid)
        }
    }, [userGuid])

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

    const handleSetPassword = async (data: any) => {
        setWorking(true)
        notification.notify('Resetting password...')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const password = data.password


        const datr = {
            password: password
        }

        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = `/api/users/reset_password/${guid}`
        const url = BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            let rsp = response.json()

            if (!response.ok) {
                rsp.then((data) => {
                    notification.alertCancel('Failed', `${data.message}`)
                })


            } else {
                rsp.then((data) => {
                    notification.notify(`${data.message}. Redirecting...`)
                    setTimeout(() => {

                        window.location.href = '/signin'
                    }, 3000)

                })
                //alert('Password Successfully Changed! Use new password on next login')
            }

        } catch (error) {
            return undefined
        } finally {
            setWorking(false)
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setWorking(false)
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordType>({
        defaultValues: ({}),
        resolver: zodResolver(ResetPasswordSchema)
    })


    return (
        <div className=''>
            <div className='h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 '>
                <div className=' max-w-[300px]'>
                    <div className=' text-[26px] font-[500]'>
                        <div className='pb-1 border-b'>
                            Reset Password
                        </div>
                    </div>
                    <div className=' mt-4 mb-2 text-[15px] leading-[1.2em]'>Use the form below to set a new password for your account!</div>

                    <form onSubmit={handleSubmit(handleSetPassword)}>
                        <div className=' mt-4'>
                            <input
                                {...register('password', {
                                    onChange: changeHandler
                                })}
                                className=' w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[2px]  bg-gray-100  rounded-[8px] h-[50px] px-4'
                                type="password"
                                placeholder='Enter new password'
                            />
                            {errors?.password && <div className='ml-1 text-red-600 text-[13px]'>{errors?.password?.message}</div>}
                        </div>
                        <div className=' mt-3'>
                            <input
                                {...register('password2', {
                                    onChange: changeHandler
                                })}
                                className=' w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[2px] bg-gray-100   rounded-[8px] h-[50px] px-4'
                                type="password"
                                placeholder='Retype New password'

                            />
                            {errors?.password2 && <div className='ml-1 text-red-600 text-[13px]'>{errors?.password2?.message}</div>}
                        </div>
                        <button
                            className={`${working ? ' bg-gray-500/70' : 'cursor-pointer bg-black'} mt-3  w-full text-white rounded-[8px] h-[50px] px-4`}
                            type="submit"
                            disabled={working}
                        >
                            {working ? 'Submitting...' : 'Set Password'}
                        </button>
                    </form>

                    <div className=' mt-3 text-[11px]'>
                        By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Dersck and its affiliates to the email provided.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPwFinal
