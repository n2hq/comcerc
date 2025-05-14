import React, { useState } from 'react'
import EditPhotoDialog from './EditPhotoDialog'
import { useEditPhotoDialogContext } from '~/context/EditPhotoDialogContext'
import { useNotification } from '~/context/NotificationContext'

const GalleryItemMenu = ({
    item,
    menu,
    userGuid,
    businessGuid
}: any) => {
    const [dialog, setDialog] = useState<any>(false)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const editPhoto = useEditPhotoDialogContext()
    const notification = useNotification()
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

    const handleOpenDialog = () => {
        editPhoto.setDialog(true)
        editPhoto.setImgSrc(IMG_BASE_URL + item.image_url)
        editPhoto.setImageTitle(item.image_title)
        editPhoto.setUserGuid(userGuid)
        editPhoto.setBusinessGuid(businessGuid)
        editPhoto.setImageGuid(item.image_guid)
        setDialog(true)
    }

    const handleDelete = async () => {
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        editPhoto.deletePhoto(userGuid, businessGuid, item.image_guid)

    }

    const handleCloseDialog = () => {
        setDialog(false)
        setImgSrc(null)
    }

    return (
        <div className=''>
            {
                menu &&
                <div className={` absolute top-2 right-2 w-[80%] bg-white
                rounded-[12px] overflow-hidden border-[1px] border-white
                shadow-md`}>
                    <div className={`mt-3`}>
                        <div className={` divide-y-[1px]`}>
                            <div
                                onMouseDown={handleOpenDialog}
                                className={`py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`}>
                                Edit
                            </div>
                            <div
                                onMouseDown={handleDelete}
                                className={`py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`}>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default GalleryItemMenu
