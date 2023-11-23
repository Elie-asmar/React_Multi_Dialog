import React, { createContext, useState } from 'react'

export const DialogContext = createContext();

export function DialogContextWrapper({ children }) {
    const [dialogs, setDialogs] = useState([]);

    return (
        <DialogContext.Provider value={{ dialogs, setDialogs }}>
            {children}
        </DialogContext.Provider>

    )
}
