import React, { useEffect, useState } from 'react'
import { ListingType } from '~/lib/Interfaces'
import { getBusinessFeatures } from '~/lib/Lib'

const BusinessFeatures = ({ listing }: any) => {
    const [features, setFeatures] = useState<any>(undefined)

    useEffect(() => {
        getBusinessFeatures(listing.gid).then((data) => {
            setFeatures(data)
        })

    }, [listing.business_guid])
    return (
        <div className=' mt-12'>
            <div className={` font-bold text-xl`}>
                Features
            </div>

            <div className={`grid grid-cols-2 gap-4 mt-3`}>
                {
                    features?.map((feature: any, index: any) => {
                        return (
                            <div key={index} className={`flex flex-col`}>
                                <div className={`font-bold`}>
                                    {feature.name}
                                </div>
                                <div className={`text-sm mt-[-2px] text-gray-500 leading-[1.2em] tracking-normal`}>
                                    {feature.user_description || feature.description}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BusinessFeatures
