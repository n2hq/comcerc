import { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React, { useEffect, useState } from 'react'
import ResponsiveNav from '~/components/header/navbar/simple/ResponsiveNav';
import { getMetaData, getUserByUserHash } from '~/lib/Lib';
import SignupCodeForm from './SignupCodeForm';
import { IUser } from '~/lib/Interfaces';

export const loader: LoaderFunction = async ({ request, params }) => {

    const userHash: any | undefined = params.user_hash
    const user: IUser = await getUserByUserHash(userHash)

    return user;
}


/* export const meta: MetaFunction = () => {
    const data: any = useLoaderData()

    let title = data?.message
    let description = "Total Emancipation"
    let keywords = ["unique", "culture"]
    let img = "ttps://img.freepik.com/premium-photo/wallpaper-with-dark-dramatic-gradient-colors-ai-generated_88211-6704.jpg?semt=ais_hybrid"
    let url = "https://google.com/"
    let metaData = getMetaData(title, description, keywords, img, url)

    return metaData
} */

const Code = () => {
    const data: any = useLoaderData()


    return (
        <div>
            <ResponsiveNav />
            {
                data && <SignupCodeForm data={data} />
            }

        </div>
    )
}

export default Code

