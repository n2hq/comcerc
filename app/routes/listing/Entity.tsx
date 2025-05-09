import React from 'react'
import { IoBagHandle } from 'react-icons/io5'
import { Listing, ListingType } from '~/lib/Interfaces'



const Entity = ({ contact }: Listing) => {
    console.log(contact)
    return (
        <>
            <div className=' z-0 pt-16 pb-16'>
                <div className=' w-[95%] sm:w-[90%] xl:w-[80%] mx-auto '>
                    {
                        contact!.gid !== undefined
                            ?
                            <div>
                                <div className=' mb-5 border-b pb-3'>
                                    <div className='font-sans text-[21px] font-[800]'>
                                        {contact?.title}
                                    </div>

                                </div>

                                <div className=' md:flex'>
                                    <div className=' min-w-[120px] w-[120px]   h-[100px] relative rounded-[12px] overflow-hidden float-left mr-4 shadow-lg'>
                                        <img
                                            src={contact?.img}
                                            alt={contact?.title}
                                            className=' object-cover w-full h-full text-[11px] bg-blue-50 flex place-content-center place-items-center text-center'
                                        />
                                    </div>
                                    <div className=' w-full  text-wrap'>
                                        <div className='font-[700] text-[17px] mb-3 border-b border-gray-300 flex place-content-start place-items-center gap-x-1'>
                                            <IoBagHandle className='relative -top-[1px]' />
                                            <span>Business Card</span>
                                        </div>

                                        <div className=' font-sans mb-2 text-[16px] font-bold leading-[1.1em]'>
                                            {contact?.title}
                                        </div>

                                        <div className=' font-sans text-[15px] tracking-tight '>
                                            {contact?.short_description}
                                        </div>
                                    </div>
                                </div>

                                <div className=' gap-4'>

                                    <div className=' max-w-[600px]  text-wrap'>
                                        <div className=' font-sans text-[15px] tracking-tight mt-2 leading-[1.4em]'>
                                            <b>Address:</b> {contact?.address_one}
                                        </div>

                                        <div className="flex text-[15px] mt-[2px] gap-2">
                                            <div className=" ">
                                                <b>Phone: </b>
                                            </div>
                                            <div className=" tracking-tight">
                                                {contact?.phone}
                                            </div>
                                        </div>

                                        <div className="flex text-[15px] mt-0 gap-2">
                                            <div className=" ">
                                                <b>Category: </b>
                                            </div>
                                            <div className=" tracking-tight">
                                                {contact?.category}
                                            </div>
                                        </div>

                                        <div className="flex text-[15px] mt-0 gap-2">
                                            <div className=" ">
                                                <b>Email: </b>
                                            </div>
                                            <div className=" tracking-tight">
                                                {contact?.email_address}
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            :
                            <div className='text-2xl'>
                                Resource not found.
                            </div>
                    }
                </div>
            </div >
        </>
    )
}

export default Entity
