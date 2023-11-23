import { render } from '@testing-library/react';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Header } from './Header';
import { HeaderMenu } from './HeaderMenu';
import { ErrorContext } from '../../ContextProvider/ErrorContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import scrollIntoView from 'scroll-into-view';
import { BreadCrumbs } from '../../ReusableComponents/Other/BreadCrumb/BreadCrumbs';
import { SystemFileComponentsList } from '../../ReusableComponents/Other/SearchControls/ComponentsDictionary/SystemFileComponentsList'
import { SearchControls } from '../../ReusableComponents/Other/SearchControls/SearchControls';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import { DataGridView } from '../../ReusableComponents/DataGridView/DataGridView';
import { NationalityDefinition } from '../../Forms/NationalityDefinition/NationalityDefinition';
import { NationalityDefinitionList } from '../../Forms/NationalityDefinition/NationalityDefinitionList';
import { BreadCrumbroutes } from '../../ReusableComponents/Other/BreadCrumb/BreadCrumbRoutes';

export function Full() {
    let renderedComps = [];
    const [comps, setComps] = useState(null)
    const { setErrorMessage } = useContext(ErrorContext)
    const { setisLoading } = useContext(LoadingContext);
    const top = useRef(null);

    const breadCrumbButtonsHeight = useRef(0);





    const STATE = {
        showMobileMenu: false,
        spinnerShow: false,
        saveContainerVisible: false,
        saveContainerButtons: {},
        saveContainerLabels: {},
        navmenus: "",
        backtotop: false,
        notifications: []
    };

    const [state, setState] = useState(STATE);

    const scrollintoview = useCallback(() => {
        scrollIntoView(top);
    }, [top])

    const toggleMobileMenu = useCallback((display) => {

        console.warn(display)
        setState({
            ...state,
            showMobileMenu: display
        });

    }, [state])



    useEffect(() => {
        breadCrumbButtonsHeight.current = document.getElementById("breadCrumbButtons") ? document.getElementById("breadCrumbButtons").offsetHeight + 55 + "px" : "55px"
    }, [])

    const handleButtonClick = (name) => {
    }


    // setName(prv=>{return {...prv}})
    return (
        <>
            <div className="app" ref={top} >

                <div id="back-to-top-div" style={{ display: `${state.backtotop ? "block" : "none"}` }}>
                    <strong>
                        <i className="icon-arrow-up" style={{ position: "relative", top: "-1px", left: "4px" }} onClick={scrollintoview}></i>
                    </strong>
                </div>
                {/* 
                <Header id="main-header-container"
                    showMobileMenu={state.showMobileMenu}
                    toggleMobileMenu={toggleMobileMenu}
                /> */}
                <HeaderMenu
                    id="main-header-container"
                    mobileMenu={true}
                    showMobileMenu={state.showMobileMenu}
                />
                <div id="breadCrumbButtons" className="breadCrumbButtons">
                    <BreadCrumbs routes={BreadCrumbroutes}
                        renderFunction={({ path, label }) => {
                            return <span style={{ fontWeight: 'bold' }}>{label}</span>
                        }}
                        isDisabledStyle={({ isDisabled }) =>
                            isDisabled ? { 'color': '#818a91', 'cursor': 'auto', 'opacity': '0.5', 'textDecoration': 'none' } : undefined
                        }
                    >
                    </BreadCrumbs>
                    {/* <ButtonsContainer putSendEmail={true} putStart={true} modifiedBy="Elie Asmar" createdBy="Elie ASmar" creationDate="2022-03-18 14:00" modifiedDate="2022-03-18 15:23" handleButtonClick={handleButtonClick} /> */}
                </div>
                {/* <div>
                    <SearchControls SearchDictionary={SystemFileComponentsList} />

                </div>
                <div>
                    <DataGridView />

                </div> */}



                <div className="app-body">
                    <main className="main" >
                        <div className={`container-fluid`} style={{ padding: 0 }}>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

        </>




    )
}
