import React from 'react'
import { RelatedCardProp, RelatedProp, RelatedType } from '~/lib/Interfaces'

const RelatedCard = ({ related }: RelatedCardProp) => {
    const truncateText = (textToTruncate: string) => {
        let truncated = (textToTruncate.length > 80 ? `${textToTruncate.substring(0, 80)}...` : textToTruncate)
        return truncated
    }
    return (
        <div className=' w-full h-auto rounded-[10px] overflow-hidden '>
            <div className='relative h-[200px] overflow-hidden shadow-md'>
                <img
                    src={related.img}
                    alt=""
                    className=' object-cover w-full h-full'
                />
            </div>
            <div className='pt-2 pb-0 px-1'>
                <div className='  text-[13px] leading-[1.1em] font-normal mb-[8px] text-wrap h-auto truncate'>
                    {related.title}
                </div>

            </div>

        </div>
    )
}

export default RelatedCard
