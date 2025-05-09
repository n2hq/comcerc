import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import ProfileSchema from './ProfileSchema'
import { getCities, getStates, headers } from '~/lib/Lib'
import { MdEditSquare } from 'react-icons/md'
import ImgComponent from './image/ImgComponent'

const categoryJson = [
    {
        id: "entertainment",
        name: "Entertainment"
    },
    {
        id: "services",
        name: "Services"
    }
]
const ProfileForm = ({ loaderData, user, userProfileData, userProfileImageData }: any) => {
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)

    const countries = loaderData.countries
    let [states, setStates] = useState(loaderData.states)
    let [cities, setCities] = useState(loaderData.cities)
    const categories = loaderData.categories.data

    const [countryCode, setCountryCode] = useState(loaderData.userProfileData.country_code)
    const [stateCode, setStateCode] = useState(loaderData.userProfileData.state_code)

    const [newCountryCode, setNewCountryCode] = useState('')
    const [newStateCode, setNewStateCode] = useState('')

    const resetStates = async (countryCode: string) => {
        setCountryCode(countryCode)
        setNewCountryCode(countryCode)
        const states = await getStates(countryCode)
        setStates(states)
        resetCities('')
    }

    const resetCities = async (stateCode: string) => {
        setStateCode(stateCode)
        setNewStateCode(stateCode)
        const cities = await getCities(countryCode, stateCode)
        setCities(cities)
    }

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

    const handleUpdateUser: SubmitHandler<any> = async (data: any) => {
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/users/" + user.guid
        const url = BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                var respObj = await response.json()
                throw new Error(`Error Code: ${response.status} - ${respObj.error}`)
            } else {
                alert('Update is Successfully!')
            }
        }
        catch (error: any) {
            alert(error.message)
            return undefined
        }
        finally {
            setWorking(false)
        }

    }

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        defaultValues: (userProfileData),
        resolver: zodResolver(ProfileSchema)
    })

    useEffect(() => {
        if (newCountryCode) {
            setValue("state_code", "")
            setValue("city_id", "")
        }
    }, [newCountryCode])

    useEffect(() => {
        if (newStateCode) {
            setValue("city_id", "")
        }
    }, [newStateCode])


    return (
        <>
            <div className='form__wrapper__class'>
                <div className='input__wrapper_class flex flex-col place-items-center md:place-items-start'>
                    <div className='input__heading__class'>
                        Add/Change Photo
                    </div>
                    <div className='mt-4'>

                        <ImgComponent
                            user={userProfileData}
                            userProfileImageData={loaderData.userProfileImageData}
                        />
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(handleUpdateUser)}>

                <div className='form__wrapper__class -mt-0'>
                    <Input
                        controlTitle={"First Name"}
                        controlName={"first_name"}
                        controlPlaceholder={"Enter first name"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.first_name}
                    />

                    <Input
                        controlTitle={"Last Name"}
                        controlName={"lastname"}
                        controlPlaceholder={"Enter last name"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.lastname}
                    />

                    <Select
                        controlTitle={"Country"}
                        controlName={"country_code"}
                        controlPlaceholder={"Select Country"}
                        selectJson={countries}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.country_code}
                        setCode={resetStates}
                    />

                    <Select
                        controlTitle={"State"}
                        controlName={"state_code"}
                        controlPlaceholder={"Select State"}
                        selectJson={states}
                        register={register}
                        changeHandler={changeHandler}
                        setCode={resetCities}
                    />

                    <Select
                        controlTitle={"City"}
                        controlName={"city_id"}
                        controlPlaceholder={"Select City"}
                        selectJson={cities}
                        register={register}
                        changeHandler={changeHandler}
                    />

                    <Input
                        controlTitle={"Zipcode"}
                        controlName={"zipcode"}
                        controlPlaceholder={"Enter zip code"}
                        register={register}
                        changeHandler={changeHandler}
                    />


                    <Input
                        controlTitle={"Phone"}
                        controlName={"phone"}
                        controlPlaceholder={"Enter phone number"}
                        register={register}
                        changeHandler={changeHandler}
                    />


                    <Input
                        controlTitle={"Address Line 1"}
                        controlName={"address_one"}
                        controlPlaceholder={"Enter address"}
                        register={register}
                        changeHandler={changeHandler}
                    />

                    <Input
                        controlTitle={"Address Line 2"}
                        controlName={"address_two"}
                        controlPlaceholder={"Enter address"}
                        register={register}
                        changeHandler={changeHandler}
                    />

                    <Button working={working} />
                </div>
            </form>
        </>
    )
}

export default ProfileForm
