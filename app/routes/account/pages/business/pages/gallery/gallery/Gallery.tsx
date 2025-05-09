import React, { useState } from 'react'
import GalleryItem from './GalleryItem'
import Carousel from '~/routes/account/pages/business/pages/gallery/gallery/carousel/Carousel'
import AddPhoto from './AddPhoto'
import AddPhotoDialog from './AddPhotoDialog'
import { useSliderContext } from '~/context/SliderContext'

const Gallery = ({ gallery, userGuid, businessGuid }: any) => {
    const [overlay, setOverlay] = useState(false)
    const [selectedSlide, setSelectedSlide] = useState<any>(0)
    const slider = useSliderContext()

    const handleClose = () => { setOverlay(false) }
    const handleOpen = () => { setOverlay(true) }

    const showCarousel = (index: number) => {
        //setSelectedSlide(index)
        //setOverlay(true)
        slider.setDialog(true)
        slider.setSelectedSlide(index + 1)
        slider.setGallery(gallery)
    }




    return (
        <div className={``}>
            <div className={` border-[1px] p-3 rounded-[5px] 
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-4 xl:grid-cols-5 gap-2 z-0`}>
                {
                    gallery.map((item: any, index: any) => {
                        return (
                            <div key={index} className='z-0'>
                                <GalleryItem
                                    showCarousel={showCarousel}
                                    item={item}
                                    itemIndex={index}
                                    userGuid={userGuid}
                                    businessGuid={businessGuid}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <Carousel
                overlay={overlay}
                setOverlay={setOverlay}
                selectedSlide={selectedSlide + 1}
                handleClose={handleClose}
                gallery={gallery}
            />


        </div>
    )
}

export default Gallery
