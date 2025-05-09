import React from 'react'
import { MdError } from 'react-icons/md'

const Textarea = ({
    controlName,
    controlPlaceholder,
    controlTitle,
    register,
    changeHandler,
    error
}: any) => {
    return (
        <>
            <div className='textarea__wrapper_class'>
                <div className='input__heading__class'>
                    {controlTitle}
                </div>
                <div>
                    <textarea
                        {...register(controlName, {
                            onChange: changeHandler
                        })}
                        className='textarea__class'
                        placeholder={controlPlaceholder}
                    />
                    {
                        error &&
                        (
                            <div className={`input__class__error -mt-[5px]`}>
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

export default Textarea
