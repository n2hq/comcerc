import React, { useEffect } from 'react'
import ResponsiveNav from '~/components/header/navbar/lite/ResponsiveNav'
import SearchHeader from './assets/SearchHeader'
import { LoaderFunction } from '@remix-run/node'
import { ContactType } from '~/lib/Interfaces'
import { useLoaderData } from '@remix-run/react'
import Footer from '~/components/footer/Footer'
import SearchLayout from './assets/SearchLayout'
import SearchResponse from './assets/SearchResult'
import SearchResult from './assets/SearchResult'
import LatestBusinesses from './assets/LatestBusinesses'
import { getListingByCategory } from '~/lib/Lib'
import SearchPagination from './assets/SearchPagination'
import ResultCard from './assets/ResultCard'

const getQuery = async (criteria: string | null): Promise<ContactType[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/listings/search?q=" + criteria
    const url = BASE_URL + endpoint
    console.log(url + "aa")
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ContactType[] = await response.json();
        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error) {
        return undefined
    }
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";
    let datar = await getQuery(query)
    let realestate = await getListingByCategory('automotive', 4)


    let data = {
        datar: datar,
        query: query,
        realestate: realestate
    }
    return data;
}

const index = () => {
    const data: any = useLoaderData()




    return (
        <div>
            <ResponsiveNav />
            <SearchHeader query={data.query} />
            {
                data &&
                <SearchLayout
                    contacts={data.datar}
                    query={data.query}
                >
                    {/* <SearchResult contacts={data.datar} /> */}

                    <SearchPagination
                        data={data.datar}
                        itemsPerPage={20}
                        renderItem={(item: any) => {
                            return (
                                <ResultCard key={index} listing={item} />
                            )
                        }}
                    />
                    <LatestBusinesses
                        category={'entertainment'}
                        limit={5}
                        title={"Entertainment"}
                        subtitle={"Entertainment based businesses added in the last 7 days"}
                    />
                    <LatestBusinesses
                        category={'services'}
                        limit={5}
                        title={"Services"}
                        subtitle={"Services based businesses added in the last 7 days"}
                    />
                </SearchLayout>
            }
            {/* {data && <SearchResult contacts={data.datar} />} */}
            <Footer />
        </div>
    )
}

export default index
