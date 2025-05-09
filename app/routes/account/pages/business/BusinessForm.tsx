import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import Textarea from '~/components/content/textarea/Textarea'
import BusinessSchema from './BusinessSchema'
import { getCities, getStates, headers } from '~/lib/Lib'
import ImgComponent from './image/ImgComponent'
import TextareaWithWordLimit from '~/components/content/textarea/TextareaWithWordLimit'
import { loader } from '~/routes/api/users'

const BusinessForm = ({ loaderData, userProfileData }: any) => {

    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)

    const countries = loaderData.countries
    let [states, setStates] = useState(loaderData.states)
    let [cities, setCities] = useState(loaderData.cities)
    const categories = loaderData.categories.data

    const [countryCode, setCountryCode] = useState(loaderData.listing.country_code)
    const [stateCode, setStateCode] = useState(loaderData.listing.state_code)

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

    const handleAddBusiness: SubmitHandler<any> = async (data: any) => {
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/listings/" + loaderData.listing.gid
        const url = BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                alert('Could not update. Try again!')
            } else {
                alert('Successfully updated!')
            }

        } catch (error) {
            return undefined
        } finally {
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
        defaultValues: (loaderData.listing),
        resolver: zodResolver(BusinessSchema)
    })

    useEffect(() => {
        if (newCountryCode) {
            setValue("state_code", "")
            setValue("city_id", "")
        }

    }, [newCountryCode, loaderData])

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
                            listing={loaderData.listing}
                            user={userProfileData}
                            businessProfileImageData={loaderData.businessProfileImageData}
                        />
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(handleAddBusiness)}>
                <div className='form__wrapper__class'>

                    <Input
                        controlTitle={"Username"}
                        controlPlaceholder={"Enter username"}
                        controlName={"username"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.username}
                    />

                    <Input
                        controlTitle={"Business name"}
                        controlPlaceholder={"Enter business name"}
                        controlName={"title"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.title}
                    />

                    <Input
                        controlTitle={"Year established"}
                        controlPlaceholder={"Enter year established"}
                        controlName={"established"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.established}
                    />

                    <Select
                        controlTitle={"Country"}
                        controlName={"country_code"}
                        controlPlaceholder={"Select country"}
                        selectJson={countries}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.country_code}
                        setCode={resetStates}
                    />

                    <Select
                        controlTitle={"State"}
                        controlName={"state_code"}
                        controlPlaceholder={"Select state"}
                        selectJson={states}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.state_code}
                        setCode={resetCities}
                    />

                    <Select
                        controlTitle={"City"}
                        controlName={"city_id"}
                        controlPlaceholder={"Select city"}
                        selectJson={cities}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.city_id}

                    />

                    <Input
                        controlTitle={"Address 1"}
                        controlPlaceholder={"Enter address"}
                        controlName={"address_one"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.address_one}
                        width={100}
                    />

                    <Input
                        controlTitle={"Address 2"}
                        controlPlaceholder={"Enter address"}
                        controlName={"address_two"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.address_two}
                        width={100}
                    />

                    <Input
                        controlTitle={"Zipcode"}
                        controlPlaceholder={"Enter zipcode"}
                        controlName={"zipcode"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.zipcode}
                    />

                    <Input
                        controlTitle={"Phone number"}
                        controlPlaceholder={"Enter phone number"}
                        controlName={"phone"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.phone}
                    />



                    <Select
                        controlTitle={"Category"}
                        controlName={"category"}
                        controlPlaceholder={"Select category"}
                        selectJson={categories}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.category}
                    />

                    <Input
                        controlTitle={"Business Phrases"}
                        controlPlaceholder={"E.g. Advocates, Software Developers, Architect"}
                        controlName={"business_phrases"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.business_phrases}
                    />

                    <Input
                        controlTitle={"Products"}
                        controlPlaceholder={"Enter products"}
                        controlName={"products"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.products}
                    />

                    <Input
                        controlTitle={"Services"}
                        controlPlaceholder={"Enter services"}
                        controlName={"services"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.services}
                    />

                    <TextareaWithWordLimit
                        controlTitle={"Short Description"}
                        controlPlaceholder={"Short description"}
                        controlName={"short_description"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.short_description}
                        setValue={setValue}
                        getValues={getValues}
                        watch={watch}
                    />

                    <TextareaWithWordLimit
                        controlTitle={"Long Description"}
                        controlPlaceholder={"Long description"}
                        controlName={"long_description"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.long_description}
                        setValue={setValue}
                        getValues={getValues}
                        watch={watch}
                    />

                    <Input
                        controlTitle={"Twitter"}
                        controlPlaceholder={"@handle"}
                        controlName={"xsocial"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.address}
                    />

                    <Input
                        controlTitle={"Facebook"}
                        controlPlaceholder={"@handle"}
                        controlName={"fbsocial"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.fbsocial}
                    />

                    <Input
                        controlTitle={"LinkedIn"}
                        controlPlaceholder={"https://linkedin.com/company/username"}
                        controlName={"linksocial"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.linksocial}
                    />

                    <Input
                        controlTitle={"Website"}
                        controlPlaceholder={"Enter website"}
                        controlName={"website"}
                        register={register}
                        changeHandler={changeHandler}
                        error={errors.website}
                    />

                    <Button working={working} />
                </div>
            </form>
        </>
    )
}

export default BusinessForm
