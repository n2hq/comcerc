import React from 'react'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import BusinessMenu from '../../BusinessMenu'
import { useLoaderData } from 'react-router'
import { LoaderFunction } from '@remix-run/node'
import Activate from './Activate'

export const loader: LoaderFunction = async ({ request, params }) => {
    const businessGuid = params.business_guid || null
    const userGuid = params.user_guid || null

    const data = {
        businessGuid: businessGuid,
        userGuid: userGuid
    }
    console.log(data)

    return data
}

const index = () => {
    const loaderData: any = useLoaderData()
    const businessGuid = loaderData.businessGuid
    const userGuid = loaderData.userGuid

    return (
        <ProfileLayout title={"Activate/Deactivate"}>
            <BusinessMenu guid={businessGuid} userGuid={userGuid} />
            <Activate
                userGuid={userGuid}
                businessGuid={businessGuid}
            />
        </ProfileLayout>
    )
}

export default index
