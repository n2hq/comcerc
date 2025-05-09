import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'

const SearchBox = ({ query }: any) => {
    const [queryParam, setQueryParam] = useState('')
    const [formdata, setFormdata] = useState<any | null>(null)

    const changeHandler = (e: any) => {
        setQueryParam(e.target.value); // updates the input value
    };


    useEffect(() => {

        if (query !== null && query !== undefined) {
            setQueryParam(query)
        }

    }, [query])

    return (
        <form action="/search" method='get'>
            <div className=' w-full md:w-[80%] mx-auto bg-white h-[4rem] sm:h-[5rem] flex px-4 sm:px-8 flex-col justify-center rounded-lg'>
                <div className=' flex items-center justify-between h-full'>
                    <input
                        name='q'
                        value={queryParam}
                        onChange={(e) => changeHandler(e)}
                        type="text" placeholder='Enter an address ,city or ZIP to buy'
                        className='sm:flex-[0.85] h-[60%] bg-gray-100 flex grow rounded-lg outline-none px-4 placeholder:text-sm'
                    />
                    <div className='flex items-center ml-4 flex-[0.15] space-x-6 place-content-end'>
                        <div className='lg:flex hidden  items-center cursor-pointer space-x-2'>
                            <HiAdjustmentsHorizontal className=' text-gray-700 w-6 h-6' />
                            {/* <p className='text-gray-700'>Advanced</p> */}
                        </div>
                        <button
                            type='submit'
                            className='w-12 h-12 bg-rose-600 items-center hover:bg-rose-800 transition-all duration-150 flex cursor-pointer justify-center text-white rounded-full'>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SearchBox
