import React from 'react'
import { BiLocationPlus } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { FaInternetExplorer } from 'react-icons/fa'
import { FaLocationPin } from 'react-icons/fa6'
import { GrLocation, GrMapLocation } from 'react-icons/gr'
import { IoMdGlobe } from 'react-icons/io'
import { MdLocationPin, MdOutline3gMobiledata, MdPhone, MdWeb } from 'react-icons/md'

const Address = () => {
    return (
        <div className={`bg-blue-50/50 rounded-[5px] overflow-hidden  px-0 pt-0 pb-5 w-full`}>
            <div className={`font-bold text-[18px] border-b pb-2 
                 shadow-gray-700/40 px-3 bg-blue-100/50 pt-3`}>
                Address
            </div>
            <div className='h-[30px]'></div>

            <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 
            text-[14px] space-y-3 sm:space-y-0  lg:space-y-3 tracking-tight
            md:space-x-4 lg:space-x-0 text-black/80 font-sans
            px-3`}>
                <div className={` w-full`}>

                    <div className={`grid grid-cols-12`}>
                        <div className={`col-span-1 `}>
                            <MdLocationPin className={`text-[22px]`} />
                        </div>
                        <div className={`col-span-11 leading-[1.2em] ml-2`}>
                            13 West Bestern Street, 23897, New York City, USA
                        </div>
                    </div>
                </div>

                <div className={`  w-full`}>

                    <div className={`grid grid-cols-12`}>
                        <div className={`col-span-1`}>
                            <MdPhone className={`text-[22px]`} />
                        </div>
                        <div className={`col-span-11 leading-[1.2em] ml-2`}>
                            +1 54 98 345 9
                        </div>
                    </div>
                </div>

                <div className={`  w-full`}>

                    <div className={`grid grid-cols-12`}>
                        <div className={`col-span-1`}>
                            <MdOutline3gMobiledata className={`text-[22px]`} />
                        </div>
                        <div className={`col-span-11 leading-[1.2em] ml-2`}>
                            www.google.com/entry/permit
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Address
