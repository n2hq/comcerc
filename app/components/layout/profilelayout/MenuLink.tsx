import { Link, useLocation } from '@remix-run/react';
import React from 'react'

const MenuLink = ({ menu }: any) => {

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <Link to={menu!.path}
            className={`text-[15px] text-black lowercase  px-[20px] py-[10px] flex items-center content-center gap-[10px] my-0 mx-[5px] rounded-[5px] hover:bg-gray-500/15 ${pathname === menu.path && 'bg-blue-600/10'}`}
        >
            {menu.icon}
            <span className='first-letter:uppercase first-letter:font-bold font-sans first-letter:text-black'>{menu?.title}</span>
        </Link>
    )
}

export default MenuLink
