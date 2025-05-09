import { Link } from '@remix-run/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

const ChangeEmailSuccess = ({ email }: any) => {
    return (
        <div className=' flex place-content-center place-items-center w-screen h-screen'>
            <div className=' max-w-[300px]'>
                <div className='mb-3 text-2xl leading-[1.2em] '>
                    Email Change Successful.
                </div>
                <div className='mb-8'>
                    {email}
                </div>
                <div className=' w-[70px] h-[70px] bg-gray-300 flex place-content-center place-items-center rounded-full text-black  border-[5px] border-black text-3xl'>
                    <FaCheck />
                </div>


                <div className=' mt-16 text-[15px] '>
                    Click below to sign in.
                </div>
                <div className=' mt-3'>
                    <Link to={'/signin'}
                        className=' text-3xl mb-2 pb-1 border-b'
                    >
                        Sign in
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default ChangeEmailSuccess
