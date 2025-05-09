import React, { useEffect, useState } from 'react'

const EditPhotoDialog = ({
    dialog,
    handleCloseDialog,
    setDialog,
    imgSrc,
    userGuid,
    businessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile
}: any) => {
    const [working, setWorking] = useState<any>(false)

    useEffect(() => {

    }, [])


    const handleUpload = async () => {
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let imageTitle = document.getElementById("image_title") as HTMLInputElement

        if (isImgSelected) {
            alert(userGuid)
            alert(businessGuid)
            alert(imageTitle?.value)
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('guid', userGuid)
            formData.append('bid', businessGuid)
            formData.append('image_title', imageTitle.value)

            //alert(JSON.stringify(formData))
            //return false

            const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
            const endpoint = "/business_gallery_pic_upload"
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
                        alert(data.message)
                    })

                } else {
                    alert('Image uploaded success!')
                }

            } catch (error) {
                return undefined
            } finally {
                setWorking(false)
            }
        } else {
            alert('Please select an image to continue.')
            setWorking(false)
        }
    }
    return (
        <div>
            {/* {
                dialog &&
                <div

                    className={`fixed w-screen h-screen bg-white z-[3000] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`}>

                    <div className={`relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3100]`}
                        onClick={(event) => {
                            event.preventDefault()
                        }}
                    >
                        <div className={`relative w-full h-[75%]`}>
                            <img
                                src={imgSrc}
                                alt=""
                                className={`object-cover w-full h-full`}
                            />
                        </div>


                        <div>
                            <input
                                id='image_title'
                                placeholder={`Enter picture description.`}
                                type="text"
                                className={`w-full bg-gray-100 px-3  h-[60px]`}
                            />
                        </div>

                        <div className={`flex place-content-end px-3 gap-2`}>
                            <button
                                onMouseDown={() => handleCloseDialog()}
                                className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleUpload()}
                                className={`bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`}
                            >
                                {
                                    working ? 'Working...' : 'Submit'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            } */}
        </div>
    )


}

export default EditPhotoDialog
