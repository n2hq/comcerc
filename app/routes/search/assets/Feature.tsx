import { Link } from '@remix-run/react'
import React from 'react'

const Feature = ({ feature }: any) => {

    return (
        <div id={feature.gid} className={`pb-5 pt-4`}>
            <Link to={`/${feature.gid}`}>
                <div className={`text-[14.5px] tracking-tight 
                text-blue-800`}>
                    {feature.title}
                </div>
            </Link>
            <div className={`text-md font-semibold 
                tracking-tight mt-[2px]`}>
                {feature.phone}
            </div>
            <div className={`text-[14px] font-normal 
                tracking-tighter mt-[2px] leading-[1.3em]
                text-gray-500`}>
                {feature.short_description.substring(0, 80)}
            </div>
            <div className={`text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`}>
                {feature.address_one}
            </div>
            <div className={`text-[13px] font-normal 
                tracking-tight mt-[8px] text-blue-800`}>
                <Link to={feature.website ? feature.website : `#${feature.gid}`}>
                    Website
                </Link>
            </div>
        </div>
    )
}

export default Feature
