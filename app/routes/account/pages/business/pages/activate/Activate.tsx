import React, { useEffect, useState } from 'react'
import { useNotification } from '~/context/NotificationContext'
import { getBusiness, headers } from '~/lib/Lib'

const Activate = ({
    userGuid,
    businessGuid
}: any) => {
    const [isActive, setIsActive] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)
    const notification = useNotification()
    const [working, setWorking] = useState<boolean>(false)

    useEffect(() => {
        try {
            getBusiness(userGuid, businessGuid).then((business) => {
                //alert(JSON.stringify(business))
                setIsActive(business[0].active_status)
                setLoading(false)
            })


        } catch (error: any) {
            alert('Could not fetch business')
        }

    }, [])

    const toggleBusiness = async () => {
        setWorking(true)
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newStatus = !isActive
        try {
            const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
            const endpoint = `/api/listings/activate/${userGuid}/${businessGuid}`
            const url = BASE_URL + endpoint


            const data = {
                user_guid: userGuid,
                business_guid: businessGuid,
                active: newStatus
            }

            const res = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data),
            })


            notification.notify('Completed')
            await new Promise((resolve) => setTimeout(resolve, 1000));

        } catch (error: any) {

        } finally {
            notification.cancel()
            setIsActive(newStatus)
        }
        /*  const res = await fetch('/api/business-status', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ userGuid, businessGuid, is_active: newStatus }),
         })
         const data = await res.json()
         if (data.success) {
             setIsActive(newStatus)
         } */

    }

    if (loading) return <div>Loading...</div>

    return (
        <div className={`p-6 border rounded shadow max-w-lg
        mx-auto mt-12`}>
            <h2 className="text-xl mb-4">Business Activation</h2>
            <label className="flex items-center space-x-2 hover:cursor-pointer">
                <input
                    type="checkbox"
                    checked={isActive ?? false}
                    onChange={toggleBusiness}
                    className="w-5 h-5"
                />
                <span>{isActive ? 'Active' : 'Inactive'}</span>
            </label>
        </div>
    )
}

export default Activate
