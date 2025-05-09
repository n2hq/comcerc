import React, { useEffect, useState } from 'react'
import Feature from './Feature'
import { getFeaturedListing } from '~/lib/Lib'

const featuredData = [
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        website: '',
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasdf'
    },
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        website: 'http://google.com',
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasmf'
    },
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        website: 'http://google.com',
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasdg'
    },
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        website: '',
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasd8'
    },


]


const Featured = () => {
    const [featured, setFeatured] = useState<any[]>([])

    useEffect(() => {
        getFeaturedListing().then((featured) => {
            setFeatured(featured)
        })
    }, [])

    return (
        <div className={`border-[1px] px-4 pt-4 pb-0
        rounded border-gray-200`}>
            <div className={`font-semibold`}>Featured</div>
            <div className={`divide-y`}>
                {
                    featured &&
                    featured?.map((feature: any, index: number) => {
                        return (
                            <Feature key={index} feature={feature} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Featured
