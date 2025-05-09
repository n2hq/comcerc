import React from 'react'
import Slider from './Slider'

const carousel = [
    {
        img: `https://images.pexels.com/photos/4553036/pexels-photo-4553036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
        title: `Personal Development Vector Art`
    },
    {
        img: `https://scontent.fabv2-2.fna.fbcdn.net/v/t39.30808-6/486613744_1447355116516944_7258579661924854906_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeF3hgM0ObZuBFcbVrM5AWVaZuq9Bgecpytm6r0GB5ynK0ZqadVDztjV0XigfrCOdIS1ZU-z_KRxo9cH5b71qFf9&_nc_ohc=9OD5I3obFhkQ7kNvwFCwWcE&_nc_oc=Adm1sKnkUJwKkugOu4ktnUpxsL9v9dScHUCln2Uu5MwHF1ip488Zy2sVq7DQQ36W-Zk&_nc_zt=23&_nc_ht=scontent.fabv2-2.fna&_nc_gid=726RI99qVcTuCCdvNiwuGA&oh=00_AfH_Mwgb8xojwiYUPtmbnjFZmcO4IrdvdtMGLq2RtMY2Yw&oe=68057FBD`,
        title: `True Concept of Development`
    }
]
const Carousel = ({
    overlay,
    setOverlay,
    selectedSlide,
    handleClose,
    gallery
}: any) => {
    return (
        <div>
            {
                overlay &&
                <div
                    /* onClick={() => setOverlay(false)} */
                    className={`flex w-screen h-screen bg-white z-[1000] 
                fixed top-0 left-0 right-0 bottom-0 `}>
                    {
                        gallery && selectedSlide &&
                        <Slider
                            slides={gallery}
                            selectedSlide={selectedSlide}
                            handleClose={handleClose}
                        />
                    }
                </div>
            }
        </div>
    )
}

export default Carousel
