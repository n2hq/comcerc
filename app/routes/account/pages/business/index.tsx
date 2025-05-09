import React, { useEffect, useMemo, useState } from 'react'
import { LoaderFunction } from '@remix-run/node'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '~/components/content/input/Input'
import BusinessSchema from './BusinessSchema'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import HeaderBar from '~/components/layout/profilelayout/HeaderBar'
import BusinessMenu from './BusinessMenu'
import Textarea from '~/components/content/textarea/Textarea'
import { ContactType, Listing } from '~/lib/Interfaces'
import { useLoaderData } from '@remix-run/react'
import { DoResponse, getBusinessProfileImageData, getCategories, getCities, getCountries, getQuery, getStates, getUserProfile } from '~/lib/Lib'
import BusinessForm from './BusinessForm'


const businesses = [
    {
        title: "Drew Consortium",
        category: "Services",
        country: "United States",
        activated: "Active",
        guid: "21safa-uwowm3ns-93ms32j-kajsmkl3shgm"
    },
    {
        title: "Cuppertino Adverts",
        category: "Technology Integrated",
        country: "United Kingdom",
        activated: "Inactive",
        guid: "21safa-uwowm3ns-93ms32j-kajsmkl3shgc"
    }
]

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
    const userGuid = params.user_guid

    const userProfileData = await getUserProfile(userGuid || "")
    const businessProfileImageData = await getBusinessProfileImageData(guid || "")

    const listing = await getQuery(guid || "")
    const countries = await getCountries()
    const listingObject: any = listing

    const states = await getStates(listingObject.country_code || "")
    const cities = await getCities(listingObject.country_code || "", listingObject.state_code || "")
    const categories = await getCategories()

    const data = {
        guid: guid,
        listing: listing,
        countries: countries,
        states: states,
        cities: cities,
        categories: categories,
        userProfileData: userProfileData,
        businessProfileImageData: businessProfileImageData
    }
    return DoResponse(data, 200);
}

const index = () => {
    const loaderData: any = useLoaderData()
    const guid = loaderData.guid
    const userProfileData = loaderData.userProfileData
    const userGuid = userProfileData.user_guid

    return (
        <ProfileLayout title={"Edit Business"}>
            {
                guid && userGuid &&
                <BusinessMenu guid={guid} userGuid={userGuid} />
            }
            {
                loaderData && <BusinessForm loaderData={loaderData} userProfileData={userProfileData} />
            }
        </ProfileLayout>
    )
}

export default index
