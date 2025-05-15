import React, { useEffect, useState } from 'react'
import ResponsiveNav from '~/components/header/navbar/lite/ResponsiveNav'
import SearchHeader from './assets/SearchHeader'
import { LoaderFunction } from '@remix-run/node'
import { ContactType } from '~/lib/Interfaces'
import { useLoaderData, useSearchParams } from '@remix-run/react'
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
    const [searchParams] = useSearchParams();

    const query = data.query
    const [queryParam, setQueryParam] = useState<string | null>(null)



    useEffect(() => {



        if (query) {
            setQueryParam(query)
        }

    }, [query])



    return (
        <div>
            <ResponsiveNav />
            <SearchHeader query={data.query} />

            {
                data.query.length > 0 ?
                    <div className={` flex mt-4 px-[15px] 
                border-b pb-2 tracking-tight`}>
                        <div className={`max-w-[1100px] w-full mx-auto
                            text-[24px]`}>
                            Search for <b>{data.query}</b>
                        </div>
                    </div> :
                    <div className={` flex mt-4 px-[15px] 
                border-b pb-2 tracking-tight`}>
                        <div className={`max-w-[1100px] w-full mx-auto
                            text-[24px]`}>
                            Latest businesses
                        </div>
                    </div>
            }

            {

                <SearchLayout>
                    {/* <SearchResult contacts={data.datar} /> */}

                    {
                        data.datar.length > 0 ?
                            <SearchPagination
                                data={data.datar}
                                itemsPerPage={20}
                                renderItem={(item: any) => {
                                    return (
                                        <ResultCard key={index} listing={item} />
                                    )
                                }}
                            /> :
                            <div className={`flex place-items-center
                            place-content-center p-8 border capitalize`}>
                                <span>no record</span>
                            </div>
                    }

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
