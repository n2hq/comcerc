import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import PreFooter from './PreFooter'
import Logo from '../header/Logo'
import { Link } from '@remix-run/react'

const discover = [
    {
        title: "New York"
    },
    {
        title: "London"
    },
    {
        title: "Dubai"
    },
    {
        title: "Chicago"
    },
    {
        title: "Brussels"
    },
    {
        title: "Germany"
    },
    {
        title: "Abu Dhabi"
    }
]

const Footer = () => {
    return (
        <>
            <PreFooter />
            <div className=' pt-20 pb-12 bg-black'>
                <div className=' w-[80%] mx-auto grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 border-b-[1.5px] border-white/20'>
                    {/**first footer */}
                    <div>
                        { /**logo */}
                        <Logo theme='dark' />

                        <p className=' text-sm font-extralight text-white/80  mt-6'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos modi praesentium, quo deleniti dolorum voluptatem molestias nemo nihil amet non quas!
                        </p>
                        <p className=' text-gray-300/60 mt-4 font-light'>example@email.com</p>
                        <p className=' text-gray-300/50 mt-2 font-light'>+123 456 7890</p>
                        {/**social links */}
                        <div className=' flex items-center space-x-4 mt-6'>
                            <FaFacebookF className='w-6 h-6 text-gray-500' />
                            <FaTwitter className='w-6 h-6 text-gray-500' />
                            <FaYoutube className='w-8 h-6 text-gray-500' />
                            <FaInstagram className='w-6 h-6 text-gray-500' />
                        </div>
                    </div>

                    {/**second footer */}
                    <div className='md:mx-auto'>
                        <h1 className='footer__heading'>Popular</h1>
                        <p className='footer__link'>Apartment for rent</p>
                        <p className='footer__link'>Apartment Low to High</p>
                        <p className='footer__link'>Offices for Buy</p>
                        <p className='footer__link'>Offices for Rent</p>
                    </div>

                    {/**third footer */}
                    <div className='lg:mx-auto'>
                        <h1 className='footer__heading'>Quick Links</h1>
                        <p className='footer__link'>Terms of use</p>
                        <p className='footer__link'>Privacy Policy</p>
                        <p className='footer__link'>Pricing Plan</p>
                        <p className='footer__link'>Our Services</p>
                        <p className='footer__link'>Contact Support</p>
                        <p className='footer__link'>Careers</p>
                        <p className='footer__link'>FAQ</p>
                    </div>

                    {/**fourth footer */}
                    <div className='md:mx-auto'>
                        <h1 className='footer__heading'>Discover</h1>
                        {
                            discover.map((place: any, index: number) => {
                                return (
                                    <p key={index} className='footer__link'>
                                        <Link to={`/search?q=${place?.title.toLowerCase()}`}>
                                            {place?.title}
                                        </Link>
                                    </p>
                                )
                            })
                        }


                    </div>
                </div>
                <p className=' text-center mt-4 text-sm text-white/40 font-extralight'>
                    Copyright 2025 &copy; | <a href='/'>Dersck</a>
                </p>
            </div>
        </>
    )
}

export default Footer
