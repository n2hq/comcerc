import React, { useEffect, useState } from 'react'
import ResultCard from './ResultCard'

const SearchResult = ({ contacts }: any) => {
    const [listings, setListings] = useState<any[]>([])
    useEffect(() => {
        if (contacts) {
            setListings(contacts)
        }
    }, [contacts])
    return (
        <div className={`flex flex-col gap-y-3 divide-y-[1px]`}>
            {
                listings.length > 0 ?
                    listings.map((listing, index) => {
                        return (
                            <ResultCard key={index} listing={listing} />
                        )
                    }) :
                    <div>
                        No results.
                    </div>
            }
        </div>
    )
}

export default SearchResult
