import { comment } from "postcss"

export interface IAddUser {
    email: string
    first_name: string
    password: string
}

export interface IUser {
    guid: string
    email: string
    first_name: string
    lastname: string
    user_hash: string
    user_guid: string
    active: boolean
    deleted: boolean
}



export type EditUserType = {
    email: string
    first_name: string
    lastname: string
    img: string
    country_code: string
    state_code: string
    city_id: string
    zipcode: string
    phone: string
    address_one: string
    address_two: string
    active: boolean
    deleted: boolean
}

export type LoginType = {
    email: string
    password: string
}

export type AuthUser = {
    guid: string
    email: string
    first_name: string
    last_name: string
    iat: string
    exp: string
}

export type AuthContextType = {
    user: AuthUser
    signin: (data: LoginType) => Promise<any>;
    signout: () => void;
    resetpw: (data: any) => any;
};

export type AuthTokens = {
    accessToken: string
    refreshToken: string
}

export type TokenType = {
    token: string
}

export type ResetPasswordType = {
    email: string
    owner: string
}

export type NavProp = {
    openNav: () => void
}

export type NavTheme = {
    theme: string
}

export type MobileNavProps = {
    showNav: boolean
    closeNav: () => void
}

export type ListingType = {
    url: string
    title: string
    branch: boolean
    branch_location: string
    category: string
    short_description: string
    long_description: string
    phone: string
    email_address: string
    address_one: string
    address_two: string
    gid: string
    img: string
    listing_hash: string
    owner: string
    username: string
    zipcode: string
    products: string
    services: string
    business_phrases: string
    established: string
    xsocial: string
    linksocial: string
    fbsocial: string
    country_code: string
    state_code: string
    city_id: string
    website: string
}

export type ContactType = {
    gid: string
    img: string
    url: string
    title: string
    category: string
    short_description: string
    long_description: string
    phone: string
    address: string
}

export interface Listing {
    contact: ListingType
}

export type RelatedType = {
    img: string
    title: string
    short_description: string
    url: string
    category: string
}

export interface RelatedProp {
    related: RelatedType[]
}

export interface RelatedCardProp {
    related: RelatedType
}

export type State = {
    name: string
    country_code: string
    iso2: string
}

export type Country = {
    name: string
    id: string
}

export type CountryReformatted = {
    name: string
    iso2: string
}

export type City = {
    name: string
    country_code: string
    state_code: string
    id: string
}

export type Category = {
    name: string
    id: string
}

export type UserProfile = {
    email: string
    first_name: string
    img: string
    user_guid: string
    user_hash: string
    active: boolean
    deleted: boolean
    lastname: string
    country_code: string
    zipcode: string
    mobile: string
    address_one: string
    address_two: string
    city_id: string
    state_code: string
}

export type UserProp = {
    userProfile: UserProfile
}


export type ChangeEmailType = {
    email: string
    guid: string
}

export type Rating = {
    business_guid: string
    user_guid: string
    rating: number
    comment: string
    fullname: string
    rating_guid: string
}