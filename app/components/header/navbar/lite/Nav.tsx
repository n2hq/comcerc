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
        <div className={`fixed ${navBg ? 'bg-yellow-300' : 'bg-yellow-300'} h-[72px] z-[300] w-full transition-all ease-in-out duration-100 `}>
            <div className='flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto'>
                { /**logo */}
                <Logo theme='light' />
                {/**Nav Links */}
                <div className={` lg:flex items-center space-x-14  hidden`}>
                    {navlinks.map((navlink) => {
                        return <Link key={navlink.id} to={navlink.url}>
                            <p className={`${navBg ? 'text-black' : 'text-black'} font-bold tracking-tighter text-[14px]  font-sans hover:text-black/40`}>
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
                    <HiBars3BottomRight onClick={openNav} className={`${navBg ? 'text-black' : 'text-black'} w-8 h-8 cursor-pointer `} />
                </div>
            </div>
        </div>
    )
}

export default Nav
