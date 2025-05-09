import React, { useRef, useState } from 'react'
import AddPhotoDialog from './AddPhotoDialog'
import { useAddPhotoDialogContext } from '~/context/AddPhotoDialogContext'

const AddPhoto = ({ userGuid, businessGuid }: any) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [isImgSelected, setIsImageSelected] = useState(false)
    const [overlay, setOverlay] = useState<any>(false)
    const [dialog, setDialog] = useState<any>(false)
    const addPhoto = useAddPhotoDialogContext()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0]

            if (file) {
                const imageUrl = URL.createObjectURL(file)
                setImgSrc(imageUrl)
                setSelectedFile(file)
                setIsImageSelected(true)

                addPhoto.setDialog(true)
                addPhoto.setImgSrc(imageUrl)
                addPhoto.setSelectedFile(file)
                addPhoto.setIsImageSelected(true)
                addPhoto.setUserGuid(userGuid)
                addPhoto.setBusinessGuid(businessGuid)
                //setDialog(true)


            }
        } finally {
            event.target.value = ""
        }


    }

    const handleImageClick = () => {
        fileInputRef.current?.click()

    }

    const handleCloseDialog = () => {
        setDialog(false)
        setImgSrc(null)

    }

    return (
        <div className={`mb-2`}>
            <button
                onMouseDown={handleImageClick}
                className={` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`}>
                Add Photo
            </button>
            <input type="file"
                accept='image/*'
                ref={fileInputRef}
                className=' hidden'
                onChange={handleFileChange}

            />

            {/* <AddPhotoDialog
                dialog={dialog}
                setDialog={setDialog}
                imgSrc={imgSrc}
                handleCloseDialog={handleCloseDialog}
                userGuid={userGuid}
                businessGuid={businessGuid}
                isImgSelected={isImgSelected}
                setIsImageSelected={setIsImageSelected}
                selectedFile={selectedFile}
            /> */}
        </div>
    )
}

export default AddPhoto
