import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ResetPwSchema from './ResetPwSchema'
import { useAuth } from '~/context/AuthContext'
import { useNotification } from '~/context/NotificationContext'
import { Link, useNavigate } from '@remix-run/react'
import { toSentenceCase } from '~/lib/Lib'


type LoginData = {
    username: string
    password: string
}

const ResetPwForm = () => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const auth = useAuth()
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

    const handleResetPw = async (data: any) => {
        setWorking(true)
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const email = data.username


        const datr = {
            email: email,

        }


        const res = await auth.resetpw(datr)

        notification.alertCancel('', toSentenceCase(res))

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
    } = useForm({
        defaultValues: ({}),
        resolver: zodResolver(ResetPwSchema)
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
                    <div className=' mt-6 text-[20px] leading-[1.2em]'>Enter your email address to reset your password?</div>
                    <form onSubmit={handleSubmit(handleResetPw)}>
                        <div className=' mt-4'>
                            <input
                                {...register('username', {
                                    onChange: changeHandler
                                })}
                                className=' w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[2px]  bg-gray-100  rounded-[8px] h-[50px] px-4'
                                type="text"
                                placeholder='Enter email address'
                            />
                            {typeof errors?.username && <div className='ml-1 text-red-600 text-[13px]'>{errors.username?.message}</div>}
                        </div>

                        <button
                            className={`${working ? ' bg-gray-500/70' : 'cursor-pointer bg-black'} mt-3  w-full text-white rounded-[8px] h-[50px] px-4`}
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
                        <button onClick={() => window.location.href = '/signup'}
                            className={` text-blue-700 bg-gray-100
                                px-5 py-1 border rounded`}
                        >
                            Signup
                        </button>

                        <Link to={`/signin`}>
                            <button className={`underline`}>
                                Click to Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPwForm
