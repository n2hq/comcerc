import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from '../mobile/MobileNav'

const ResponsiveNav = () => {
    const [showNav, setShowNav] = useState(false)
    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)

    return (
        <div>
            <Nav openNav={openNav} />
            <MobileNav showNav={showNav} closeNav={closeNav} />
        </div>
    )
}

export default ResponsiveNav
