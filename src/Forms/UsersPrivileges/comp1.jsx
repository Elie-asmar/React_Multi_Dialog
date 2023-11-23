import React from 'react'

export default function Comp1(props) {
    return (
        <div>
            <h1>
                this is comp 111
            </h1>
            {props.children}

        </div>
    )
}
