import React, { useEffect, useState } from 'react'
import { SettingsContext } from '../../ContextProvider/Settings/SettingsContext'
import usePrompt from '../CustomHooks/usePrompt';

export function Admission({ mode }) {
    // const { setbuttonSaveClicked, buttonSaveClicked } = useContext(SystemContext)
    const { blockNav, setblockNav } = useState(false)

    const isDirty = () => {
        return true;
    };

    usePrompt("Are you sure you want to leave?", isDirty());

    // useEffect(() => {
    //     if (buttonSaveClicked) {
    //         console.log('The Save Button Was Clicked From Full, it performed a Context State Change, Admission Form is re-rendering and will perform a side effect like saving to the database')
    //         setbuttonSaveClicked(false)
    //     }
    // }, [buttonSaveClicked, setbuttonSaveClicked])

    return (
        <>
            <div>This is the Admission Form in {mode} Mode</div>
            <input type='checkbox' aria-label='Block Navigation' value={blockNav} onClick={(e) => {
                setblockNav(e.target.value)
            }} />
        </>
    )
}
