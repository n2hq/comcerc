import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AddBusinessSchema from './AddBusinessSchema'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import { LoaderFunction } from '@remix-run/node'
import { DoResponse, getCategories, getCities, getCountries, getQuery, getStates } from '~/lib/Lib'
import { useLoaderData } from '@remix-run/react'
import AddBusinessForm from './AddBusinessForm'
import { useAuth } from '~/context/AuthContext'

export const loader: LoaderFunction = async ({ request, params }) => {
    const guid = params.guid

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
        categories: categories
    }
    return DoResponse(data, 200);
}

const index = () => {

    const loaderData: any = useLoaderData()
    const { user } = useAuth()
    console.log(user)

    return (
        <ProfileLayout title={"Add Business"}>
            {
                loaderData && <AddBusinessForm loaderData={loaderData} user={user} />
            }

        </ProfileLayout >
    )
}

export default index
