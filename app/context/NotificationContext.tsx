import { createContext, useContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { any } from "zod";

const NotificationContext = createContext<any | null>(null)

export function useNotification() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider")
    }
    return context
}

export const NotificationProvider = ({ children }: any) => {
    const [show, setShow] = useState<any>(false)
    const [type, setType] = useState<number>(0)
    const [message, setMessage] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [notifyMessage, setNotifyMessage] = useState("")
    const [confirmCancel, setConfirmCancel] = useState(false)
    const [confirmOk, setConfirmOk] = useState(false)
    const [onCloseConfirm, setOnCloseConfirm] = useState<any>()


    const handleClose = () => {
        setShow(false)
    }

    const cancel = () => {
        setShow(false)
        setType(0)
        setMessage("")
    }


    useEffect(() => {
        cancel()
    }, [])

    const notify = async (message: string = 'Working...') => {
        {/** reset show and type */ }
        cancel()
        setNotifyMessage(message)
        await new Promise((resolve) => setTimeout(resolve, 100));
        setShow(true)
        setType(1)
    }

    const alert = async (title: string, message: string) => {
        {/** reset show and type */ }
        cancel()
        setMessage(message || 'Completed!')
        setTitle(title || 'Alert')
        await new Promise((resolve) => setTimeout(resolve, 100));
        setShow(true)
        setType(2)
    }

    const alertCancel = async (title: string, message: string) => {
        {/** reset show and type */ }
        cancel()
        setMessage(message || 'Completed!')
        setTitle(title || 'Alert')
        await new Promise((resolve) => setTimeout(resolve, 100));
        setShow(true)
        setType(5)
    }

    const alertReload = async (title: string, message: string) => {
        {/** reset show and type */ }
        cancel()
        setMessage(message || 'Completed!')
        setTitle(title || 'Alert')
        await new Promise((resolve) => setTimeout(resolve, 100));
        setShow(true)
        setType(3)
    }

    const confirm = async (message: string = 'Do you wish to continue?', onClose: () => void) => {
        {/** reset show and type */ }
        cancel()
        setMessage(message)
        await new Promise((resolve) => setTimeout(resolve, 100));
        setShow(true)
        setType(4)
        setOnCloseConfirm(() => onClose)
    }

    let vals = {
        notify, cancel,
        alert, alertReload,
        confirm, confirmCancel,
        confirmOk, alertCancel
    }



    return (
        <NotificationContext.Provider value={vals}>
            {
                show && type === 1 &&
                <Notify
                    working={show}
                    notifyMessage={notifyMessage}
                />
            }

            {
                show && type === 2 &&
                <Alert
                    handleClose={handleClose}
                    working={show}
                    message={message}
                    title={title}
                />
            }

            {
                show && type === 3 &&
                <AlertReload
                    handleClose={handleClose}
                    working={show}
                    title={title}
                    message={message}
                />
            }

            {
                show && type === 4 &&
                <Confirm
                    onClose={onCloseConfirm}
                    working={show}
                    message={message}
                />
            }

            {
                show && type === 5 &&
                <AlertCancel
                    handleClose={handleClose}
                    working={show}
                    message={message}
                    title={title}
                />
            }

            {children}
        </NotificationContext.Provider>
    )
}

export const Confirm = ({ handleClose, working, message, handleConfirmCancel, setConfirmOk, onClose }: any) => {
    return (
        <div className={`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `}>
            <div className={`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`}>
                <div className={`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`}>
                    Confirm
                </div>
                <div className={`w-full h-auto 
                            `}>
                    <div className={` px-4 py-3 h-fit`}>
                        {message}
                    </div>
                </div>
                <div className={`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `}>
                    <button
                        onClick={() => onClose(false)}
                        className={`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`}>
                        Cancel
                    </button>
                    <button
                        onClick={() => onClose(true)}
                        className={`px-3 bg-gray-100 py-1 border-[1px] rounded-[5px]
                                text-[14px] hover:bg-gray-200`}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export const Notify = ({ working, notifyMessage }: any) => {
    return (
        <div className={`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `}>
            <div className={`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`}>
                <div className={`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`}>

                    Processing...
                </div>
                <div className={`w-full h-auto 
                            `}>
                    <div className={` px-3 py-3 h-fit
                        flex place-items-center gap-2`}>
                        <FaSpinner className={`text-3xl text-blue-500 ${working ? 'animate-spin' : ''}`} />
                        {notifyMessage}
                    </div>
                </div>
                <div className={`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `}>
                    &nbsp;
                </div>
            </div>
        </div>
    )
}

export const Alert = ({ handleClose, working, message, title }: any) => {
    return (
        <div className={`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `}>
            <div className={`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`}>
                <div className={`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`}>
                    {title}
                </div>
                <div className={`w-full h-auto 
                            `}>
                    <div className={` px-4 py-3 h-fit`}>
                        {message}
                    </div>
                </div>
                <div className={`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `}>
                    <button
                        onMouseDown={handleClose}
                        className={`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`}>
                        Close
                    </button>

                    <button
                        onMouseDown={() => window.location.reload()}
                        className={`px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`}>
                        Reload
                    </button>

                </div>
            </div>
        </div>
    )
}

export const AlertReload = ({ handleClose, working, message, title }: any) => {
    return (
        <div className={`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `}>
            <div className={`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`}>
                <div className={`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`}>
                    {title}
                </div>
                <div className={`w-full h-auto 
                            `}>
                    <div className={` px-4 py-3 h-fit`}>
                        {message}
                    </div>
                </div>
                <div className={`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `}>


                    <button
                        onMouseDown={() => window.location.reload()}
                        className={`px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`}>
                        Reload
                    </button>

                </div>
            </div>
        </div>
    )
}

export const AlertCancel = ({ handleClose, working, message, title }: any) => {
    return (
        <div className={`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `}>
            <div className={`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`}>
                <div className={`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`}>
                    {title}
                </div>
                <div className={`w-full h-auto 
                            `}>
                    <div className={` px-4 py-3 h-fit`}>
                        {message}
                    </div>
                </div>
                <div className={`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `}>
                    <button
                        onMouseDown={handleClose}
                        className={`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}



