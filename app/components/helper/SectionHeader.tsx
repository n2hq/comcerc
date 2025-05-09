import React from 'react'

type Props = {
    title: string
    subtitle: string
}

const SectionHeader = ({ title, subtitle }: Props) => {
    return (
        <div className='mb-8'>
            <div className=' font-bold text-2xl'>
                {title}
            </div>
            <div className=' text-gray-500'>
                {subtitle}
            </div>
        </div>
    )
}

export default SectionHeader
