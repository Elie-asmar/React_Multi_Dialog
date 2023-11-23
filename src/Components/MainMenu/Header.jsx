import React, { useCallback, useEffect, useState } from 'react'
import { HeaderMenu } from './HeaderMenu';

export function Header({ showMobileMenu, toggleMobileMenu }) {


    const STATE = {
        showMobileMenu: false
    }
    const [state, setState] = useState(STATE);

    useEffect(() => {
        if (state.showMobileMenu !== showMobileMenu) {
            setState({ ...state, showMobileMenu })
        }
    }, [showMobileMenu])


    const mobileMenuToggle = useCallback((e) => {
        setState({ ...state, showMobileMenu: !state.showMobileMenu });
        toggleMobileMenu(!state.showMobileMenu)
    }, [state])



    return (
        <header className={`app-header navbar`}>

            <span className="hidden-md-up navbar-toggler pointer" onClick={mobileMenuToggle} style={{ color: "white" }}>&#9776;</span>

            <span className="navbar-brand"><img src="./img/ctserv.png" alt="logo" /></span>

            <HeaderMenu
                mobileMenu={false}
            />


        </header>
    )
}
