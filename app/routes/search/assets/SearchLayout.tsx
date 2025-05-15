import React, { useEffect, useState } from 'react'
import Featured from './Featured'
import { useSearchParams } from '@remix-run/react';

const SearchLayout = ({
    children
}: any) => {
    const [queryParam, setQueryParam] = useState<string | null>(null)
    const [searchParams] = useSearchParams();


    useEffect(() => {


        const query: string | null = searchParams.get("q");
        setQueryParam(query)

    }, [])

    return (
        <div className={`px-[15px] `}>
            <div className={`max-w-[1100px] w-full mx-auto bg-white`}>
                {/** search criteria display */}

                <div className={`grid grid-cols-12 mt-5 gap-6 relative`}>
                    <div className={` col-span-12 lg:col-span-8`}>
                        {children}
                    </div>
                    <div className={`col-span-12 lg:col-span-4 lg:block`}>
                        <div className={`sticky top-[100px]`}>
                            <Featured />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SearchLayout
