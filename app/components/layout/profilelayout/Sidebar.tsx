import React from 'react'
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdOutlineSettings,
    MdEmail,
    MdLock,
    MdCable,
    MdPrivacyTip,
    MdHelpCenter,
    MdSecurity
} from 'react-icons/md'
import MenuLink from './MenuLink';



const Sidebar = ({ user }: any) => {
    const menuItems = [
        {
            title: "Account",
            list: [
                {
                    title: "Account",
                    path: "/account",
                    icon: <MdDashboard />,
                },
                {
                    title: "My Businesses",
                    path: "/account/businesses",
                    icon: <MdSupervisedUserCircle />,
                },
                {
                    title: "Add a Business",
                    path: "/account/add-business",
                    icon: <MdShoppingBag />,
                },

            ],
        },
        {
            title: "Settings",
            list: [
                {
                    title: "Profile",
                    path: `/account/profile/${user?.guid}`,
                    icon: <MdOutlineSettings />,
                },
                {
                    title: "Email",
                    path: `/account/email/${user?.guid}`,
                    icon: <MdEmail />,
                },
                {
                    title: "Change Password",
                    path: `/account/change-password/${user?.guid}`,
                    icon: <MdLock />,
                },
                {
                    title: "Reset Password",
                    path: `/account/reset-password/${user?.guid}`,
                    icon: <MdCable />,
                },
                {
                    title: "Deactivate User",
                    path: `/account/deactivate-user/${user?.guid}`,
                    icon: <MdShoppingBag />,
                },
            ],
        },
        {
            title: "Site Links",
            list: [
                {
                    title: "Privacy",
                    path: "/privacy",
                    icon: <MdPrivacyTip />,
                },
                {
                    title: "Advertise",
                    path: "/advertise",
                    icon: <MdPrivacyTip />,
                },
                {
                    title: "Help",
                    path: "/help",
                    icon: <MdHelpCenter />,
                },
                {
                    title: "Sign out",
                    path: "/signin",
                    icon: <MdSecurity />,
                },
            ],
        },
    ];
    return (
        <ul className=' space-y-8'>
            {
                menuItems.map((cat, index) => {
                    return (
                        <li key={index} className='bg-white/50 rounded-[8px] pb-3 '>
                            <div
                                className=' text-black font-normal text-[16px]  mb-2  px-5 py-2 tracking-[.01em]'
                            >
                                {cat.title}
                            </div>
                            {
                                cat.list && <div>
                                    {
                                        cat.list.map((item, index) => {

                                            return (
                                                <MenuLink
                                                    menu={item}
                                                    key={index}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Sidebar
