import React, { useEffect, useState } from 'react'
import { NavTheme } from '~/lib/Interfaces'
import { FaArrowUpZA, FaB, FaC, FaE, FaHouse, FaO, FaR, FaS, FaY, FaZ } from 'react-icons/fa6'
import { FaAmazon, FaBezierCurve, FaCcAmex, FaDizzy, FaMizuni, FaZhihu } from 'react-icons/fa'
import { FcOrganization } from 'react-icons/fc'


const Logo = ({ theme }: NavTheme) => {
    const [navTheme, setNavTheme] = useState('lite')
    useEffect(() => {
        setNavTheme(theme)
    }, [theme])
    return (
        <div className='flex place-items-center space-x-1 relative'>
            <div className={`${theme === "light" ? "bg-black text-white" : "bg-white/90 text-black"} 
            md:w-9 md:h-9 w-8 h-8 rounded-full relative
            flex justify-center flex-col`}>
                <FaC className=' text-lg absolute left-1' />
                <FaO className=' text-lg absolute right-1' />
            </div>
            <h1 className={`${theme === "light" ? "text-black" : "text-white/90"} 
            font-[700] text-2xl sm:text-2xl md:text-3xl tracking-tight relative top-[-1px]
            first-letter: font-sans first-letter: `}>
                comcerc
            </h1>
        </div>
    )
}

export default Logo
