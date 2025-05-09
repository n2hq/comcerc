import { Link, useLocation } from '@remix-run/react'
import React, { useState } from 'react'
import { MdArrowBack, MdArrowForward, MdOutlineSafetyDivider, MdSafetyDivider } from 'react-icons/md'

const settingsLinks = [
    {
        title: "Settings",
        link: "/settings"
    },
    {
        title: "Gallery",
        link: "/gallery"
    },
    {
        title: "Facilities",
        link: "/facilities"
    },
    {
        title: "Activate",
        link: "/activate"
    },
]

const BusinessMenu = ({ title, guid, userGuid }: any) => {
    const [showSettings, setShowSettings] = useState(false)
    const displaySettings = () => setShowSettings(true)
    const location = useLocation()
    const pathname = `/account/businesses/${guid}/${userGuid}`

    const hideSettings = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setShowSettings(false)
    }
    return (
        <div className=' flex place-content-between w-full  px-4 py-3 mt-1 z-[3000]'>
            <div className='  rounded-lg text-xl text-black font-normal'>
                {title}
            </div>

            <div className={`relative flex flex-col place-items-center place-content-end 
                bg-blue-200 w-[180px]  gap-3  text-gray-500 font-light font-sans
                z-[100]`}>
                <button
                    className={`rounded-md cursor-pointer w-full bg-blue-900
                         text-white shadow-md shadow-blue-400 py-1`}
                    onMouseDown={() => displaySettings()}
                    onBlur={() => hideSettings()}
                >
                    Settings
                </button>

                <div className={`${showSettings ? 'block' : 'hidden'} absolute w-full top-8 rounded-lg 
                border-[1px] border-gray-100 bg-white shadow-lg  `}>
                    <div className='divide-y-[1px] divide-gray-500/30 '>
                        {
                            settingsLinks.map((item, index) => {
                                return (
                                    <div key={index} className={`py-2.5 px-3 text-[14px]
                                     text-black font-sans font-semibold `}>
                                        <Link to={`${pathname}${item.link}`}>
                                            <p>
                                                {item.title}
                                            </p>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BusinessMenu
