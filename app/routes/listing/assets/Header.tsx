import React from 'react'

const Header = ({ listing }: any) => {
    return (
        <>
            <div className={`text-[24px] font-bold mt-[0px] leading-7`}>
                {listing?.title}
            </div>
            <div className={`text-[13px] mt-1.5 leading-[1.2em]`}>
                {listing?.address_one ? `${listing?.address_one}, ` : ''}
                {listing?.address_two ? `${listing?.address_two}, ` : ''}
                {listing?.city_name ? `${listing?.city_name}, ` : ''}
                {listing?.state_name ? `${listing?.state_name}, ` : ''}
                {listing?.country_name}
            </div>
        </>
    )
}

export default Header
