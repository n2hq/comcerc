import { createContext, useContext, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { useSliderContext } from "./SliderContext";

const GalleryContext = createContext<any | null>(null)

export default GalleryContext

export function useGallery() {
    const context = useContext(GalleryContext)

    if (!context) {
        throw new Error("useGallery must be used within a GalleryProvider")
    }
    return context
}

type Image = {
    id: number;
    image_url: string;
    alt: string;
};

type MasonryProps = {
    images: Image[];
};

export const GalleryProvider = ({ children }: any) => {
    const [show, setShow] = useState(false)
    const [gallery, setGallery] = useState<any>(null)
    const slider = useSliderContext()
    const [listing, setListing] = useState<any>(null)

    const handleClose = () => setShow(false)
    let vals = {
        setShow, setGallery,
        setListing
    }

    const showCarousel = (index: number) => {

        slider.setDialog(true)
        slider.setSelectedSlide(index + 1)
        slider.setGallery(gallery)
    }
    return (
        <GalleryContext.Provider value={vals}>
            {
                show &&
                <div
                    onMouseDown={(e) => setShow(false)}
                    className={`flex w-screen h-screen bg-black/40 
                        z-[3000] fixed top-0 left-0 right-0 bottom-0
                        place-items-center place-content-center px-[15px]`}>

                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`w-[95%] sm:w-[95%] md:w-[80%] h-fit mx-auto
                         bg-white rounded-lg shadow-md space-y-6
                         z-[3100] overflow-hidden`}>

                        <div className={`w-full h-full`}>
                            <div className={`border-b py-3 px-3`}>
                                <div className={`font-bold text-gray-700
                                    text-xl`}>
                                    Gallery for {listing && listing?.title}
                                </div>
                            </div>
                            <div className={`grid grid-cols-4 md:grid-cols-6 gap-2 
                                max-h-[300px] overflow-y-auto pt-2 px-2 pb-2
                                bg-black`}>
                                {gallery &&
                                    gallery?.map((image: any, index: number) => {
                                        return (
                                            <div
                                                onClick={() => showCarousel(index)}
                                                className={`relative hover:cursor-pointer
                                                 bg-red-200 md:h-[100px] lg:h-[120px] rounded-md
                                                 overflow-hidden`}>
                                                <img
                                                    className={`object-cover w-full h-full`}
                                                    src={image.image_url} alt="" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/** close button handle */}
                        <div
                            onMouseDown={() => handleClose()}
                            className={`w-[50px] h-[50px] z-[300] bg-white
                                flex place-content-center place-items-center
                                rounded-full absolute left-2 top-2 cursor-pointer
                                hover:bg-white/40 transition duration-1000 ease-in-out`}>
                            <IoClose className={`text-[30px]`} />
                        </div>
                    </div>
                </div>
            }
            {children}
        </GalleryContext.Provider>
    )
}