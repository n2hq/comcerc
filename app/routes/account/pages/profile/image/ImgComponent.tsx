import React, { useRef, useState } from 'react'
import { MdEditSquare } from 'react-icons/md'
import { useNotification } from '~/context/NotificationContext'
import { headers } from '~/lib/Lib'

const ImgComponent = ({ user, userProfileImageData }: any) => {
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
    const notification = useNotification()

    let imgconst = ""

    if (userProfileImageData.image_url) {
        imgconst = IMG_BASE_URL + userProfileImageData.image_url
    } else {
        imgconst = 'https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg'
    }


    const [imgSrc, setImgSrc] = useState<any>(imgconst)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [isImgSelected, setIsImageSelected] = useState(false)
    const [working, setWorking] = useState<boolean>(false)

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImgSrc(imageUrl)
            setSelectedFile(file)
            setIsImageSelected(true)
        }
    }

    const handleUpload = async () => {
        setWorking(true)
        notification.notify('Working...')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isImgSelected) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('guid', user.user_guid)


            const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
            const endpoint = "/user_profile_pic_upload"
            const url = IMG_BASE_URL + endpoint


            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*"
                    },
                    body: (formData)
                })

                if (!response.ok) {
                    let error = response.json().then((data) => {
                        notification.alertCancel('', data.message)
                    })

                } else {
                    notification.alertReload('', 'Image uploaded successfully!')
                }

            } catch (error) {
                return undefined
            } finally {
                setWorking(false)
            }
        } else {
            notification.alertCancel('', 'Please select an image to continue.')
            //alert('Please select an image to continue.')
            setWorking(false)
        }
    }


    return (
        <div>
            <div className='relative bg-blue-100 w-[150px] h-[150px] z-40 rounded-full overflow-hidden'>
                <img
                    src={imgSrc}
                    alt="Click to upload"
                    className=' object-cover w-full h-full z-0 absolute'
                />
                <input type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    className=' hidden'
                    onChange={handleFileChange}
                />
                <div
                    className={`flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                 text-white/80 `}
                    onMouseDown={handleImageClick}
                >
                    <div className={`w-[50%] h-[50%] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    rounded-full transition duration-300 ease-in-out`}>
                        <MdEditSquare className=' text-[30px]' />
                    </div>
                </div>
            </div>
            <div className={` flex flex-col place-items-center 
                place-content-center mt-2 `}>
                <button
                    className={`${working ? 'bg-gray-200 cursor-default' : 'bg-blue-100'}  w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out`}
                    onMouseDown={handleUpload}
                    disabled={working}
                >
                    {
                        working ? 'Uploading...' : 'Upload'
                    }
                </button>
            </div>
        </div>
    )
}

export default ImgComponent
