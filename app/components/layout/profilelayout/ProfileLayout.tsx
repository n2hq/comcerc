import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router'
import { useAuth } from '~/context/AuthContext'
import Footer from '~/components/footer/Footer'
import HeaderBar from './HeaderBar'
import ResponsiveNav from '~/components/header/navbar/lite/ResponsiveNav'
import Sidebar from './Sidebar'

const ProfileLayout = ({ children, title }: any) => {
    const auth = useAuth()


    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [setLoading])

    useEffect(() => {
        let tokens = localStorage.getItem("authTokens")

        if (tokens === null || tokens === undefined) {

            window.location.href = ("/signin")
        }

    }, [loading])

    return (
        <div>
            <ProfileLayoutContent
                user={auth.user}
                children={children}
                title={title}
            />
        </div>


    )
}

export default ProfileLayout

export const ProfileLayoutContent = ({ user, children, title }: any) => {
    return (
        <div className='min-h-[100vh] bg-blue-50'>
            <ResponsiveNav />
            <div className=' h-[70px] flex flex-col place-items-start place-content-end'></div>
            <div className={`mt-16 flex items-center h-full justify-between 
                w-[95%] sm:w-[90%] xl:w-[80%] mx-auto`}>
                <div className=' grid grid-cols-12 gap-8 w-full'>
                    <div className=' hidden lg:block lg:col-span-3 w-full'>
                        <Sidebar user={user} />
                    </div>
                    <div className={`col-span-12 lg:col-span-9 bg-white/50 
                        w-full p-3 rounded-[12px] pb-20 `}>
                        <HeaderBar title={title} />
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
