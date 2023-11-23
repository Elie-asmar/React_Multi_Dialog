import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useCallback } from 'react'


const isRequired = parameterName => {
    console.warn(`${parameterName} is required`)
    //throw new Error(`${parameterName} is required`);
}

export function SubmitButton({ id = isRequired("id"), Text, ShowConfirmMessage, ConfirmMessage, OnButtonClick }) {
    const [Confirm, setConfirm] = useState(false);

    const buttonClicked = useCallback(e => {
        if (ShowConfirmMessage) {
            const prompt = window.confirm(ConfirmMessage);
            if (prompt) {
                OnButtonClick(e.target.id)
            }
        }
        else {
            OnButtonClick(e.target.id)
        }

    })

    return (
        <button id={id} onClick={buttonClicked}>{Text}</button>
    )
}
