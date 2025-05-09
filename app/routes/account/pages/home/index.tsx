import React, { useEffect, useState } from 'react'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import Home from './Home'
import { GetResponse, headers } from '~/lib/Lib'
import { useAuth } from '~/context/AuthContext'
import Businesses from '../businesses/Businesses'

const index = () => {
    const { user } = useAuth()
    const [businesses, setBusinesses] = useState<any>([])
    const [names, setNames] = useState('')


    const getBusinesses = async (guid: string) => {
        try {
            const SITE_BASE_URL = import.meta.env.VITE_SITE_BASE_URL
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
            console.log(data)
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
            let names = user?.first_name + ' ' + user?.last_name
            //const max = 15
            //names = (names.length > max) ? `${names.substring(0, max - 15)}...` : names
            setNames(names)

        }
    }, [user])

    return (
        <ProfileLayout title={`Welcome, ${names}`}>
            {user && businesses && <Businesses user={user} businesses={businesses} />}
        </ProfileLayout>
    )
}

export default index
