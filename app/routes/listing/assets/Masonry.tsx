import React, { useEffect, useState } from 'react'
import { BsArrowReturnRight } from 'react-icons/bs';
import { MdMore } from 'react-icons/md';
import { useGallery } from '~/context/GalleryContext';
import { useSliderContext } from '~/context/SliderContext';

type Image = {
    id: number;
    image_url: string;
    alt: string;
};

type MasonryProps = {
    images: Image[];
    listing: any
};

const Masonry = ({ images, listing }: MasonryProps) => {

    const [items, setItems] = useState<Image[]>([]);
    const slider = useSliderContext()
    const gallery = useGallery()

    const [shortGallery, setShortGallery] = useState<Image[]>([])

    useEffect(() => {
        let shortGallery = [...items]

        if (images) {
            images.map((image, index) => {
                if (index + 1 < 12) {
                    shortGallery.push(image)
                }

            })

            setShortGallery(shortGallery)
        }
    }, [images])


    const showCarousel = (index: number) => {
        //alert(index)
        //slider.setSelectedSlide(1)
        //setOverlay(true)
        slider.setDialog(true)
        slider.setSelectedSlide(index + 1)
        slider.setGallery(images)
        slider.setListing(listing)
    }

    const showGallery = (index: number) => {
        gallery.setShow(true)
        gallery.setGallery(images)
        gallery.setListing(listing)
    }

    return (
        <div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 ">
                {
                    shortGallery.length > 1 &&
                    shortGallery.map((img, index) => {
                        return (
                            <div key={index}>

                                <div key={index} className={`h-[100px] sm:h-[100px] lg:h-[100px]
                                    hover:cursor-pointer`}
                                    onMouseDown={(e) => showCarousel(index)}
                                >
                                    <img
                                        src={img.image_url}
                                        alt={img.alt}
                                        className={`object-cover w-full h-full rounded-md shadow-md 
                                                transition-transform`}
                                    />
                                </div>

                            </div>

                        )
                    })
                }

                {
                    shortGallery.length > 1 &&
                    <div
                        onMouseDown={(e) => showGallery(0)}
                        className={` h-[100px] sm:h-[100px] lg:h-[100px] relative`}>
                        <div
                            className={`w-full h-full rounded-md shadow-md 
                                            transition-transform bg-black/80 flex flex-col
                                            place-items-center place-content-center text-white
                                            text-[20px] cursor-pointer`}
                        >
                            <BsArrowReturnRight /> view all...
                        </div>
                    </div>
                }


            </div>
            {
                shortGallery.length > 1 &&
                <div className={`h-2`}>

                </div>
            }
        </div>
    )
}

export default Masonry
