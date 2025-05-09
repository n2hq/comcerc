import React, { useState } from 'react'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '~/components/content/input/Input'

import { LoaderFunction, useLoaderData } from 'react-router'
import SettingsSchema from './GallerySchema'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import BusinessMenu from '../../BusinessMenu'
import Gallery from './gallery/Gallery'
import { getGallery } from '~/lib/Lib'
import AddPhoto from './gallery/AddPhoto'




export const loader: LoaderFunction = async ({ request, params }) => {
    const businessGuid = params.business_guid || null
    const userGuid = params.user_guid || null
    const gallery = await getGallery(businessGuid, userGuid)


    return {
        businessGuid: businessGuid,
        userGuid: userGuid,
        gallery: gallery
    };
}

const index = () => {
    const loaderData: any = useLoaderData()

    const businessGuid = loaderData.businessGuid
    const userGuid = loaderData.userGuid
    const gallery = loaderData.gallery

    return (
        <ProfileLayout title={"Photo Gallery"}>
            <BusinessMenu guid={businessGuid} userGuid={userGuid} />
            <AddPhoto userGuid={userGuid} businessGuid={businessGuid} />
            {
                gallery.length > 0 ?
                    <div className='z-0'>
                        <Gallery
                            gallery={gallery}
                            userGuid={userGuid}
                            businessGuid={businessGuid}
                        />
                    </div> :
                    (<div className=' mt-2 border-[1px] rounded-lg p-3 mb-6'>
                        Gallery is empty
                    </div>)
            }

        </ProfileLayout >
    )
}

export default index
