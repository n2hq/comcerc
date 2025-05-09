import React, { useEffect, useState } from 'react'
import { getBusinessRatings, getLocalDate, getRatingsReviews } from '~/lib/Lib'
import StarRating from './StarRating'
import SingleStarRating from './SingleStarRating'

const BusinessRatings = ({ listing }: any) => {
    const [reviews, setReviews] = useState<any[]>([])
    const [ratingsRevews, setRatingsReviews] = useState<any>({})

    useEffect(() => {

        const getReviews = async (guid: string) => {
            if (guid) {
                await getBusinessRatings(guid).then((data) => {

                    setReviews(data)
                })
            }
        }

        const getRatingsReviewsData = async (guid: string) => {
            if (guid) {
                await getRatingsReviews(guid).then((data) => {

                    setRatingsReviews(data)
                })
            }
        }

        if (listing.gid) {
            getReviews(listing.gid)
            getRatingsReviewsData(listing.gid)
        }
    }, [listing])

    return (
        <div className={`mt-12`}>
            <div className={`text-xl font-bold`}>Reviews</div>

            <div className={`-mt-1 text-[14px] flex flex-col -gap-y-1 font-light`}>
                <div className={`font-bold`}>Overall Rating:</div>
                {
                    ratingsRevews &&
                    <SingleStarRating rating={ratingsRevews?.rating_average} />
                }
            </div>

            <hr className={`mt-3`} />

            <div className={`flex flex-col gap-y-4 divide-y-[1px]`}>
                {
                    reviews !== null && reviews?.map((review: any, index: number) => {
                        return (
                            <div key={index} className={`pt-7 pb-4`}>
                                <div className={`flex place-items-start gap-2`}>
                                    <div className={`w-[30px] h-[30px] rounded-full
                                        bg-black overflow-hidden`}>
                                        <img src={review.image_url} alt="" />
                                    </div>
                                    <div className={`flex flex-col`}>
                                        <div className={`text-sm font-bold`}>
                                            {review.fullname}
                                        </div>
                                        <div className={`text-[12px]`}>
                                            {
                                                `${review?.city_name}, ${review?.state_name}`
                                            }
                                        </div>
                                        <div className={`text-[12px]`}>
                                            {
                                                `${review?.country_name}`
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={`mt-2`}>
                                    <div>
                                        <SingleStarRating rating={review.rating} />
                                    </div>
                                    <div className={`text-[12px] flex gap-1 place-items-center`}>
                                        <b>Created at:</b>
                                        <span className={`text-[12px]`}>{getLocalDate(review.created_at)}</span>
                                    </div>
                                    <div className={`text-[12px] flex gap-1 place-items-center`}>
                                        <b>Last Edited:</b>
                                        <span className={`text-[12px]`}>{getLocalDate(review.updated_at)}</span>
                                    </div>
                                    <div className={`text-[14px] mt-2`}>
                                        {review.comment}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BusinessRatings
