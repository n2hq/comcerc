import { Link, useLoaderData } from '@remix-run/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import ResponsiveNav from '~/components/header/navbar/simple/ResponsiveNav'
import ChangeEmailSuccess from './ResetPasswordSuccess'
import ChangeEmailFail from './ResetPasswordFail'
import { LoaderFunction } from '@remix-run/node'
import { changeEmail, DoResponse, getUserProfile } from '~/lib/Lib'
import ResetPasswordForm from './ResetPasswordForm'

export const loader: LoaderFunction = async ({ request, params }) => {

    const url = new URL(request.url)
    let userGuid = params.guid as string

    const data = {
        guid: userGuid
    }
    return DoResponse(data, 200);
}

const index = () => {
    const loaderData: any = useLoaderData()
    const userGuid = loaderData.guid
    return (
        <div>
            <ResponsiveNav />

            <ResetPasswordForm guid={userGuid} />
        </div>
    )
}

export default index
