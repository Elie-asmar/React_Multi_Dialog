import { createContext, useEffect, useState } from "react";
import { useFetchData } from '../CustomHooks/APIs/useFetchData'

export const SettingsContext = createContext();

export function SettingsContextWrapper({ children }) {
    const [Settings, setSettings] = useState(null);

    const setSystemSettings = (value) => {
        setSettings(value);
    }

    return (
        <SettingsContext.Provider value={{ Settings, setSystemSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}




