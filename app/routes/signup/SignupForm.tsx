import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSignup } from '~/context/SignupContext'
import SignupSchema from './SignupSchema'
import { IAddUser } from '~/lib/Interfaces'
import { useNotification } from '~/context/NotificationContext'
import { headers } from '~/lib/Lib'
import { Link, useNavigate } from '@remix-run/react'

const SignupForm = () => {
    //let signup = useSignup()
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState(false)
    const notification = useNotification()
    const navigate = useNavigate()
    const [signedup, setSignedup] = useState(false)

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

    const handleSignup = async (data: any) => {
        setWorking(true)
        notification.notify("", "")
        await new Promise((resolve) => setTimeout(resolve, 1000));


        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/users"
        const url = BASE_URL + endpoint



        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })



            if (!response.ok) {
                var respObj = await response.json()
                throw new Error(`Error Code: ${response.status} - ${respObj.message || respObj.error}`)
            } else {
                notification.alertCancel('', 'Signup success. Please check your email to complete signup.')
                //navigate("/signup/code")
                setSignedup(true)
            }
        } catch (e: any) {

            notification.alertCancel('', e.message)
            return undefined
        } finally {
            setWorking(false)
        }
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<IAddUser>({
        defaultValues: ({}),
        resolver: zodResolver(SignupSchema)
    })


    return (
        <div className=''>
            <form onSubmit={handleSubmit(handleSignup)}>
                <div className='h-screen w-screen bg-white  flex flex-col place-content-center place-items-center  '>
                    <div className=' max-w-[300px]'>
                        <div className=' text-[26px] font-[500]'>
                            <div className='pb-1 border-b'>
                                Signup
                            </div>
                        </div>
                        <div className={`${signedup ? 'hidden' : 'block'}`}>
                            <div className=' mt-6 text-[17px] leading-[1.2em]'>Enter your details below to continue.</div>
                            <div className=' mt-4'>
                                <input
                                    {...register('email', {
                                        onChange: changeHandler
                                    })}
                                    className=' w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[1px]  bg-gray-100  rounded-[5px] h-[50px] px-4'
                                    type="text"
                                    placeholder='Enter email address to login'
                                />
                                {
                                    errors?.email &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.email?.message}
                                    </div>
                                }
                            </div>

                            <div className=' mt-2'>
                                <input
                                    {...register('password', {
                                        onChange: changeHandler
                                    })}
                                    className=' w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[1px]  bg-gray-100  rounded-[5px] h-[50px] px-4'
                                    type="password"
                                    placeholder='Enter password'
                                />
                                {
                                    errors?.password &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.password?.message}
                                    </div>
                                }
                            </div>

                            <div className=' mt-2'>
                                <input
                                    {...register('first_name', {
                                        onChange: changeHandler
                                    })}
                                    className=' w-full outline-none border-[1px] border-gray-100 focus:border-gray-300 focus:border-[1px]  bg-gray-100  rounded-[5px] h-[50px] px-4'
                                    type="text"
                                    placeholder='Enter firstname'
                                />
                                {
                                    errors?.first_name &&
                                    <div className={`text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`}>
                                        {errors?.first_name?.message}
                                    </div>
                                }
                            </div>

                            <div className=' mt-3'>
                                <input
                                    className={`w-full bg-black text-white rounded-full 
                                h-[50px] px-4 cursor-pointer hover:bg-blue-700`}
                                    type="submit"

                                    placeholder='Enter email address to login'
                                    value={'Sign up'}
                                />

                            </div>
                            <div className=' mt-3 text-[11px]'>
                                By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Dersck and its affiliates to the email provided.
                            </div>

                            <div className={`mt-1 flex place-content-between place-items-center`}>
                                <button
                                    type='button'
                                    onClick={() => window.location.href = '/signin'}
                                    className={` text-black bg-gray-100
                                px-5 py-1 border rounded-full border-black/40
                                hover:bg-blue-100 hover:shadow-lg hover:shadow-black/20`}
                                >
                                    Sign In
                                </button>

                                <Link to={`/resetpw`}>
                                    <button
                                        type='button'
                                        className={`underline`}>
                                        Forgot password?
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className={`${signedup ? 'block' : 'hidden'} mt-2`}>
                            <b>Success!</b> Please check your email to finish signup.
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignupForm
