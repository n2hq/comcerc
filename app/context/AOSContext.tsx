import React, { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'

export const AOSContext = React.createContext<null>(null)


export function AOSProvider({ children }: { children: any }) {

    useEffect(() => {
        const initAOS = async () => {
            await import('aos')
            AOS.init({
                duration: 1000,
                easing: "ease",
                once: true,
                anchorPlacement: "top-bottom"
            })
        }

        initAOS()
    }, [])

    let val = null

    return (
        <AOSContext.Provider value={val}>
            {children}
        </AOSContext.Provider>
    )
}