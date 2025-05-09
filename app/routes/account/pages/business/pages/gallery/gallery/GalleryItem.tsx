import React, { useState } from 'react'
import { BiEdit, BiEditAlt } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import Carousel from '~/routes/account/pages/business/pages/gallery/gallery/carousel/Carousel'
import GalleryItemMenu from './GalleryItemMenu'

const GalleryItem = ({
    showCarousel,
    item,
    itemIndex,
    userGuid,
    businessGuid
}: any) => {
    const [menu, setMenu] = useState<any>(false)

    const showMenu = () => {
        setMenu(true)
    }

    const hideMenu = async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setMenu(false)
    }

    return (
        <div className='z-0'>
            <div
                className={`border-[1px] h-fit p-1 rounded-md shadow-md
                    hover:cursor-pointer relative z-0`}
            >

                {/** edit button */}
                <button
                    onMouseDown={showMenu}
                    onBlur={hideMenu}
                    className={`w-[30px] h-[30px] z-50 bg-white 
                flex place-content-center place-items-center 
                rounded-full absolute right-2 top-2 cursor-pointer
                hover:bg-gray-500 hover:text-white/80 transition duration-1000 ease-in-out`}>
                    <BiEditAlt className={`text-[20px]`} />
                </button>


                <div
                    onMouseDown={(e) => showCarousel(itemIndex)}
                    className={`relative h-[170px] xl:h-[160px]
                         rounded-md overflow-hidden -z-10
                    `}>
                    <img
                        src={item.image_url}
                        alt=""
                        className={`object-cover w-full h-full -z-40
                        `}
                    />
                </div>
                {
                    (item.image_title).length > 0 &&
                    <div className={`text-[13px] mt-2 mb-1.5 leading-[1.2em] mx-[2px]`}>
                        {item.image_title}
                    </div>
                }

                <GalleryItemMenu
                    item={item}
                    menu={menu}
                    userGuid={userGuid}
                    businessGuid={businessGuid}
                />


            </div>

        </div>
    )
}

export default GalleryItem
