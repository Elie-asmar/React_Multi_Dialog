import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { clearSessionInfo } from '../../utils/session';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, UncontrolledDropdown, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { Steps } from './StepsDefinition';



const getStepInfo = (uid) => {
    return Steps.find(s => s.guid === uid);
}

export function HeaderMenu({ mobileMenu, showMobileMenu }) {

    const { userData } = useContext(AuthContext);

    const STATE = {
        mobileMenu: false,
        logindropdownOpen: false,
        loginname: userData?.userInfo?.user_name || '',
        showMobileMenu: false,
        genHospCodingDropD: false,
        vendorDropDown: false,
        purchasingDropDown: false,
        productsDropDown: false,
        usersDropD: false,
        privdata: userData?.userPriv || [],
        isOpen: false
    };


    const [state, setState] = useState(STATE);

    const [test, setTest] = useState({ a: 1, b: 1 })

    const navigate = useNavigate();
    const x = useRef(0);

    //Component Did Update Equivalent in Class Based Components
    useEffect(() => {
        if (state?.mobileMenu !== mobileMenu || state?.showMobileMenu !== showMobileMenu) {
            setState({ ...state, mobileMenu: mobileMenu, showMobileMenu: showMobileMenu });
        }
    }, [mobileMenu, showMobileMenu])


    useEffect(() => {
        setState((prv) => { return { ...prv, loginname: userData?.userInfo?.user_name, privdata: userData?.userPriv } })
    }, [userData])





    const logintoggle = useCallback(() => {
        setState({ ...state, logindropdownOpen: !state.logindropdownOpen })
    }, [state]);


    const logout = useCallback(() => {
        clearSessionInfo();
        navigate('/login', { replace: true })
    }, [])

    const mobileMenuToggle = useCallback(() => {
        setState({ ...state, showMobileMenu: !state.showMobileMenu });
    }, [state])


    const goToPage = useCallback((url, uuid) => {
        // setState({ ...state, isOpen: false })
        toggle("goToPage")
        navigate(url, { state: { uuid } })
    }, [state]);

    const toggle = useCallback((key) => {
        setState({ ...state, isOpen: key !== "goToPage" ? !state.isOpen : false })
    }, [state]);


    const onMouseEnter = useCallback((key) => {
        setState({ ...state, [key]: true })
    }, [state]);


    const onMouseLeave = useCallback((key) => {
        setState({ ...state, [key]: false })
    }, [state]);


    const getPrivilege = useCallback((stepcode) => {
        return true;
        let fltr = state.privdata.filter(element => element.StepCode === stepcode);
        if (fltr.length > 0) {
            return fltr[0].HasPriv.toUpperCase() === 'Y'
        }
        else {
            return false;
        }

    }, [state.privdata]);

    const increment_a = useCallback(() => {
        setTest((prv) => {
            return { ...prv, a: prv.a + 1 }
        })

    }, [])

    return (
        <>
            <Navbar color="light" light expand="md" className='app-header'>
                <NavbarBrand href="/">
                    <span className="navbar-brand"><img src="./img/ctserv.png" alt="logo" /></span>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                General Hospital Coding
                            </DropdownToggle>
                            <DropdownMenu>

                                {/* System File     */}
                                <DropdownItem disabled={!(getPrivilege('D665B8B8-91E0-4FB0-8082-6B5ED1AF5943'))} className="pointer" onClick={() => goToPage(getStepInfo('D665B8B8-91E0-4FB0-8082-6B5ED1AF5943').path, 'D665B8B8-91E0-4FB0-8082-6B5ED1AF5943')}>{getStepInfo('D665B8B8-91E0-4FB0-8082-6B5ED1AF5943').Name}</DropdownItem>

                                {/* Connection Info Definition      */}
                                <DropdownItem disabled={!(getPrivilege('1A0DF8DD-2B29-4510-AA04-F919073D5C97'))} className="pointer" onClick={() => goToPage(getStepInfo('1A0DF8DD-2B29-4510-AA04-F919073D5C97').path, '1A0DF8DD-2B29-4510-AA04-F919073D5C97')}>{getStepInfo('1A0DF8DD-2B29-4510-AA04-F919073D5C97').Name}</DropdownItem>

                                {/* Menu Background    */}
                                <DropdownItem disabled={!(getPrivilege('CDD8919D-8A7E-4993-ADA5-2D50E314C96F'))} className="pointer" onClick={() => goToPage(getStepInfo('CDD8919D-8A7E-4993-ADA5-2D50E314C96F').path, 'CDD8919D-8A7E-4993-ADA5-2D50E314C96F')}>{getStepInfo('CDD8919D-8A7E-4993-ADA5-2D50E314C96F').Name}</DropdownItem>

                                {/* Nationality Definition     */}
                                <DropdownItem disabled={!(getPrivilege('B10B203F-7B11-492F-8DFF-49C01535B176'))} className="pointer" onClick={() => goToPage(getStepInfo('B10B203F-7B11-492F-8DFF-49C01535B176').path, 'B10B203F-7B11-492F-8DFF-49C01535B176')}>{getStepInfo('B10B203F-7B11-492F-8DFF-49C01535B176').Name}</DropdownItem>

                                {/* Religion Definition    */}
                                <DropdownItem disabled={!(getPrivilege('60A84467-1A54-4A0F-806A-9952D32C30D1'))} className="pointer" onClick={() => goToPage(getStepInfo('60A84467-1A54-4A0F-806A-9952D32C30D1').path, '60A84467-1A54-4A0F-806A-9952D32C30D1')}>{getStepInfo('60A84467-1A54-4A0F-806A-9952D32C30D1').Name}</DropdownItem>

                                {/* Region Definitions     */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu ' nav caret>
                                            Region Definitions
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu right className='DropdownMenu-submenu'>
                                            {/* Mouhafaza Definition     */}
                                            <DropdownItem disabled={!(getPrivilege('E9CE6A40-4642-45DB-82B5-AFAFB4807A31'))} className="pointer" onClick={() => goToPage(getStepInfo('E9CE6A40-4642-45DB-82B5-AFAFB4807A31').path, 'E9CE6A40-4642-45DB-82B5-AFAFB4807A31')}>{getStepInfo('E9CE6A40-4642-45DB-82B5-AFAFB4807A31').Name}</DropdownItem>
                                            {/* Kaza Definition     */}
                                            <DropdownItem disabled={!(getPrivilege('770562FD-3FA9-415A-B35C-70F04FDE8E18'))} className="pointer" onClick={() => goToPage(getStepInfo('770562FD-3FA9-415A-B35C-70F04FDE8E18').path, '770562FD-3FA9-415A-B35C-70F04FDE8E18')}>{getStepInfo('770562FD-3FA9-415A-B35C-70F04FDE8E18').Name}</DropdownItem>
                                            {/* Region Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('F4E396A6-F4AA-489B-A6EE-BE209BB4FBCB'))} className="pointer" onClick={() => goToPage(getStepInfo('F4E396A6-F4AA-489B-A6EE-BE209BB4FBCB').path, 'F4E396A6-F4AA-489B-A6EE-BE209BB4FBCB')}>{getStepInfo('F4E396A6-F4AA-489B-A6EE-BE209BB4FBCB').Name}</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/* Profession Definition     */}
                                <DropdownItem disabled={!(getPrivilege('548C207B-8AEA-4DB4-A0D3-631212BAF3F1'))} className="pointer" onClick={() => goToPage(getStepInfo('548C207B-8AEA-4DB4-A0D3-631212BAF3F1').path, '548C207B-8AEA-4DB4-A0D3-631212BAF3F1')}>{getStepInfo('548C207B-8AEA-4DB4-A0D3-631212BAF3F1').Name}</DropdownItem>

                                {/* Hospital Definition    */}
                                <DropdownItem disabled={!(getPrivilege('E13F2FAD-C96F-4082-A07B-3F4C58CBA669'))} className="pointer" onClick={() => goToPage(getStepInfo('E13F2FAD-C96F-4082-A07B-3F4C58CBA669').path, 'E13F2FAD-C96F-4082-A07B-3F4C58CBA669')}>{getStepInfo('E13F2FAD-C96F-4082-A07B-3F4C58CBA669').Name}</DropdownItem>

                                {/*Doctor Specialty Definition    */}
                                <DropdownItem disabled={!(getPrivilege('FB598160-DA4A-481F-BE3C-33CE86F22016'))} className="pointer" onClick={() => goToPage(getStepInfo('FB598160-DA4A-481F-BE3C-33CE86F22016').path, 'FB598160-DA4A-481F-BE3C-33CE86F22016')}>{getStepInfo('FB598160-DA4A-481F-BE3C-33CE86F22016').Name}</DropdownItem>

                                {/*Doctors  Definition    */}
                                <DropdownItem disabled={!(getPrivilege('8303C642-7242-45E7-9969-5A7A56693A38'))} className="pointer" onClick={() => goToPage(getStepInfo('8303C642-7242-45E7-9969-5A7A56693A38').path, '8303C642-7242-45E7-9969-5A7A56693A38')}>{getStepInfo('8303C642-7242-45E7-9969-5A7A56693A38').Name}</DropdownItem>

                                {/*Doctor Pool Definition    */}
                                <DropdownItem disabled={!(getPrivilege('2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B'))} className="pointer" onClick={() => goToPage(getStepInfo('2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B').path, '2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B')}>{getStepInfo('2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B').Name}</DropdownItem>



                                {/* Medical Info Definitions     */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu ' nav caret>
                                            Medical Info Definitions
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu right className='DropdownMenu-submenu'>
                                            {/*General Diagnosis Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('963E9D34-C8AC-4B72-9F93-1235970A7907'))} className="pointer" onClick={() => goToPage(getStepInfo('963E9D34-C8AC-4B72-9F93-1235970A7907').path, '963E9D34-C8AC-4B72-9F93-1235970A7907')}>{getStepInfo('963E9D34-C8AC-4B72-9F93-1235970A7907').Name}</DropdownItem>

                                            {/*Diet Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('3CAC686C-68BD-4260-B43C-FEA6E0829E78'))} className="pointer" onClick={() => goToPage(getStepInfo('3CAC686C-68BD-4260-B43C-FEA6E0829E78').path, '3CAC686C-68BD-4260-B43C-FEA6E0829E78')}>{getStepInfo('3CAC686C-68BD-4260-B43C-FEA6E0829E78').Name}</DropdownItem>

                                            {/*Activity Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('1D363DAA-42DC-4B1E-A0A5-5DC4488F8748'))} className="pointer" onClick={() => goToPage(getStepInfo('1D363DAA-42DC-4B1E-A0A5-5DC4488F8748').path, '1D363DAA-42DC-4B1E-A0A5-5DC4488F8748')}>{getStepInfo('1D363DAA-42DC-4B1E-A0A5-5DC4488F8748').Name}</DropdownItem>

                                            {/*Condition Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('44452F9F-33B2-4DE7-9D47-049780BEDAC0'))} className="pointer" onClick={() => goToPage(getStepInfo('44452F9F-33B2-4DE7-9D47-049780BEDAC0').path, '44452F9F-33B2-4DE7-9D47-049780BEDAC0')}>{getStepInfo('44452F9F-33B2-4DE7-9D47-049780BEDAC0').Name}</DropdownItem>

                                            {/*Precaution Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('C5D0F15E-975F-4E23-AF06-07541EF3A7D6'))} className="pointer" onClick={() => goToPage(getStepInfo('C5D0F15E-975F-4E23-AF06-07541EF3A7D6').path, 'C5D0F15E-975F-4E23-AF06-07541EF3A7D6')}>{getStepInfo('C5D0F15E-975F-4E23-AF06-07541EF3A7D6').Name}</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>



                                {/* Departments Definition   */}
                                <DropdownItem disabled={!(getPrivilege('133259F9-20D9-479E-B650-DE2E3CB048B3'))} className="pointer" onClick={() => goToPage(getStepInfo('133259F9-20D9-479E-B650-DE2E3CB048B3').path, '133259F9-20D9-479E-B650-DE2E3CB048B3')}>{getStepInfo('133259F9-20D9-479E-B650-DE2E3CB048B3').Name}</DropdownItem>

                                {/* Medical Services    */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Medical Services
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*Do  className='DropdownMenu-submenu'ctor   */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Doctors
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu>
                                            {/*Doctor Specialty Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('FB598160-DA4A-481F-BE3C-33CE86F22016'))} className="pointer" onClick={() => goToPage(getStepInfo('FB598160-DA4A-481F-BE3C-33CE86F22016').path, 'FB598160-DA4A-481F-BE3C-33CE86F22016')}>{getStepInfo('FB598160-DA4A-481F-BE3C-33CE86F22016').Name}</DropdownItem>

                                            {/*Doctor Pool Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B'))} className="pointer" onClick={() => goToPage(getStepInfo('2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B').path, '2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B')}>{getStepInfo('2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B').Name}</DropdownItem>

                                            {/*Doctors  Definition    */}
                                            <DropdownItem disabled={!(getPrivilege('8303C642-7242-45E7-9969-5A7A56693A38'))} className="pointer" onClick={() => goToPage(getStepInfo('8303C642-7242-45E7-9969-5A7A56693A38').path, '8303C642-7242-45E7-9969-5A7A56693A38')}>{getStepInfo('8303C642-7242-45E7-9969-5A7A56693A38').Name}</DropdownItem>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*Cl  className='DropdownMenu-submenu'asses    */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Classes
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu' >

                                            {/* Hospital Classes Definition   */}
                                            <DropdownItem disabled={!(getPrivilege('36851309-4A68-4370-B718-098B0222615F'))} className="pointer" onClick={() => goToPage(getStepInfo('36851309-4A68-4370-B718-098B0222615F').path, '36851309-4A68-4370-B718-098B0222615F')}>{getStepInfo('36851309-4A68-4370-B718-098B0222615F').Name}</DropdownItem>

                                            {/* Invoicing Classes Definition   */}
                                            <DropdownItem disabled={!(getPrivilege('D8F706A2-EDF5-48E2-A4A1-BF2D04FEBAF7'))} className="pointer" onClick={() => goToPage(getStepInfo('D8F706A2-EDF5-48E2-A4A1-BF2D04FEBAF7').path, 'D8F706A2-EDF5-48E2-A4A1-BF2D04FEBAF7')}>{getStepInfo('D8F706A2-EDF5-48E2-A4A1-BF2D04FEBAF7').Name}</DropdownItem>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*Coverages    */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Coverages
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu'>

                                            {/* Coverage Types Definition   */}
                                            <DropdownItem disabled={!(getPrivilege('C51DDD09-2243-4750-9163-81207AD968AC'))} className="pointer" onClick={() => goToPage(getStepInfo('C51DDD09-2243-4750-9163-81207AD968AC').path, 'C51DDD09-2243-4750-9163-81207AD968AC')}>{getStepInfo('C51DDD09-2243-4750-9163-81207AD968AC').Name}</DropdownItem>

                                            {/* Coverage Group Definition   */}
                                            <DropdownItem disabled={!(getPrivilege('6F9B7D73-0185-49B6-87A6-8B86B522F74F'))} className="pointer" onClick={() => goToPage(getStepInfo('6F9B7D73-0185-49B6-87A6-8B86B522F74F').path, '6F9B7D73-0185-49B6-87A6-8B86B522F74F')}>{getStepInfo('6F9B7D73-0185-49B6-87A6-8B86B522F74F').Name}</DropdownItem>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*Medical Info Definitions    */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Medical Info Definitions
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu'>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*hospital Plan    */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Hospital Plan
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu'>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*Operations O.R   */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Operations O.R
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu'>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*ForFait Procedure   */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            ForFait Procedure
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu'>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*Closing File Defenition   */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Closing File Defenition
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu'>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                                {/*Manage Rates   */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Manage Rates
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu'>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Users
                            </DropdownToggle>
                            <DropdownMenu className='DropdownMenuRightclear'>

                                {/* Users & Groups  */}
                                <Nav className='pointer dropdown-item sub-nav-maincontainer'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle className='DropdownToggle-submenu' nav caret>
                                            Users & Groups
                                        </DropdownToggle>
                                        <div className='nav-arrow'></div>
                                        <DropdownMenu className='DropdownMenu-submenu'>

                                            {/*User Groups Definition*/}
                                            <DropdownItem disabled={!(getPrivilege('37F34B2D-A195-47D2-9262-0A962951F64E'))} className="pointer" onClick={() => goToPage(getStepInfo('37F34B2D-A195-47D2-9262-0A962951F64E').path, '37F34B2D-A195-47D2-9262-0A962951F64E')}>{getStepInfo('37F34B2D-A195-47D2-9262-0A962951F64E').Name}</DropdownItem>

                                            {/*User  Definition*/}
                                            <DropdownItem disabled={!(getPrivilege('2CBDAB48-86AA-4459-AABD-8B675DC0099B'))} className="pointer" onClick={() => goToPage(getStepInfo('2CBDAB48-86AA-4459-AABD-8B675DC0099B').path, '2CBDAB48-86AA-4459-AABD-8B675DC0099B')}>{getStepInfo('2CBDAB48-86AA-4459-AABD-8B675DC0099B').Name}</DropdownItem>

                                            {/* Link Users To Groups   */}
                                            <DropdownItem disabled={!(getPrivilege('41407F5F-77EC-4DA8-B3AE-E9B9BC45975D'))} className="pointer" onClick={() => goToPage(getStepInfo('41407F5F-77EC-4DA8-B3AE-E9B9BC45975D').path, '41407F5F-77EC-4DA8-B3AE-E9B9BC45975D')}>{getStepInfo('41407F5F-77EC-4DA8-B3AE-E9B9BC45975D').Name}</DropdownItem>

                                            {/* Users Privileges  */}
                                            <DropdownItem disabled={!(getPrivilege('ED5246D9-D8A2-4A00-9354-3836AD7482D7'))} className="pointer" onClick={() => goToPage(getStepInfo('ED5246D9-D8A2-4A00-9354-3836AD7482D7').path, 'ED5246D9-D8A2-4A00-9354-3836AD7482D7')}>{getStepInfo('ED5246D9-D8A2-4A00-9354-3836AD7482D7').Name}</DropdownItem>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <i className="fa fa-user fa-lg hidden-sm-down" style={{ marginRight: "1rem" }}></i>
                                {state.loginname}
                                <i className="icon-arrow-down hidden-sm-down" style={{ marginLeft: "1rem" }}></i>
                            </DropdownToggle>
                            <DropdownMenu className='DropdownMenuRightclear'>
                                <DropdownItem className="pointer" onClick={() => goToPage('/profile')}><span><i className="fa fa-user"></i>Profile</span></DropdownItem>
                                <DropdownItem className="pointer" disabled={!(getPrivilege("Settings"))} onClick={() => goToPage('/auth/Settings')}><span><i className="fa fa-cogs"></i>Settings</span></DropdownItem>
                                <DropdownItem className="pointer" onClick={logout}><span><i className="fa fa-lock"></i>Logout</span></DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
            {/* 
            <ul className={`nav navbar-nav ml-auto ${state.mobileMenu ? "mobileMenu" : ""} ${state.mobileMenu ? (state.showMobileMenu ? "show" : "hide") : ""}`}>

                <li className="nav-item px-1">
                    <Dropdown
                        onMouseOver={() => !state.mobileMenu ? onMouseEnter("genHospCodingDropD") : null}
                        onMouseLeave={() => !state.mobileMenu ? onMouseLeave("genHospCodingDropD") : null}
                        toggle={() => !state.mobileMenu ? toggle("genHospCodingDropD") : null}
                        isOpen={state.genHospCodingDropD}
                    >
                        <DropdownToggle className="nav-link drop-down-toggle">
                        </DropdownToggle>
                        <DropdownMenu style={{}} tag="ul">


                        </DropdownMenu>

                    </Dropdown>
                </li>

                <li className="nav-item px-1">
                    <Dropdown
                        onMouseOver={() => !state.mobileMenu ? onMouseEnter("usersDropD") : null}
                        onMouseLeave={() => !state.mobileMenu ? onMouseLeave("usersDropD") : null}
                        toggle={() => !state.mobileMenu ? toggle("usersDropD") : null}
                        isOpen={state.usersDropD}
                    >
                        <DropdownToggle className="nav-link drop-down-toggle">
                        </DropdownToggle>
                        <DropdownMenu style={{}} tag="ul">


                           {To Draw a sub menu}
                            <DropdownItem className="drop-down-item-sub-menu" >
                                <Dropdown direction='right' toggle={() => { }} isOpen >

                                    <DropdownToggle className="drop-down-toggle-sub-menu">
                                        A sub Menu
                                    </DropdownToggle>
                                    <DropdownMenu style={{}} tag="ul">

                                        <DropdownItem disabled={!(getPrivilege('37F34B2D-A195-47D2-9262-0A962951F64E'))} className="pointer" onClick={() => goToPage(getStepInfo('37F34B2D-A195-47D2-9262-0A962951F64E').path, '37F34B2D-A195-47D2-9262-0A962951F64E')}>{getStepInfo('37F34B2D-A195-47D2-9262-0A962951F64E').Name}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </DropdownItem>

                        </DropdownMenu>

                    </Dropdown>
                </li>

                <li className="nav-item px-1">
                    <Dropdown
                        onMouseOver={() => !state.mobileMenu ? onMouseEnter("vendorDropDown") : null}
                        onMouseLeave={() => !state.mobileMenu ? onMouseLeave("vendorDropDown") : null}
                        toggle={() => !state.mobileMenu ? toggle("vendorDropDown") : null}
                        isOpen={state.vendorDropDown}
                    >
                        <DropdownToggle className="nav-link drop-down-toggle" >
                            Vendor
                        </DropdownToggle>
                        <DropdownMenu style={{}} tag="ul">
                            <DropdownItem disabled={!(getPrivilege("VendorCategories"))} className="pointer" onClick={() => navigate('/auth/VendorCategories')}>Categories</DropdownItem>
                            <DropdownItem disabled={!(getPrivilege("VendorsBrands"))} className="pointer" onClick={() => navigate('/auth/VendorsBrands')}>Brands</DropdownItem>
                            <DropdownItem disabled={!(getPrivilege("VendorProductsCategories"))} className="pointer" onClick={() => navigate('/auth/VendorProductsCategories')}>Products Categories</DropdownItem>
                            <DropdownItem disabled={!(getPrivilege("ScannedDocuments"))} className="pointer" onClick={() => goToPage('/auth/ScannedDocuments')}>Scanned Documents</DropdownItem>
                            <DropdownItem disabled={!(getPrivilege("VendorContact"))} className="pointer" onClick={() => goToPage('/auth/VendorContacts')}>Contacts</DropdownItem>
                            <div style={{ height: "2px", backgroundColor: "#3a3a3a" }}></div>
                            <DropdownItem disabled={!(getPrivilege("Vendors"))} className="pointer" onClick={() => goToPage('/auth/Vendors')}>Vendors</DropdownItem>
                            <DropdownItem disabled={!(getPrivilege("PriceLists"))} className="pointer" onClick={() => navigate('/auth/PriceLists')}>Price List</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>

                <li className="nav-item px-1">
                    <Dropdown
                        onMouseOver={() => !state.mobileMenu ? onMouseEnter("purchasingDropDown") : null}
                        onMouseLeave={() => !state.mobileMenu ? onMouseLeave("purchasingDropDown") : null}
                        toggle={() => !state.mobileMenu ? toggle("purchasingDropDown") : null}
                        isOpen={state.purchasingDropDown}
                    >
                        <DropdownToggle className="nav-link drop-down-toggle" >
                            Purchasing
                        </DropdownToggle>
                        <DropdownMenu style={{}} tag="ul">
                            <DropdownItem disabled={!(getPrivilege("TermsAndConditions"))} className="pointer" onClick={() => goToPage('/auth/Purchasing/TermsAndConditions')}>General Terms And Conditions</DropdownItem>
                            <DropdownItem disabled={!(getPrivilege("RfpTypes"))} className="pointer" onClick={() => goToPage('/auth/Purchasing/RfpTypes')}>RFP Types</DropdownItem>
                            <DropdownItem disabled={!(getPrivilege("Rfp"))} className="pointer" onClick={() => goToPage('/auth/Purchasing/Rfp')}>RFP </DropdownItem>
                            <div style={{ height: "1px", backgroundColor: "#3a3a3a" }}></div>
                            <DropdownItem disabled={!(getPrivilege("RfpQuestionsAnswers"))} className="pointer" onClick={() => goToPage('/auth/Purchasing/QA')}>RFP Questions & Answers</DropdownItem>
                            <div style={{ height: "1px", backgroundColor: "#3a3a3a" }}></div>
                            <DropdownItem disabled={!(getPrivilege("Contract"))} className="pointer" onClick={() => goToPage('/auth/Purchasing/Contract')}>Contracts</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>

                <li className="nav-item px-1">
                    <Dropdown>
                        <DropdownToggle className="nav-link drop-down-toggle">
                            <Link to={'/auth/reports'} className="nav-link pointer text-white">Reports</Link>
                        </DropdownToggle>
                    </Dropdown>
                </li>

                <li className="separator hidden-sm-down"></li>

                <li className="nav-item px-1">
                    <Dropdown
                        toggle={!state.mobileMenu ? logintoggle : () => { }}
                        isOpen={state.logindropdownOpen}
                    >
                        <DropdownToggle className="nav-link drop-down-toggle">
                            <i className="fa fa-user fa-lg mr-1 hidden-sm-down"></i>
                            {state.loginname}
                            <i className="icon-arrow-down ml-1 hidden-sm-down"></i>
                        </DropdownToggle>

                        <DropdownMenu className="dropdown-menu-right" style={{}} tag="ul">
                            <DropdownItem className="pointer" onClick={() => goToPage('/profile')}><span><i className="fa fa-user"></i>Profile</span></DropdownItem>
                            <DropdownItem
                                disabled={!(getPrivilege("Settings"))}
                                className="pointer" onClick={() => goToPage('/auth/Settings')}><span><i className="fa fa-cogs"></i>Settings</span></DropdownItem>
                            <DropdownItem className="pointer" onClick={logout}><span><i className="fa fa-lock"></i>Logout</span></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>

            </ul > */}
        </>


    )
}
