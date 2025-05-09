import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import ChangePasswordSchema from './ChangePasswordSchema'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import ChangePasswordForm from './ChangePasswordForm'
import { DoResponse, getUserProfile } from '~/lib/Lib'
import { LoaderFunction } from '@remix-run/node'
import { useAuth } from '~/context/AuthContext'
import { useLoaderData } from '@remix-run/react'



const categoryJson = [
    {
        id: "entertainment",
        name: "Entertainment"
    },
    {
        id: "services",
        name: "Services"
    }
]

export const loader: LoaderFunction = async ({ request, params }) => {
    const guid = params.guid
    const userProfileData = await getUserProfile(guid || "")
    const data = {
        guid: guid,
        userProfileData: userProfileData
    }
    return DoResponse(data, 200);
}

const Profile = () => {
    const loaderData: any = useLoaderData()
    const { user } = useAuth()

    return (
        <ProfileLayout title={"Change Password"}>
            {
                loaderData && <ChangePasswordForm loaderData={loaderData} user={user} />
            }
        </ProfileLayout>
    )
}

export default Profile
