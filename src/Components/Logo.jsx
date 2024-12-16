import React from 'react'

function Logo({width='400px'}) {
    return (
        <div>
            <img src="/src/assets/megabloglogo.png" alt="logo" width={width} height={width} />
        </div>
    )
}

export default Logo
