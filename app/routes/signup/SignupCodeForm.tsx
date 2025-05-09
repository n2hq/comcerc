import React, { useEffect, useState } from 'react'
import { useNotification } from '~/context/NotificationContext'
import { headers } from '~/lib/Lib'

const SignupCodeForm = ({ data }: any) => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const notification = useNotification()
    const [working, setWorking] = useState(false)
    const [hash, setHash] = useState('')

    useEffect(() => {
        if (data) {

            setEmail(data?.email)
            setHash(data?.hash)
        }
    }, [data])

    const handleConfirm = (status: boolean) => {
        if (status === true) {
            window.location.href = "/signin"
        } else {
            notification.cancel()
        }
    }

    const handleVerify = async () => {
        notification.notify('Completing signup...')
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data: any = []

        data["code"] = code

        //return false
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = `/api/users/verify_signup/${hash}`
        const url = BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            var respObj = await response.json()

            if (!response.ok) {

                throw new Error(`Error Code: ${response.status} - ${respObj.message}`)
            } else {
                //alert(respObj.message)
                //notification.confirm(respObj.message, handleConfirm)
                notification.notify(respObj.message)
                await new Promise((resolve) => setTimeout(resolve, 2000));
                window.location.href = "/signin"
                //alert('Signup completed. Go to sign in!')
            }
        } catch (e: any) {
            //notification.alertCancel('', e.message)
            notification.confirm(e.message, handleConfirm)
            return undefined
        } finally {
            setWorking(false)
            //notification.cancel()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value.slice(0, 7));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const isNumber = /^[0-9]$/.test(e.key);
        const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];

        if (!isNumber && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };


    return (
        <>
            <style>

            </style>
            <div className=''>
                <div className='h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 '>
                    <div className=' max-w-[300px]'>
                        <div className=' text-[20px] leading-[1.2em]'>Enter the 7 digit code sent to: <span className={`text-[17px] font-normal text-gray-800`}>{email}</span></div>
                        <div className=' mt-8 flex gap-2'>
                            <input
                                className='signup__code w-[180px] tracking-[.4em]'
                                type="text"
                                maxLength={7}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}

                            />

                        </div>
                        <div className=' mt-4 text-[12px]'>
                            Tip: Please check your inbox and spam folders
                        </div>
                        <div className=' mt-3'>
                            <input
                                className={`w-full bg-black text-white 
                                    rounded-[8px] h-[50px] px-4 cursor-pointer`}
                                type="button"
                                placeholder='Enter email address to login'
                                value={'Continue'}
                                onClick={handleVerify}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupCodeForm
