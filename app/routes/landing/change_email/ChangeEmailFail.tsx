import { Link } from '@remix-run/react'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { GiCancel } from 'react-icons/gi'
import { MdCancel, MdOutlineCancel } from 'react-icons/md'
import { TbCancel, TbFlagCancel } from 'react-icons/tb'

const ChangeEmailFail = ({ guid }: any) => {
    return (
        <div className=' flex place-content-center place-items-center w-screen h-screen'>
            <div className=' max-w-[300px]'>
                <div className='mb-8 text-2xl leading-[1.2em] '>
                    Email Change Expired.
                </div>

                <div className=' w-[70px] h-[70px] bg-gray-300 flex place-content-center place-items-center rounded-full text-black  border-[5px]'>
                    <MdOutlineCancel className='text-[70px]' />
                </div>


                <div className=' mt-16 text-[15px] '>
                    Try changing your email again.
                </div>
                <div className=' mt-3'>
                    <Link to={`/account/email/${guid}`}
                        className={`text-2xl mb-2 pb-1 border-b
                            flex content-center items-center gap-2 hover:underline`}
                    >
                        <span>Go to Account</span>
                        <BsArrowRight className=' relative top-[1px]' />
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default ChangeEmailFail
