import React, { useEffect } from 'react'
import ResponsiveNav from '~/components/header/navbar/simple/ResponsiveNav'
import ResetPwFinal from './ResetPwFinal'
import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader: LoaderFunction = async ({ request, params }) => {
    const userGuid = params.user_guid || null

    console.log(userGuid)

    let message = "Hello! We are here"
    const data = {
        userGuid: userGuid
    }

    return data
}

const resetpw = () => {
    const loaderData: any = useLoaderData()
    const userGuid = loaderData.userGuid

    return (
        <div>
            <ResponsiveNav />
            {
                userGuid && <ResetPwFinal userGuid={userGuid} />
            }
        </div>
    )
}

export default resetpw
