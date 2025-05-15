export const RequestType = {
    PASSWORD_RESET: "password_reset",
    CHANGE_PASSWORD: "change_password",
    CHANGE_EMAIL: "change_email"
}

export const RequestStatus = {
    OPEN: "open",
    CLOSED: "closed"
}

export const navlinks = [
    {
        id: 1,
        url: '/',
        label: "Home"
    },
    {
        id: 2,
        url: '/search',
        label: "Search"
    },
    {
        id: 3,
        url: '/search?q=hotels',
        label: "Hotels"
    },
    {
        id: 4,
        url: '/search?q=travel',
        label: "Travel"
    },
    {
        id: 5,
        url: `/search?q=real estate`,
        label: "Real Estate"
    },
    {
        id: 6,
        url: '/search?q=services',
        label: "Services"
    }
]