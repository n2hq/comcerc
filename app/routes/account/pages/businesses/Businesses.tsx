import React from 'react'
import BusinessRow from './BusinessRow'
import ShowError from '~/components/content/ShowError'
import { Link } from '@remix-run/react'

const Businesses = ({ user, businesses }: any) => {
    return (
        <div className='tbl__class'>
            <div className='grid grid-cols-12 border bg-gray-200/50 hover:bg-gray-200/70 p-3 mb-1 rounded place-content-center text-[14px] gap-1 font-bold'>
                <div className=' col-span-1 flex place-items-center '>
                    <div className=' w-[95%] truncate'>
                        ID
                    </div>
                </div>
                <div className=' col-span-4 flex place-items-center truncate'>
                    <div className=' w-[95%] truncate '>
                        Title
                    </div>
                </div>
                <div className='hidden md:col-span-2 md:flex place-items-center   '>
                    <div className=' w-[95%] truncate'>
                        Category
                    </div>
                </div>
                <div className=' col-span-4 md:col-span-2 flex place-items-center truncate'>
                    Country
                </div>
                <div className=' col-span-1 md:col-span-2 flex place-items-center'>
                    <div className=' w-[95%] truncate'>
                        Status
                    </div>
                </div>
                <div className=' col-span-1 flex place-content-end place-items-center'>
                    &nbsp;
                </div>
            </div>
            <div className=''>
                {
                    businesses.success ?
                        businesses.data.map((business: any, index: any) => {
                            return (
                                <div key={index}>
                                    <BusinessRow user={user} business={business} id={index} />
                                </div>
                            )
                        })
                        :
                        <div
                            onClick={() => window.location.href = `/account/add-business`}
                            className={`flex justify-center items-center
                        h-[200px] bg-blue-50 border cursor-pointer`}>
                            Add a business

                        </div>
                }
            </div>
        </div>
    )
}

export default Businesses
