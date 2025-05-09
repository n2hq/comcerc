import React, { useEffect, useState } from 'react'
import { useAuth } from '~/context/AuthContext'
import { NavProp } from '~/lib/Interfaces'
import Logo from '../../Logo'
import { navlinks } from '~/lib/json'
import { Link } from '@remix-run/react'
import UserMenu from '../../UserMenu'
import SigninLink from '../../SigninLink'
import { HiBars3BottomRight } from 'react-icons/hi2'

const Nav = ({ openNav }: NavProp) => {
    const [navBg, setNavBg] = useState(false)
    const [scrollHeight, setScrollHeight] = useState(1)
    const { user, signout } = useAuth()

    useEffect(() => {
        const handler = () => {
            (window.scrollY >= scrollHeight) && setNavBg(true);
            (window.scrollY < scrollHeight) && setNavBg(false)
        }
        window.onscroll = () => handler()
    }, [])
    return (
        <div className={`fixed ${navBg ? 'bg-gray-800' : ''} h-[72px] z-[300] w-full transition-all ease-in-out duration-0`}>
            <div className='flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto'>
                { /**logo */}
                <Logo theme='dark' />
                {/**Nav Links */}
                <div className=' lg:flex items-center space-x-14 text-white hidden'>
                    {navlinks.map((navlink) => {
                        return <Link key={navlink.id} to={navlink.url}>
                            <p className='font-bold tracking-tighter text-[14px] text-white/80 font-sans hover:text-yellow-300'>
                                {navlink.label}
                            </p>
                        </Link>
                    })}
                </div>
                {/**Login and burgermenu */}
                <div className=' flex items-center space-x-4'>
                    { /**login button */}
                    {
                        user ?
                            <UserMenu user={user} signout={signout} navBg={navBg} />
                            :
                            <SigninLink />
                    }
                    {/**burger menu */}
                    <HiBars3BottomRight onClick={openNav} className='sm:w-8 sm:h-8 w-6 h-6 cursor-pointer text-white' />
                </div>
            </div>
        </div>
    )
}

export default Nav
