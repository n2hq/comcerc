// components/RatingForm.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { ListingType, Rating } from '~/lib/Interfaces';
import { getRating } from '~/lib/Lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { useNotification } from './NotificationContext';

const maximumWords = 100

const RatingContext = createContext<any | null>(null)

export function useRating() {
    const context = useContext(RatingContext)

    if (!context) {
        throw new Error("useRating must be used within a RatingProvider")
    }
    return context
}


const urlvalidator = /^(?!https?)(?!www\.?).*\..+$/g


export const RatingSchema = z.object({
    fullname: z.any(),
    rating: z.any(),
    comment: z.any()
})

/* export const RatingSchema = z.object({
    fullname: z.string({ message: "Please enter your full names" })
        .min(3, { message: "Names must not be less than 3 characters" }),
    rating: z.number().min(1, { message: 'Please select a rating.' }).max(5),
    comment: z.string()
        .min(3, { message: "Comment must not be less than 3 characters" })
        .refine((val) => {
            const wordCount = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
            return wordCount <= maximumWords;
        }, {
            message: 'You cannot enter more than maximumWords0 words.',
        }),
}) */



export default function RatingProvider({ children }: any) {
    const [show, setShow] = useState<boolean>(false)
    const [working, setWorking] = useState<boolean>(false)
    const [listing, setListing] = useState<any | null>(null)
    const [ratingData, setRatingData] = useState<Rating[] | undefined>(undefined)
    const [text, setText] = useState('')
    const notification = useNotification()


    const [stars, setStars] = useState<number>(5);

    let { user } = useAuth()

    const [formdata, setFormdata] = useState<any | null>(null)

    const [wordLimitReached, setWordLimitReached] = useState(false);

    const countWords = (input: string) => {
        return input.trim() === ''
            ? 0
            : input.trim().split(/\s+/).length;
    };

    const changeHandler = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setFormdata((previousValue: any) => {
            return (
                {
                    ...previousValue, [name]: value
                }
            )
        })
    }

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        reset,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        resolver: zodResolver(RatingSchema)
    })






    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        const words = input.trim().split(/\s+/);

        if (words.length <= maximumWords) {
            setValue('text', input);
            setWordLimitReached(false);
        } else {
            setWordLimitReached(true);
            const trimmedWords = words.slice(0, maximumWords).join(' ');
            setValue('text', trimmedWords); // Force trim to maximumWords words
        }
    };

    const postRating = async (data: any) => {
        notification.notify('Working...')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userGuid = user!.guid
        const businessGuid = listing!.gid

        data["user_guid"] = userGuid
        data["business_guid"] = businessGuid



        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = `/api/rating`
        const url = BASE_URL + endpoint

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const datar = await res.json();
            if (res.ok) {

                notification.alert('Success', 'Rating submitted successfully!');
            } else {

                notification.alert('Error', datar.error);
            }
        } catch (error: any) {
            notification.alert('', error.message);
        }
    }

    const validateData = async (data: any, user: any) => {

        if (data?.length === 0) {
            let fname = user?.first_name || ""
            let lname = user?.last_name || ""
            let fullname = fname + " " + lname
            setValue("fullname", fullname)
        }
    }

    let vals = {
        show, setShow,
        setListing, reset,
        setRatingData,
        validateData
    }

    const textValue = watch('text') || '';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const words = textValue.trim().split(/\s+/);
        if (words.length >= maximumWords && e.key !== 'Backspace' && e.key !== 'Delete' && !e.ctrlKey) {
            e.preventDefault(); // Block typing if maximumWords words reached
            setWordLimitReached(true);
        } else {
            setWordLimitReached(false);
        }

    }

    return (
        <RatingContext.Provider value={vals}>
            {
                show && <div className={`flex w-screen h-screen bg-black/40 z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 place-items-center place-content-center`}>
                    <div className={`w-[450px] h-fit mx-auto p-6 bg-white rounded-xl shadow-md space-y-6`}>
                        <h2 className="text-2xl font-bold">Create/Edit Rating</h2>
                        <form onSubmit={handleSubmit(postRating)} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-semibold">Full Name</label>
                                <input
                                    {...register("fullname", {
                                        onChange: changeHandler
                                    })}
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter Business GUID"

                                />
                                {errors.fullname?.message && (
                                    <div className="text-red-500 mt-1 text-sm">
                                        {errors.fullname.message.toString()}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-semibold">Stars</label>
                                <select
                                    {...register("rating", {
                                        onChange: (e) => {
                                            setStars(Number(e.target.value))
                                            changeHandler(e)
                                        }
                                    })}
                                    /* onChange={(e) => setStars(Number(e.target.value))} */
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    {[5, 4, 3, 2, 1].map((s) => (
                                        <option key={s} value={s}>
                                            {s} Star{s > 1 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                                {errors.rating?.message && (
                                    <div className="text-red-500 mt-1 text-sm">
                                        {errors.rating.message.toString()}
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className='flex place-content-between'>
                                    <label className="block mb-1 text-sm font-semibold">Comment</label>
                                    <label className=" text-gray-600 text-sm">
                                        Word Count: <strong>{countWords(text)}</strong>
                                    </label>
                                </div>
                                <textarea

                                    {...register("comment", {
                                        onChange: (e) => {
                                            let words = countWords(text)
                                            if (words <= maximumWords) {
                                                setText(e.target.value)
                                                handleTextChange(e)
                                                changeHandler(e)
                                            } else {
                                                e.preventDefault()
                                            }
                                        }
                                    })}
                                    onKeyDown={handleKeyDown}
                                    className="w-full px-3 py-2 border rounded-md text-sm"
                                    placeholder="Write your review..."
                                    rows={4}
                                />
                                {wordLimitReached && (
                                    <div className="text-red-500 mt-0 text-sm">
                                        Maximum maximumWords words allowed.
                                    </div>
                                )}
                                {errors.comment?.message && (
                                    <div className="text-red-500 mt-0 text-sm">
                                        {errors.comment.message.toString()}
                                    </div>
                                )}
                            </div>

                            <div className={`w-full grid grid-cols-2 gap-2`}>
                                <button
                                    onClick={() => setShow(false)}
                                    className={`w-full bg-red-200 rounded-md
                                        hover:bg-red-100`}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    disabled={working}
                                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                                >
                                    {working ? 'Submitting...' : 'Submit Rating'}
                                </button>
                            </div>
                        </form>

                        {/* {success && <div className="text-green-600">{success}</div>}
                        {error && <div className="text-red-600">{error}</div>} */}
                    </div>
                </div>
            }

            {children}
        </RatingContext.Provider>
    );
}
