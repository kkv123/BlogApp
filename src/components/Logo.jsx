import React from 'react'

function Logo({ width = '100px' }) {
    return (
        <div className="flex justify-center items-center">
            <img
                src="/logo.png"
                alt="Blog Logo"
                className="w-14 sm:w-14 md:w-18 lg:w-20 h-auto"
            />
        </div>
    )
}

export default Logo