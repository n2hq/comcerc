import { Link } from '@remix-run/react'
import React, { useEffect } from 'react'


const BusinessRow = ({ user, business, id }: any) => {


    const businessLink = `/account/businesses/${business.gid}/${user?.guid}`
    return (
        <>
            <Link to={businessLink}>
                <div className='grid grid-cols-12 border hover:bg-gray-200/70 p-3 mb-1 rounded place-content-center text-[14px] gap-1'>
                    <div className=' col-span-1 flex place-items-center '>
                        <div className=' w-[95%] truncate'>
                            {Number.parseInt(id) + 1}
                        </div>
                    </div>
                    <div className=' col-span-4 flex place-items-center truncate'>
                        <div className=' w-[95%] truncate '>
                            {business.title}
                        </div>
                    </div>
                    <div className='hidden md:col-span-2 md:flex place-items-center   '>
                        <div className=' w-[95%] truncate'>
                            {business.category}
                        </div>
                    </div>
                    <div className=' col-span-4 md:col-span-2 flex place-items-center truncate'>
                        {business.country_code}
                    </div>
                    <div className=' col-span-2 md:col-span-2 flex place-items-center '>
                        <div className=' w-[95%] truncate capitalize'>
                            {Boolean(business?.active_status) ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                    <div className=' col-span-1 flex bg-red-200 place-content-end place-items-center'>
                        <div className=' bg-blue-700 w-full text-white py-1 text-center rounded-md cursor-pointer'>
                            GO
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default BusinessRow
