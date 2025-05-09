import React, { useState } from 'react'

const Button = ({
    working,
    value
}: any) => {

    return (
        <>
            <div className='input__wrapper_class'>

                <div>
                    <button

                        className={`input__button__class ${working && 'bg-blue-500 cursor-default'}`}
                        disabled={working}
                    >
                        {working ? 'Submitting...' : `${value ? value : 'Submit'}`}
                    </button>
                </div>

                <div className=' mt-4 text-[.7em] leading-[1.2em] px-2 w-full sm:w-[70%] md:w-[65%] lg:w-[60%] xl:w-[40%]'>
                    By submitting, you agree to our Privacy Commitment and Terms of Service.
                </div>
            </div>
        </>
    )
}

export default Button
