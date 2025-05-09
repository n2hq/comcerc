import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SigninSchema from './SigninSchema'
import { useAuth } from '~/context/AuthContext'
import { useNotification } from '~/context/NotificationContext'
import { Link, useNavigate } from '@remix-run/react'


type LoginData = {
    username: string
    password: string
}

const SigninForm = () => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const { signin } = useAuth()
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const navigator = useNavigate()

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

    const handleSigninForm = async (data: LoginData) => {
        setWorking(true)
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const email = data.username
        const password = data.password

        const datr = {
            email: email,
            password: password
        }
        const res = await signin(datr)
        if (res === true) {
            notification.cancel()
            navigator("/")
        } else {
            //alert(res.message))
            notification.alertCancel("Complete Your Signup", res.message)
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
    } = useForm<LoginData>({
        defaultValues: ({}),
        resolver: zodResolver(SigninSchema)
    })


    return (
        <div className=''>
            <div className='h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 '>
                <div className=' max-w-[300px]'>
                    <div className=' text-[26px] font-[500]'>
                        <div className='pb-1 border-b'>
                            Sign in
                        </div>
                    </div>
                    <div className=' mt-6 text-[20px] leading-[1.2em]'>Enter you email address and password?</div>
                    <form onSubmit={handleSubmit(handleSigninForm)}>
                        <div className=' mt-4'>
                            <input
                                {...register('username', {
                                    onChange: changeHandler
                                })}
                                className=' w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[1px]  bg-gray-100  rounded h-[50px] px-4'
                                type="text"
                                placeholder='Enter email address'
                            />
                            {errors?.username && <div className='ml-1 text-red-600 text-[13px]'>{errors.username.message}</div>}
                        </div>
                        <div className=' mt-3'>
                            <input
                                {...register('password', {
                                    onChange: changeHandler
                                })}
                                className=' w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[1px] bg-gray-100   rounded h-[50px] px-4'
                                type="password"
                                placeholder='Enter password'

                            />
                            {errors?.password && <div className='ml-1 text-red-600 text-[13px]'>{errors.password.message}</div>}
                        </div>
                        <button
                            className={`${working ? ' bg-gray-500/70' : 'cursor-pointer bg-black'} mt-3  w-full text-white 
                            rounded-full h-[50px] px-4 hover:bg-blue-800`}
                            type="submit"
                            disabled={working}
                        >
                            {working ? 'Submitting...' : 'Sign in'}
                        </button>
                    </form>

                    <div className=' mt-3 text-[11px]'>
                        By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Dersck and its affiliates to the email provided.
                    </div>

                    <div className={`mt-1 flex place-content-between place-items-center`}>
                        <button
                            type='button'
                            onClick={() => window.location.href = '/signup'}
                            className={`text-black bg-gray-100
                                px-5 py-1 border rounded-full border-black/40
                                hover:bg-blue-100 hover:shadow-lg hover:shadow-black/20`}
                        >
                            Signup
                        </button>

                        <Link to={`/resetpw`}>
                            <button
                                type='button'
                                className={`underline`}>
                                Forgot Password?
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninForm
