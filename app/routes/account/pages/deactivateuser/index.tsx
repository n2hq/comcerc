import { LoaderFunction } from '@remix-run/node'
import React from 'react'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import { DoResponse, getUserProfile } from '~/lib/Lib'
import DeactivateUserForm from './DeactivateUserForm'
import { useLoaderData } from '@remix-run/react'
import { useAuth } from '~/context/AuthContext'

export const loader: LoaderFunction = async ({ request, params }) => {
    const guid = params.guid
    const userProfileData = await getUserProfile(guid || "")
    const data = {
        guid: guid,
        userProfileData: userProfileData
    }
    return DoResponse(data, 200);
}

const index = () => {
    const loaderData: any = useLoaderData()
    const { user } = useAuth()

    return (
        <ProfileLayout title={"Activate/Deactivate User"}>
            {
                loaderData && <DeactivateUserForm loaderData={loaderData} user={user} />
            }
        </ProfileLayout>
    )
}

export default index
