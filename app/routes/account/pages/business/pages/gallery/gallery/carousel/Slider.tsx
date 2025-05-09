import React, { useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { FcCancel } from 'react-icons/fc'
import { GiCancel } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'

const Slider = ({ slides, selectedSlide, handleClose }: any) => {
    const [currentSlide, setCurrentSlide] = useState<any>(0)

    const slideStep = useRef(0)
    const counter = useRef(0)
    let slideIncrement = 0

    const prev = () => {
        setCurrentSlide((currentSlide: any) => {
            return (currentSlide === 0) ? slides.length - 1 : currentSlide - 1
        })
    }

    const next = () => {
        setCurrentSlide((currentSlide: any) => {
            return (currentSlide === slides.length - 1) ? 0 : currentSlide + 1
        })
    }

    useEffect(() => {
        if (selectedSlide !== null) {
            setCurrentSlide(selectedSlide - 1)
        }
    }, [selectedSlide])

    return (
        <>
            <div className={`grid grid-cols-12 gap-0 `}>
                <div className={`col-span-12 md:col-span-9 w-full h-full relative bg-black flex`}>
                    <div className={` w-auto h-screen flex overflow-hidden`}>
                        {
                            slides.map((slide: any, index: any) => {

                                return (
                                    <img
                                        key={index}
                                        src={slide.image_url}
                                        alt=""
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                        className={`object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`}
                                    />
                                )
                            })
                        }
                    </div>
                    <button onMouseDown={prev} className={`block absolute top-0 bottom-0 
                p-[1rem] cursor-pointer left-0 group h-full 
                transition duration-1000 ease-in-out`}>
                        <div className={`w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`}>
                            <BiChevronLeft className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                        </div>

                    </button>
                    <button onMouseDown={next} className={`block absolute top-0 bottom-0 
                    p-[1rem] cursor-pointer right-0 group 
                     transition duration-1000 ease-in-out`}>
                        <div className={`w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`}>
                            <BiChevronRight className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                        </div>
                    </button>

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
                <div className={`hidden md:block md:col-span-3 px-5`}>
                    <h1 className=' text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]'>Photos for Jason Won, DPT - Flex With Doctor Jay</h1>
                    <div className=' my-4 '>{currentSlide + 1} / {slides.length}</div>
                    <hr />
                    <div className=' my-4'>{slides[currentSlide].image_title}</div>
                </div>
            </div>
        </>
    )
}

export default Slider
