import React from 'react'
import { MdArrowBack, MdArrowForward, MdOutlineSafetyDivider, MdSafetyDivider } from 'react-icons/md'

const HeaderBar = ({ title }: any) => {
    return (
        <div className=' flex place-content-between w-full bg-blue-100/50 px-4 py-3 '>
            <div className={`rounded-lg text-xl text-black font-normal
                 truncate mr-2`}>
                {title}
            </div>

            <div className=' flex place-items-center gap-3  text-gray-500 font-light font-sans'>
                <div className=' flex place-items-center gap-1 cursor-pointer' onClick={() => window.history.back()}>
                    <MdArrowBack />
                    Back
                </div>
                |
                <div className=' flex place-items-center gap-1 cursor-pointer' onClick={() => window.history.go(1)}>
                    Next
                    <MdArrowForward />
                </div>
            </div>

        </div>
    )
}

export default HeaderBar
