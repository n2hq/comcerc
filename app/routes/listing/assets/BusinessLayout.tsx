import React from 'react'
import Header from './Header'
import Masonry from './Masonry';
import PreDescription from './ShortDescription';
import Description from './Description';
import Address from './Address';
import Review from './Review';
import Rating from '../../../context/RatingContext';
import StarRating from './StarRating';
import BusinessFeatures from './BusinessFeatures';
import ShortDescription from './ShortDescription';
import UserReviews from './BusinessRatings';
import BusinessRatings from './BusinessRatings';


const BusinessLayout = ({
    listing,
    images,
    ratingsData
}: any) => {
    return (
        <div className={`px-[20px]`}>
            <div className={`max-w-[1100px] w-full mx-auto bg-white`}>
                {
                    ratingsData && <StarRating ratingsData={ratingsData} rating={Number(ratingsData.rating_average)} />
                }
                {
                    listing && <Header listing={listing} />
                }
                <div className={`grid grid-cols-12 mt-4 gap-4 relative`}>
                    <div className={` col-span-12 lg:col-span-8`}>
                        {
                            images && listing &&
                            <Masonry
                                images={images}
                                listing={listing}
                            />
                        }

                        <div className={`lg:hidden mt-5 mb-5`}>
                            <Address />
                            {
                                listing && <Review listing={listing} />
                            }

                        </div>

                        <ShortDescription listing={listing} />
                        <BusinessFeatures listing={listing} />
                        <Description listing={listing} />

                        {listing && <BusinessRatings listing={listing} />}

                    </div>

                    <div className={`col-span-12 lg:col-span-4 hidden lg:block`}>
                        <div className={` sticky top-[100px]`}>
                            <Address />
                            <Review />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}


export default BusinessLayout
