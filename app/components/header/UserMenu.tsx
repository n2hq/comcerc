import { Link } from '@remix-run/react'
import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

const UserMenu = ({ user, signout, navBg }: any) => {
    const [showMenu, setShowMenu] = useState(false)
    const handleShowMenu = () => {
        setShowMenu(true)
    }
    const handleHideMenu = () => {
        setShowMenu(false)
    }

    return (
        <>
            <div className='flex flex-col relative '>
                <button className={`${navBg ? 'text-black' : 'text-black'}  relative
                    hover:bg-white pl-[5px] pr-[15px] py-[2px] bg-yellow-300 rounded-full
                    transition-all duration-200 cursor-pointer`}
                    onFocus={handleShowMenu}
                    onBlur={() => {
                        setTimeout(() => { handleHideMenu() }, 300)
                    }}
                >
                    <div className={`flex items-center space-x-2 max-w-[200px] truncate`}>
                        <FaUserCircle className=' w-5 h-5' />
                        <p className='font-normal  text-base truncate'>
                            Welcome {user.first_name}
                        </p>
                    </div>
                </button>
                <div
                    className={`absolute top-8 h-auto py-3 z-500 shadow-2xl
                    bg-yellow-200 rounded-[8px] w-full px-1 transition-opacity ease-in-out duration-800
                    space-y-1 ${showMenu ? 'opacity-100 block' : 'opacity-0 hidden'}`}

                >
                    <div className=' hover:bg-yellow-400/50 px-2 py-1 rounded-[5px]'>
                        <Link to={"/account"}>
                            <p>
                                Account
                            </p>
                        </Link>
                    </div>

                    <div className=' hover:bg-yellow-400/50 px-2 py-1 rounded-[5px]'>
                        <Link to={"#"} onClick={() => {
                            setTimeout(() => {
                                signout()
                                handleHideMenu()
                            }, 300)
                        }}>
                            <p>
                                Signout
                            </p>
                        </Link>
                    </div>

                </div>
            </div>

        </>
    )
}

export default UserMenu
