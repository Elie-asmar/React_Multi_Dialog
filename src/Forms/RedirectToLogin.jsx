import React from 'react'
import { useNavigate } from 'react-router-dom'
export function RedirectToLogin() {
    const nav = useNavigate();
    return (
        <>
            <h1>Invalid Login</h1>
            <button onClick={() => {
                nav('/', { replace: true });

            }} >
                Login
            </button>
        </>

    )
}
