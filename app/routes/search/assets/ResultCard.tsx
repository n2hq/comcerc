import { Link } from '@remix-run/react'
import React from 'react'
import { BiBuilding } from 'react-icons/bi'
import { BsBank } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'
import { RiDoubleQuotesL } from 'react-icons/ri'

const ResultCard = ({ listing }: any) => {

    return (

        <div className={` cursor-pointer`} onClick={(e) => {
            window.location.href = `/${listing.gid}`
        }}>
            <div className={`flex pt-4  rounded-sm gap-4`}>
                <div className={`relative min-w-[100px] w-[100px] h-[100px]`}>
                    <img
                        src={listing.image_url}
                        alt={listing.title}
                        className={`object-cover w-full h-full text-sm
                            rounded `}
                    />
                </div>
                <div className=' w-full'>
                    <div className={`md:flex md:place-content-between 
                w-full md:gap-x-[4px]`}>
                        {/** left */}
                        <div className={`w-full md:w-[60%]`}>
                            <Link to={`/${listing.gid}`} onClick={(e) => e.stopPropagation()}>
                                <div className={`font-bold text-[17px] text-brown-800
                    leading-[1.1em] hover:underline text-blue-900`}>
                                    {listing.title}
                                </div>
                            </Link>
                            <div className={`font-normal text-[13px] leading-[1.2em] mt-[2px]
                    `}>

                                {
                                    listing?.business_phrases ?
                                        `${listing?.business_phrases?.substring(0, 150)}...` :
                                        ''
                                }
                            </div>
                            <div className={`font-normal text-[13px] 
                                    flex place-items-center gap-1 mt-[3px]`}>
                                <Link
                                    className={`hover:underline text-blue-700`}
                                    to={listing.website !== null ? listing.website : "#top"} onClick={(e) => e.stopPropagation()}>
                                    Website
                                </Link>
                                <span><FiArrowRight /></span>
                                <div className={`capitalize flex place-items-center gap-1`}>
                                    {listing.category}
                                </div>
                            </div>
                            {
                                listing?.established &&
                                <div className={`flex gap-2 mt-[5px] place-items-center`}>
                                    <div>
                                        <BsBank />
                                    </div>
                                    <div className={`flex flex-col gap-y-0 leading-3`}>
                                        <div className={`text-[12px] font-bold`}>
                                            Since {listing?.established}
                                        </div>
                                        <div className={`text-[12px]`}>
                                            In Business
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>

                        {/** right */}
                        <div className={`w-full lg:w-[40%] hidden 
                                lg:block`}>
                            <div className={`flex flex-col 
                    place-items-end place-content-end
                        font-semibold text-[15px] tracking-tighter`}>
                                {listing.phone}
                            </div>
                            <div className={`flex flex-col text-end text-[12px]
                                leading-[1.2em]`}>
                                {listing?.address_one}
                                {
                                    listing?.address_two ? `, ${listing?.address_two}` : ''
                                }
                                {
                                    listing?.city_name ? `, ${listing?.city_name}` : ''
                                }
                                {
                                    listing?.state_name ? `, ${listing?.state_name}` : ''
                                }
                                {
                                    listing?.country_name ? `, ${listing?.country_name}` : ''
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={`mt-2 md:mt-3 mb-2 text-[13px] leading-[1.2em]
                    flex place-content-start`}>
                <div className={`relative top-[-3px]`}>
                    <RiDoubleQuotesL className={`tracking-tighter text-[20px]`} />
                </div>
                <div>
                    {
                        listing?.short_description ?
                            `${listing?.short_description?.substring(0, 150)}...` :
                            ''
                    }
                </div>
            </div>
        </div>
    )
}




export default ResultCard
