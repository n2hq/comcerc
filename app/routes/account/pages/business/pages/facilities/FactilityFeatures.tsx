import React, { useEffect, useState } from 'react'
import { useNotification } from '~/context/NotificationContext'
import { headers } from '~/lib/Lib'

type FacilityFeature = {
    id: number
    name: string
    description: string
    active: boolean
    feature_id: string
}

type SelectedFacilityFeature = {
    id: number
    feature_id: string
    user_description: string
}



// Simulated list of previously selected features (e.g. from DB)
const fetchSelectedFeatureIds = async (): Promise<number[]> => [1, 3, 5, 6]

const FacilityFeatures = ({
    businessGuid,
    userGuid,
    facilityFeatures,
    selectedFacilityFeatures
}: any) => {


    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()

    const [features, setFeatures] = useState<any | null>(null)
    const [selectedFeatures, setSelectedFeatures] = useState<any | null>(null)
    const [mergedFeatures, setMergedFeatures] = useState<any | null>(null)

    useEffect(() => {
        if (facilityFeatures && selectedFacilityFeatures) {
            setFeatures(facilityFeatures)
            setSelectedFeatures(selectedFacilityFeatures)
        }
    }, [facilityFeatures, selectedFacilityFeatures])

    useEffect(() => {
        if (features && selectedFeatures) {
            const mergedFeatures = features.map((feature: any) => {
                const selected = selectedFeatures.find(
                    (selected: any) => selected.feature_id === feature.feature_id
                );
                return {
                    ...feature,
                    active: selected ? true : false,
                    user_description: selected ? selected.user_description : undefined,
                };
            });
            setMergedFeatures(mergedFeatures)
        }
    }, [features, selectedFeatures])



    const handleToggle = (id: string) => {

        setMergedFeatures((prev: any) =>
            prev.map((feature: any) =>
                feature.feature_id === id ? {
                    ...feature,
                    active: !feature.active,
                    user_description: feature.user_description ? feature.user_description : ""
                } : feature
            )
        )
    }

    const handleDescriptionChange = (id: string, value: string) => {
        setMergedFeatures((prev: any) =>
            prev.map((feature: any) =>
                feature.feature_id === id ? { ...feature, user_description: value } : feature
            )
        )
    }

    const handleSave = async () => {
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = `/api/listings/selected_facility_features`
        const url = BASE_URL + endpoint

        setWorking(true)
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //console.log((mergedFeatures))
        //return false

        try {
            const selected = mergedFeatures.filter((f: any) => f.active).map((f: any) => {
                return ({
                    feature_id: f.feature_id,
                    user_description: f.user_description
                })
            })
            let data = {
                user_guid: userGuid,
                business_guid: businessGuid,
                selected: selected
            }

            //alert(JSON.stringify(data))
            //return false


            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            })

            if (response.ok) {
                notification.alertReload('', 'Saved successfully!')
            } else {
                notification.alert('', 'Failed to save.')
            }
        } catch (error: any) {
            notification.alert('', 'Something happened!')
        } finally {
            setWorking(false)
            //notification.alertReload("", "Completed successfully.")
        }
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Select Facility Features</h2>
            {
                facilityFeatures.length > 0 &&
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mergedFeatures?.map((feature: any) => (
                            <label
                                key={feature.feature_id}
                                className="flex items-center space-x-3 p-3 border rounded cursor-pointer"

                            >
                                <div>
                                    <input
                                        onChange={() => handleToggle(feature.feature_id)}
                                        type="checkbox"
                                        checked={feature.active}

                                        className="hidden"
                                    />
                                    <div
                                        className={`w-5 h-5 border-2 rounded ${feature.active ? 'bg-green-500' : 'bg-white'
                                            }`}
                                    ></div>
                                </div>
                                <div className=' w-full'>
                                    <p className="font-medium ">{feature.name}</p>
                                    <p className="text-xs ">{feature.description}</p>
                                    <div className=' w-full h-[100px] mt-1 rounded overflow-hidden'>
                                        <textarea
                                            onChange={(e) => handleDescriptionChange(feature.feature_id, e.target.value)}
                                            className={`w-full h-full bg-gray-100
                                            border p-3 text-sm`}>
                                            {feature.user_description}
                                        </textarea>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save Selected Features
                    </button>
                </div>
            }
        </div>
    )
}

export default FacilityFeatures
