import { Link } from '@remix-run/react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'


const SigninLink = ({ user, signout, navBg }: any) => {
    return (
        <>
            <div className={`${navBg ? 'text-black' : 'text-black'} flex 
                    items-center space-x-2 border-b-transparent border-b relative
                    hover:bg-white px-2 py-[2px] bg-yellow-300 rounded-full
                    transition-all duration-200`}>
                <FaUserCircle className=' w-5 h-5' />
                <Link to={"/signin"}>
                    <p className='font-bold text-xs sm:text-base'>Login / Register</p>
                </Link>
            </div>

        </>
    )
}

export default SigninLink
