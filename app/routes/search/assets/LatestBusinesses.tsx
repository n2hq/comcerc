import React, { useEffect, useState } from 'react'
import SingleStarRating from '~/routes/listing/assets/SingleStarRating'
import LatestStarRating from './LatestStarRating'
import { Link } from '@remix-run/react'
import { getListingByCategory } from '~/lib/Lib'



const LatestBusinesses = ({
    title,
    subtitle,
    category,
    limit
}: any) => {
    const [ti, setTi] = useState('')
    const [st, setSt] = useState('')
    const [listings, setListings] = useState<any[]>([])
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

    useEffect(() => {
        if (title && subtitle) {
            setTi(title)
            setSt(subtitle)
        }
    }, [title, subtitle])

    let getListings = async (category: string, limit: number) => {
        if (limit && category) {
            let cat = await getListingByCategory(category, limit)

            setListings(cat)
        }
    }

    useEffect(() => {

        if (limit && category) {
            getListings(category, limit)
        }
    }, [limit, category])

    return (
        <div className={`mt-10 border-t pt-5`}>
            <div className={` mb-[20px] `}>
                <div className={`font-semibold text-xl`}>
                    {ti}
                </div>
                <div className={`text-sm -mt-[2px]`}>
                    {st}
                </div>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4`}>
                {
                    listings?.map((data: any, index: number) => {
                        return (
                            <div key={index}>
                                <div>
                                    <Link to={`/${data.gid}`}>
                                        <div className={`relative h-[180px]`}>
                                            <img
                                                className={`object-cover w-full h-full
                                                    text-sm`}
                                                src={IMG_BASE_URL + data?.image_url}
                                                alt={data.title}
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <div className={`mt-1 text-[15px] tracking-tight 
                                     truncate`}>
                                    {data.title}
                                </div>

                                <div className={`mt-1`}>
                                    <LatestStarRating rating={data.avg_rating} />
                                </div>

                                <div className={`text-[11px] mt-[5px] tracking-tight
                                    leading-[1.2em]`}>
                                    {data.short_description.substring(0, 100)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LatestBusinesses
