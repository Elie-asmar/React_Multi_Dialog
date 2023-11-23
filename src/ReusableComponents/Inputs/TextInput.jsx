import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
export function TextInput({ type, id, placeholder, onChange, value, ...rest }) {

    const [currentValue, setcurrentValue] = useState('');

    const handleChange = e => {
        onChange(id, e.target.value);
    }

    useEffect(() => {
        if (value !== currentValue) {
            setcurrentValue(value);
        }
    }, [value]);


    return (
        <input type={type} id={id} value={currentValue} placeholder={placeholder} onChange={handleChange} />
    )
}

