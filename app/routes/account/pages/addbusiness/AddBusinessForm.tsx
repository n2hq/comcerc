import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getCities, getStates, headers } from '~/lib/Lib'
import AddBusinessSchema from './AddBusinessSchema'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import Textarea from '~/components/content/textarea/Textarea'

const AddBusinessForm = ({ loaderData, user }: any) => {
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

    const handleAddBusiness = async (data: any) => {
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        data["owner"] = user.guid

        //return false
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/listings"
        const url = BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })



            if (!response.ok) {
                var respObj = await response.json()
                throw new Error(`Error Code: ${response.status} - ${respObj.error}`)
            } else {
                alert('Successfully added!')
            }
        } catch (e: any) {
            alert(e.message)
            return undefined
        } finally {
            setWorking(false)
        }
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        defaultValues: (loaderData.listing),
        resolver: zodResolver(AddBusinessSchema)
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
        <form onSubmit={handleSubmit(handleAddBusiness)}>
            <div className='form__wrapper__class'>
                <Input
                    controlTitle={"Business Name"}
                    controlPlaceholder={"Enter business name"}
                    controlName={"title"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.title}
                    width={80}
                />

                <Input
                    controlTitle={"Email Address"}
                    controlPlaceholder={"Enter email address"}
                    controlName={"email_address"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.email_address}
                />

                <Select
                    controlTitle={"Business Category"}
                    controlName={"category"}
                    controlPlaceholder={"Select business category"}
                    selectJson={categories}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.category}
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

                <Textarea
                    controlTitle={"Description"}
                    controlPlaceholder={"Shotrt description"}
                    controlName={"short_description"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.short_description}
                />

                <Button working={working} />
            </div>
        </form>
    )
}

export default AddBusinessForm
