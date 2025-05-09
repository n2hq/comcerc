import React, { useState } from 'react'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AddBusinessSchema from './EmailSchema'
import Button from '~/components/content/button/Button'
import EmailSchema from './EmailSchema'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import { LoaderFunction } from '@remix-run/node'
import { DoResponse, getUserProfile } from '~/lib/Lib'
import { useLoaderData } from '@remix-run/react'
import { useAuth } from '~/context/AuthContext'
import EmailForm from './EmailForm'

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

const index = () => {
    const loaderData: any = useLoaderData()
    const { user } = useAuth()

    return (
        <ProfileLayout title={"Update Email"}>
            {
                loaderData && <EmailForm loaderData={loaderData} user={user} />
            }
        </ProfileLayout>
    )
}

export default index
