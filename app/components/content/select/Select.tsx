import React, { useEffect, useState } from 'react'
import { MdError } from 'react-icons/md'

const Select = ({
    controlName,
    controlTitle,
    controlPlaceholder,
    selectJson,
    register,
    changeHandler,
    error,
    setCode
}: any) => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (register && changeHandler && selectJson) {
            setTimeout(() => {
                setReady(true)
            }, 1000)
        }
    }, [register, changeHandler, selectJson])

    return (
        <>
            <div className='input__wrapper_class'>
                <div className='input__heading__class'>
                    {controlTitle}
                </div>
                <div className='input__control__wrapper'>
                    {
                        ready && <select
                            {...register(controlName, {
                                onChange: (e: any) => {
                                    changeHandler(e)
                                    if (setCode) {
                                        setCode(e.target.value)
                                    }
                                }
                            })}
                            className='input__class'

                        >
                            <option value="">{controlPlaceholder}</option>
                            {
                                selectJson.map((item: any, id: any) => {
                                    return (
                                        <option key={id} value={item.id}>
                                            {item.name}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    }
                    {
                        error &&
                        (
                            <div className={`input__class__error`}>
                                <MdError className='text-lg' />
                                {error.message}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Select
