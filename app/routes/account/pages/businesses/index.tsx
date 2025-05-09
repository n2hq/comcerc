import { LoaderFunction } from '@remix-run/node'
import React, { useEffect, useState } from 'react'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import { useAuth } from '~/context/AuthContext'
import { GetResponse, headers } from '~/lib/Lib'
import BusinessRow from './BusinessRow'
import ShowError from '~/components/content/ShowError'
import Businesses from './Businesses'


export const loader: LoaderFunction = async ({ request, params }) => {

    return { guid: null };
}

const SITE_BASE_URL = import.meta.env.VITE_SITE_BASE_URL


const index = () => {
    const { user } = useAuth()
    const [businesses, setBusinesses] = useState<any>([])

    const getBusinesses = async (guid: string) => {
        try {

            let businessesEndpoint = `/api/listings/owner/${guid}`
            let bep = SITE_BASE_URL + businessesEndpoint

            const response = await fetch(bep, {
                method: "GET",
                headers: headers
            });

            if (response.status !== 200) {
                console.log('error fetching businesses')
                console.log(await response.json())
                //return false
            }

            const data = await response.json();
            setBusinesses(data)

        } catch (error: any) {
            {/** if token is invalid or expired remove it 
                from the localstorage */}
            let response = GetResponse({ error: error.message }, false, 200)
            console.log(error.message)
            setBusinesses(response)
            return null
        }
    }

    useEffect(() => {
        if (user) {

            getBusinesses(user.guid)
        }
    }, [user])

    return (
        <ProfileLayout title={"Businesses"}>
            {user && businesses && <Businesses user={user} businesses={businesses} />}
        </ProfileLayout>
    )
}

export default index


