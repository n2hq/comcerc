import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import ProfileSchema from './ProfileSchema'
import ProfileForm from './ProfileForm'
import { LoaderFunction } from '@remix-run/node'
import { DoResponse, getCategories, getCities, getCountries, getQuery, getStates, getUserProfile, getUserProfileImageData } from '~/lib/Lib'
import { useLoaderData } from '@remix-run/react'
import { useAuth } from '~/context/AuthContext'
import { UserProfile } from '~/lib/Interfaces'

export const loader: LoaderFunction = async ({ request, params }) => {
    const guid = params.guid

    const userProfileData = await getUserProfile(guid || "")
    const countries = await getCountries()
    const userProfileDataObject: any = userProfileData
    const states = await getStates(userProfileDataObject.country_code || "")
    const cities = await getCities(userProfileDataObject.country_code || "", userProfileDataObject.state_code || "")
    const categories = await getCategories()
    const userProfileImageData = await getUserProfileImageData(guid || "")

    const data = {
        guid: guid,
        userProfileData: userProfileData,
        countries: countries,
        states: states,
        cities: cities,
        categories: categories,
        userProfileImageData: userProfileImageData
    }
    return DoResponse(data, 200);
}


const index = () => {
    const loaderData: any = useLoaderData()
    const { user } = useAuth()
    const [userProfileData, setUserProfileData] = useState<UserProfile[] | undefined>(undefined)

    useEffect(() => {

        if (user?.guid) {
            getUserProfile(user?.guid).then((data) => {
                setUserProfileData(data)

            })
        }
    }, [user?.guid])


    return (
        <ProfileLayout title={"Profile"}>
            {
                loaderData && user && userProfileData && <ProfileForm
                    loaderData={loaderData}
                    user={user}
                    userProfileData={userProfileData}
                />
            }

        </ProfileLayout>
    )
}

export default index
