import { createContext, useContext, useEffect, useState } from "react";

const SignupContext = createContext<any | null>(null)
export default SignupContext

export const useSignup = () => {
    const context = useContext(SignupContext)
    if (!context) {
        throw new Error("useSignup must be used within an SignupProvider")
    }
    return context
}

export const SignupProvider = ({ children }: any) => {
    const [email, setEmail] = useState('')

    useEffect(() => {

    }, [])

    let vals = {
        setEmail
    }

    return (
        <SignupContext.Provider value={vals}>
            {children}
        </SignupContext.Provider>
    )
}
