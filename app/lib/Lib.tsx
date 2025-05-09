import CryptoJS from 'crypto-js'
import { Category, City, ContactType, Country, CountryReformatted, Rating, State, UserProfile } from './Interfaces';

export const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
}


export function DoResponse(json: any, code: number = 500) {
    return new Response(
        JSON.stringify(json),
        {
            status: code,
            headers: headers
        }
    )
}

export function GetResponse(data: any, success: boolean = false, code: number = 200) {

    const response = {
        success: success,
        rspcode: code,
        data: data
    }

    return new Response(
        JSON.stringify(response),
        {
            status: code,
            headers: headers
        }
    )
}

export const HashPwd = (input: string): any => {
    return CryptoJS.SHA256(input).toString();
}

export const GenerateRandomHash = () => {
    const randomBytes = CryptoJS.lib.WordArray.random(16);
    const hash = CryptoJS.SHA256(randomBytes).toString();
    return hash
};



export const getMetaData = (title: string, description: string, keywords: string[], img: string, url: string) => {
    let socialHandler = "dersck"
    return [
        { title: title },
        { name: "description", content: `${description}` },
        { name: "keywords", content: keywords },
        { property: "fb:app_id", content: "1325393508603168" },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: img },
        { property: "og:image:secure_url", content: img },
        { property: "og:image:type", content: "png" },
        { property: "og:image:width", content: "200" },
        { property: "og:image:alt", content: title },
        { name: "twitter:creator", content: socialHandler },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description }
    ];
}


export const getQuery = async (criteria: string | null): Promise<ContactType[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/listings/" + criteria
    const url = BASE_URL + endpoint

    console.log(url)
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ContactType[] = await response.json();
        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error) {
        return undefined
    }
}

export const getCountries = async (): Promise<Country[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/util/country"
    const url = BASE_URL + endpoint

    console.log(url)
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Country[] = await response.json();
        const finaldata: any = data.map((country) => {
            return {
                name: country.name,
                id: country.id
            }
        })

        console.log(finaldata)

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getStates = async (countryCode: string | null): Promise<State[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/util/state?country_code=" + countryCode
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: State[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getCities = async (countryCode: string | null, stateCode: string | null): Promise<City[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/util/city?country_code=" + countryCode + "&state_code=" + stateCode
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: City[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getCategories = async (): Promise<Category[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/util/category"
    const url = BASE_URL + endpoint

    console.log(url)
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Category[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const PutRequest = async (criteria: string): Promise<ContactType[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/listings/" + criteria
    const url = BASE_URL + endpoint

    console.log(url)
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ContactType[] = await response.json();
        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error) {
        return undefined
    }
}


export const getUserProfile = async (guid: string | null): Promise<UserProfile[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/users/" + guid
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: UserProfile[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const changeEmail = async (guid: string | null, email: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/users/change_email?guid=${guid}&email=${email}`
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = {
            status: true
        }

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getUserProfileImageData = async (guid: string | null): Promise<UserProfile[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/users/user_profile_image/" + guid
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getBusinessProfileImageData = async (guid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/listings/business_profile_image/" + guid
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getGallery = async (businessGuid: string | null, userGuid: string | null): Promise<UserProfile[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/gallery/${businessGuid}/${userGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const deleteGalleryImage = async (guid: string | null, bid: string | null, image_guid: string | null): Promise<any | undefined> => {
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
    const endpoint = `/delete_business_gallery_pic`
    const url = IMG_BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = {
            status: true
        }

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getOperatingHours = async (businessGuid: string | null, userGuid: string | null): Promise<UserProfile[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        console.log(error.message)
        return undefined
    }
}

export const saveOperatingHours = async (openStatus: any, workingHours: any, businessGuid: any, userGuid: any) => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({ openStatus, workingHours })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getSysFacilityFeatures = async (): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/sys_facility_features`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getSelectedFacilityFeatures = async (userGuid: string | null, businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/selected_facility_features/${userGuid}/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getBusiness = async (userGuid: string | null, businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/activate/${userGuid}/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getBusinessGallery = async (businessGuid: string | null): Promise<UserProfile[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/business_gallery/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getRating = async (userGuid: string | null, businessGuid: string | null): Promise<Rating[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/rating/${userGuid}/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const getBusinessFeatures = async (businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/business_facility_features/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const getBusinessRatings = async (businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/rating/business_ratings/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getLocalDate = (date: string) => {
    const localDate = new Date(date)
    const formatted = localDate.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })
    return formatted
}

export const getRatingsReviews = async (businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/rating/ratings_reviews/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getListingByCategory = async (category: string, limit: number): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/listing_by_category/${category}/${limit}`
    const url = BASE_URL + endpoint



    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const getFeaturedListing = async (): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listings/featured_listing`
    const url = BASE_URL + endpoint



    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getUserByUserHash = async (userHash: string): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/users/user_by_user_hash/${userHash}`
    const url = BASE_URL + endpoint



    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}




export const generate7DigitNumber = (): number => {
    return Math.floor(1000000 + Math.random() * 9000000); // Range: 1000000 - 9999999
};

export function toSentenceCase(text: string): string {
    return text
        .toLowerCase()
        .replace(/([^.!?]*[.!?])(\s+|$)/g, (match) =>
            match.charAt(0).toUpperCase() + match.slice(1)
        );
}