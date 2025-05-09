import React, { useEffect, useState } from 'react'
import { MdError } from 'react-icons/md'

const TextareaWithWordLimit = ({
    controlName,
    controlPlaceholder,
    controlTitle,
    register,
    changeHandler,
    error,
    setValue,
    getValues,
    watch,
    minWords = 100,
    maxWords = 500
}: any) => {
    const [text, setText] = useState('')
    const [wordLimitReached, setWordLimitReached] = useState(false);

    const countWords = (input: string) => {

        return input?.trim() === ''
            ? 0
            : input?.trim().split(/\s+/).length;
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        const words = input.trim().split(/\s+/);

        if (words.length <= maxWords) {
            setValue('text', input);
            setWordLimitReached(false);
        } else {
            setWordLimitReached(true);
            const trimmedWords = words.slice(0, maxWords).join(' ');
            setValue('text', trimmedWords); // Force trim to maximumWords words
        }
    };

    const textValue = watch('text') || '';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const words = textValue.trim().split(/\s+/);
        if (words.length >= maxWords && e.key !== 'Backspace' && e.key !== 'Delete' && !e.ctrlKey) {
            e.preventDefault(); // Block typing if maximumWords words reached
            setWordLimitReached(true);
        } else {
            setWordLimitReached(false);
        }

    }

    useEffect(() => {
        if (controlName) {
            let priorText = getValues(controlName)
            setText(priorText)
        }
    }, [controlName])

    return (
        <>
            <div className='textarea__wrapper_class'>
                <div className='flex place-content-between'>
                    <label className="block mb-1 text-md font-semibold">{controlTitle}</label>
                    <label className=" text-gray-600 text-sm">
                        Word Count: <strong>{countWords(text)}</strong>
                    </label>
                </div>
                <div>
                    <textarea
                        {...register(controlName, {
                            onChange: (e: any) => {
                                setText(e.target.value)
                                handleTextChange(e)
                                changeHandler(e)
                            }
                        })}
                        className='textarea__class'
                        placeholder={controlPlaceholder}
                        onKeyDown={handleKeyDown}
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

export default TextareaWithWordLimit
