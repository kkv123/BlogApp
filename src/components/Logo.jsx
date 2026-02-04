import React from 'react'

function Logo({ width = '100px' }) {
    return (
        <div className="flex justify-center items-center py-4">
            <img
                src="/logo.png"
                alt="Blog Logo"
                className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto"
            />
        </div>
    )
}

export default Logo