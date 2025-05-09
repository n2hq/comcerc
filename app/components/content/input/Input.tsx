import React, { useEffect, useState } from 'react'
import { MdError } from 'react-icons/md'

const Input = ({
    controlName,
    controlType,
    controlPlaceholder,
    controlTitle,
    register,
    changeHandler,
    error,
    width,
    disabled = false
}: any) => {

    const [wrapperWidth, setWrapperWidth] = useState('')
    const [inputWidth, setInputWidth] = useState(width)

    useEffect(() => {
        if (inputWidth > 0) {
            if (inputWidth === 100) {
                setWrapperWidth(`xl:w-full`)
            } else {
                setWrapperWidth(`xl:w-[${inputWidth}%]`)
            }
        }
    }, [inputWidth])
    return (
        <>
            <div className='input__wrapper_class'>
                <div className='input__heading__class'>
                    {controlTitle}
                </div>
                <div className={`w-[100%] sm:w-[70%] md:w-[65%] lg:w-[60%] ${wrapperWidth}`}>
                    <input
                        {...register(controlName, {
                            onChange: changeHandler
                        })}
                        type={controlType ? controlType : 'text'}
                        className={`input__class ${disabled && 'bg-gray-200/80'}`}
                        placeholder={controlPlaceholder}
                        disabled={disabled}
                    />
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

export default Input
