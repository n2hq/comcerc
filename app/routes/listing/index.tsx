import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { BsSearchHeart } from 'react-icons/bs'
import ResponsiveNav from '~/components/header/navbar/lite/ResponsiveNav'
import { ContactType, ListingType } from '~/lib/Interfaces'
import SearchHeader from '../search/assets/SearchHeader'
import Entity from './Entity'
import Footer from '~/components/footer/Footer'
import Related from './Related'
import { getBusinessGallery, getGallery, getQuery, getRatingsReviews } from '~/lib/Lib'
import BusinessLayout from './assets/BusinessLayout'
import Header from './assets/Header'
import RatingProvider from '../../context/RatingContext'
import { GalleryProvider } from '~/context/GalleryContext'



const related = [
    {
        gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
        url: "/address",
        img: "https://png.pngtree.com/element_our/sm/20180627/sm_5b334610deb59.jpg",
        title: "Microsoft California, United States",
        category: "Legal",
        short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
        phone: `+234 40 567 09`,
        address: `91764 Condoleza Avenue, Tristan Boulevard, Birmingham, London, UK`
    },
    {
        gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
        url: "/info-log",
        img: "https://i.pinimg.com/736x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg",
        title: "Apple Inc.",
        category: "InfoTech",
        short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
        phone: `+234 40 567 09`,
        address: `91764 Condoleza Avenue, Tristan Boulevard, London`
    },
    {
        gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
        url: "/info-log",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEU7V53///8yUZojR5bi5u+GlL45VZxCXqHd4e01U5tvgLMnSZbO1ORZb6rr7vU3VJwtTZi5wdmSn8SvudT19vrx8/instB/j7weRJR1hraMmsJidq2+xtzX3OrK0OKgrMxbcatPZ6Zleq8ANY9428BgAAAD/ElEQVR4nO3d23KbMBSFYSGwMAgEBp/jHJy+/zsW7LrtRYbIEGlvadZ/05uU8A02iiXAIvlT1ZW5iKW87KoHTNz/6XMtlaLesR9LKanz/j+hqXU8ukdK1+YhzBpJvTtOkk12F5qmod4XRzWNuQnrgnpPnFXUo7DX1PvhMN0Pwjy+k8y/VJ6IKuZDOBzESnRxnkcfyU6UMb9Ih5dpKaJ+G45vROo9QAghhBBCCCGEEEKIvEK2Ok3139JbWrdDUhYq6PVOJbUWL6v9pVqb3fbWbmeybP1avV02/Xu3Or1c8/GHgky1ab66ZMm3bc1rgLOhw9H72Fvo/hTcfLZq225tzQtQ2Ir+GV5wwlbun/SFJVTpYfc0MCShFG/P+0IS6s/tHGA4Qt3N8gUjVMdnT6GBCZW+zAUGIkw3s4FhCPXzo2BYwna1ABiCcLzyLGqhak3kQj17nAhEWLwsA/IXHp/6MBigUB4WArkLVWs/XRGmcPkh5C5Ml74LuQuLj8VA5kK94C/uIIRKzvtYH46wOC0H8hb+xIuUuXDG5GFQwub6A0DWQnl+irI16+qLOK89tfZvw93mcC30l1ErptK2f9CsTzrI+1tVYTkantNAb1tSVzvgZ0u9p3OTpRWwDBZoeSrdpNT7Ob/Wah445BuUrQaLDevR4Ju0zYJoGfI92Lr6HrgN+UVqNYOxDvlFKlKLabZL9MJ9uIOhsBOGfZu5jfAcvXAFIesghJB/EELIPwgh5B+EEPIPQgj5ByGE/ItDqCY6WgmntsDhTud8IptLS8+TWxij9RV2q7xLymin/T0I36IX9rQLGx6ExAsbHoSn6IU17SKxByGpz4fQEK+guhdSr/O7FxIPhx6E1Ov87oXUq+DuhdSXTLkXXok/PrkXtrELDfUlU86Fr9ELL9QXhTkXvkcvJJ+Kcy58ob6C2LmQ/K4u18It9XDoXJiR34vhWkj/RVWuhRvqwcK5kP4aadfCE/Vg4VxYU59KnQupfc6FO/Lh0LWQeirRvZB6KnFIfWbriSxudDYT/z17Jx8shoP49S30935ZrHIfjhMbYACcLo5rMaaCEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8ghJB/EELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPzzKCR66pkvocpFGbmwFEQPlPIllJ0geuyZL6GuBNHjBz0JVZ6IpCc5iJ6Euh+ESU3x4DM/wqJORqFpCL5EwYuwacxNmGSF//OpD6Esxl8yChNTa9+nG/dCpWuTPIRJ0udaekW6FSoldd7ftyIem6u60ucXRLkV5mVXPbbyG8lbTVu7+lVZAAAAAElFTkSuQmCC",
        title: "Facebook Incorporated",
        category: "InfoTech",
        short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
        phone: `+234 40 567 09`,
        address: `91764 Condoleza Avenue, Tristan Boulevard, London`
    },
    {
        gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
        url: "/info",
        img: "data:image/png;base64,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",
        title: "NVIDIA Global Technologies",
        category: "Legal",
        short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
        phone: `+234 40 567 09`,
        address: `91764 Condoleza Avenue, Tristan Boulevard, Birmingham, London, UK`
    },
    {
        gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
        url: "/info-log",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxCWYT8S1wAr5DWDNuFOE5NMPwmhE7zBXPQ&s",
        title: "JP Morgan",
        category: "InfoTech",
        short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
        phone: `+234 40 567 09`,
        address: `91764 Condoleza Avenue, Tristan Boulevard, London`
    },
    {
        gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
        url: "/address",
        img: "https://png.pngtree.com/element_our/sm/20180627/sm_5b334610deb59.jpg",
        title: "Microsoft California, United States",
        category: "Legal",
        short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
        phone: `+234 40 567 09`,
        address: `91764 Condoleza Avenue, Tristan Boulevard, Birmingham, London, UK`
    },
]

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params.id || null
    let listing = await getQuery(id)
    const gallery = await getBusinessGallery(id)
    const ratingData = await getRatingsReviews(id)


    let message = "Hello! We are here"

    return {
        message: message,
        listing: listing,
        related: related,
        gallery: gallery,
        ratingsData: ratingData
    }
}

const index = () => {
    const data: any = useLoaderData()
    const listing: any = data.listing
    const related: any = data.related
    const gallery: any = data.gallery
    const ratingsData: any = data.ratingsData

    return (
        <RatingProvider>
            <GalleryProvider>
                <ResponsiveNav />
                <SearchHeader />
                <BusinessLayout
                    listing={listing}
                    images={gallery}
                    ratingsData={ratingsData}
                />
                <div className={`h-32`}></div>
                <Related
                    category={listing?.category}
                    limit={6}
                    title={`Related: ${listing?.category}`}
                    subtitle={"Related based on the same category."}
                />
                <Footer />
            </GalleryProvider>
        </RatingProvider>
    )
}

export default index
