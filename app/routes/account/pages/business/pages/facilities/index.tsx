import React, { useEffect } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router'
import ProfileLayout from '~/components/layout/profilelayout/ProfileLayout'
import BusinessMenu from '../../BusinessMenu'
import { getSelectedFacilityFeatures, getSysFacilityFeatures } from '~/lib/Lib'
import FacilityFeatureForm from './FacilityFeatureForm'
import FacilityFeatures from './FactilityFeatures'

export const loader: LoaderFunction = async ({ request, params }) => {
    const businessGuid = params.business_guid || null
    const userGuid = params.user_guid || null
    const facilityFeatures = await getSysFacilityFeatures()
    const selectedFacilityFeatures = await getSelectedFacilityFeatures(userGuid, businessGuid)

    const data = {
        businessGuid: businessGuid,
        userGuid: userGuid,
        facilityFeatures: facilityFeatures,
        selectedFacilityFeatures: selectedFacilityFeatures
    }
    console.log(data)

    return data
}

const index = () => {
    const loaderData: any = useLoaderData()
    const businessGuid = loaderData.businessGuid
    const userGuid = loaderData.userGuid
    const facilityFeatures = loaderData.facilityFeatures
    const selectedFacilityFeatures = loaderData.selectedFacilityFeatures

    return (
        <ProfileLayout title={"Facilities"}>
            <BusinessMenu guid={businessGuid} userGuid={userGuid} />

            {/* {
                facilityFeatures && businessGuid && userGuid &&
                <div className={`mt-8 `}>
                    <FacilityFeatureForm
                        facilityFeatures={facilityFeatures}
                        businessGuid={businessGuid}
                        userGuid={userGuid}
                    />
                </div>
            } */}
            <FacilityFeatures
                userGuid={userGuid}
                businessGuid={businessGuid}
                facilityFeatures={facilityFeatures}
                selectedFacilityFeatures={selectedFacilityFeatures}
            />
        </ProfileLayout>
    )
}

export default index
