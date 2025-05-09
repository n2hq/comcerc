import React from 'react'

const ShortDescription = ({ listing }: any) => {
    return (
        <div className={`mt-4`}>
            <div className={`text-lg font-bold`}>Intro</div>

            <div className={` text-[14px] flex flex-col gap-y-4 whitespace-pre-wrap`}>
                {listing.short_description}
            </div>
        </div>
    )
}

export default ShortDescription
