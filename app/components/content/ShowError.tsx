import React, { useEffect, useState } from 'react'

const ShowError = ({ error }: any) => {
    let [ejson, setejson] = useState(null)
    let [err, setErr] = useState("")

    useEffect(() => {
        if (error) {
            setejson(error.data)
        }
    }, [error])

    useEffect(() => {
        if (ejson) {
            let json = JSON.stringify(ejson)
            let jsonObject = JSON.parse(json)
            setErr(jsonObject.error)
        }
    }, [ejson])
    return (
        <div className='bg-blue-50 p-2 gap-2 shadow-sm border-[1px] rounded-[8px]'>
            <div className='text-xl w-full p-2 bg-blue-200 font-bold text-gray-500'>
                Error
            </div>
            <div className=' p-2 text-[15px] text-black'>
                {err}
            </div>

        </div>
    )
}

export default ShowError

