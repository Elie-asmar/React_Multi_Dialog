import React from 'react'
import { TextInput } from './TextInput'

export function PasswordInput({ isConfirm, ...rest }) {

    return (
        <TextInput type="password" placeholder={isConfirm ? "Confirm Password" : "Password"} {...rest} />
    )
}
