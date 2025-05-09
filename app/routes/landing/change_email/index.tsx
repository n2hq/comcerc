import { Link, useLoaderData } from '@remix-run/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import ResponsiveNav from '~/components/header/navbar/simple/ResponsiveNav'
import ChangeEmailSuccess from './ChangeEmailSuccess'
import ChangeEmailFail from './ChangeEmailFail'
import { LoaderFunction } from '@remix-run/node'
import { changeEmail, DoResponse, getUserProfile } from '~/lib/Lib'

export const loader: LoaderFunction = async ({ request, params }) => {

    const url = new URL(request.url)
    let userGuid = url.searchParams.get("guid") as string
    let email = url.searchParams.get("email") as string

    const response: any | undefined = await changeEmail(userGuid, email)


    const data = {
        guid: userGuid,
        email: email,
        response: response//response
    }
    return DoResponse(data, 200);
}

const index = () => {
    const loaderData: any = useLoaderData()

    return (
        <div>
            <ResponsiveNav />
            {
                loaderData.response === undefined ?
                    <ChangeEmailFail guid={loaderData.guid} /> :
                    <ChangeEmailSuccess email={loaderData.email} />
            }

        </div>
    )
}

export default index
