import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { NavProp } from '~/lib/Interfaces';
import Logo from '../../Logo';

const Nav = ({ openNav }: NavProp) => {
    const [navBg, setNavBg] = useState(false)
    const [scrollHeight, setScrollHeight] = useState(3)

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= scrollHeight) {


                setNavBg(true)
            }
            if (window.scrollY < scrollHeight) {
                setNavBg(false)
            }
        }

        window.onscroll = () => handler()


    }, [])

    return (
        <div className={`fixed ${navBg ? 'bg-black' : 'bg-black'} h-[10vh] z-[300] w-full transition-all ease-in-out duration-100 border-b border-gray-500/50`}>
            <div className='flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto'>
                { /**logo */}

                <Logo theme='dark' />

                {/**Nav Links */}
                <div className={` lg:flex items-center space-x-14  hidden`}>

                </div>
                {/**Login and burgermenu */}
                <div className=' flex items-center space-x-4'>

                </div>
            </div>
        </div>
    )
}

export default Nav
