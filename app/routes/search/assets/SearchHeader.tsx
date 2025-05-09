import React from 'react'
import SearchBox from '~/components/helper/SearchBox'

const SearchHeader = ({ query }: any) => {
    return (
        <div className=' bg-yellow-400 pt-24 pb-16'>
            <div className=' flex h-full justify-center items-center flex-col w-[95%] sm:w-[80%] mx-auto relative z-10'>
                <div className=' text-black font-bold relative top-4 text-2xl text-center flex flex-col leading-[1.3em] w-[90%] md:w-full place-items-center place-content-center'>
                    Discover. Connect. Grow.
                </div>
                <div
                    data-aos="zoom-out"
                    data-aos-delay="100"
                    className='mt-12 w-full'>
                    <SearchBox query={query} />
                </div>
                <div className=' text-black font-normal relative top-4 text-[12px] text-center flex flex-col leading-[1.3em] w-[90%] md:w-full place-items-center place-content-center'>
                    Get to know and visit the best of local businesses across the globe. Smartest way to find and be found.
                </div>
            </div>

        </div>
    )
}

export default SearchHeader
