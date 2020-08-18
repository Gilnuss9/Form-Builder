import React from 'react'

function Header({theTitle}) {
    return (
        <header className="border-b p-3 flex justify-between items-center">
            <span className="display-4 font-weight-bold">{theTitle}</span>
        </header>
    )
}

export default Header