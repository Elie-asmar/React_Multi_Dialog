import { cloneDeep, isEmpty } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import AdvancedTable from '../../ReusableComponents/Other/AdvancedTable/AdvancedTable';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import CheckBoxComp from '../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import ContainerComp from '../../ReusableComponents/Other/ContainerComp/ContainerComp';
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import Notification from '../../ReusableComponents/Other/Notification/Notification';
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent';
import TextAreaComp from '../../ReusableComponents/Other/TextAreaComp/TextAreaComp';
import { CalculateTitleHeight, customTableSearch, FetchData, FetchDataMultiple, isRequiredDataEmpty, saveFinished } from '../../utils/functions';
import { MnuBkGImgComp } from '../MenuBackground/MnuBkGImgComp';
import DateTimePickerComp from '../../ReusableComponents/Other/DateTimePickerComp/DateTimePickerComp'
import RadioGroupComp from '../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import scrollIntoView from 'scroll-into-view';
import RTable from '../../ReusableComponents/Other/AdvancedTable/RTable';
import InputPassComp from '../../ReusableComponents/Other/InputPassComp/InputPassComp';
import validator from 'validator'
import { urlPath } from '../../globals';

export function UsersDefinition({ uuid, useInModal, routing, ...props }) {
    const { location, params } = routing;
    const tableRef = useRef(null);
    const rmk = useRef(null)
    const grp = useRef(null)
    const xls = useRef(null)
    const userTypes = useRef([]);
    const usersinAttendance = useRef([]);
    const folios = useRef([]);

    const STATE = {
        mode: '',
        code: "",
        missingcode: false,
        his2code: '',
        missinghis2code: false,
        name: "",
        missingname: false,
        type: '',
        missingtype: false,
        subtype: '',
        missingsubtype: false,
        status: 'A',
        since: '',
        sinceNotValid: false,
        password: '',
        accessWan: 'N',
        linkToAttendace: 'N',
        codeinattendance: [],

        mobile: '',
        signature: '',

        folio: '',
        folioname: '',
        folioaddress: '',
        foliofax: '',
        foliophone1: '',
        foliophone2: '',
        folioemail: '',
        foliormk: '',

        internalemail: '',
        internalemailinvalid: false,
        externalemail: '',
        externalemailinvalid: false,

        groupsData: [],
        filteredgroupsData: [],
        filterlinkedgroups: '',
        allgroupschecked: false,

        exportToExcelPerms: [],
        filteredexportToExcelPerms: [],
        filterexcelpermissions: '',
        allpermissionschecked: false,



        tabid: 1,
        screenWidth: window.innerWidth,


        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['code', 'his2code', 'name', 'subtype', 'type'],

        codeAvailable: true,
        his2codeAvailable: true,
        notifType: "",
        notifTitle: "",
        notifMessage: "",
        notifTime: 2500,
        notifDisplay: '',
        statusDisabeld: true,
        modified: [], //This state is Just to check if the value changed or not 
        shouldBlockNavigation: false,
        privileges: {},

    }
    const [state, setState] = useStateWithCallback(STATE);
    const [initialState, setInitialState] = useState(STATE);
    const { userData, getUserPrivs } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);
    const navigate = useNavigate();


    //#region "Side Effects"
    useEffect(() => {
        if (!userData) {
            return
        }
        if (!useInModal) {

            let priv = getUserPrivs(uuid);
            if (location.pathname.toLocaleLowerCase().includes("/edit")) {
                if (priv?.Modify === 0) {
                    navigate('/UserGroupsDef', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit', privileges: priv } })
                    setInitialState(prv => {
                        return { ...prv, mode: 'Edit', privileges: priv }
                    })

                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/UserGroupsDef', { replace: true })
                }
                else {

                    setState(prv => { return { ...prv, mode: 'Add New', privileges: priv } })
                    setInitialState(prv => { return { ...prv, mode: 'Add New', privileges: priv } })
                    FillData()
                }
            }

        }
    }, [userData])
    useEffect(() => {
        window.addEventListener('resize', getWindowWidth);
        return () => {
            window.removeEventListener('resize', getWindowWidth)
        }

    }, []);
    //#endRegion

    //#region Memoized Callbacks
    const FillData = useCallback(async (id) => {
        if (id) {

        }
        else {
            // let apis = [
            //     { url: 'DataFiles/Forms/UsersDefinition/UserLinkedGroups.json', Type: 'get', params: '', datafilterfunction: null },
            //     { url: 'DataFiles/Forms/UsersDefinition/UserTypes.json', Type: 'get', params: '', datafilterfunction: null },
            //     { url: 'DataFiles/Forms/UsersDefinition/UserExportToExcelDefinitions.json', Type: 'get', params: '', datafilterfunction: null },
            //     { url: 'DataFiles/Forms/LinkUsersToGroups/Users.json', Type: 'get', params: '', datafilterfunction: null },
            //     { url: 'DataFiles/Forms/FolioData.json', Type: 'get', params: '', datafilterfunction: null },
            // ]
            let apis = [
                { url: `${urlPath}/Users/getUserLinkedGroups/`, Type: 'get', params: '', datafilterfunction: null },
                { url: `${urlPath}/Users/getUserTypes/`, Type: 'get', params: '', datafilterfunction: null },
                { url: `${urlPath}/Users/getUserExportToExcel/`, Type: 'get', params: '', datafilterfunction: null },
                { url: `${urlPath}/Users/getUsers/`, Type: 'post', params: '', datafilterfunction: null },
                { url: `${urlPath}/folios/getFolios/`, Type: 'get', params: '', datafilterfunction: null },
            ]

            setisLoading(prv => prv + 1)
            let response = await FetchDataMultiple(apis);


            userTypes.current = cloneDeep(response[1].data);

            usersinAttendance.current = cloneDeep(response[3].data)
            folios.current = cloneDeep(response[4].data)
            let xlsperms = response[2].data.map((e, k) => { return { rowid: k, Permission: e, checked: false } })

            let grpdata = response[0].data.map((e, k) => { return { rowid: k, checked: e.Chk, ...e } })


            setState(prv => {
                return {
                    ...prv,
                    filteredgroupsData: cloneDeep(grpdata),
                    groupsData: cloneDeep(grpdata),
                    exportToExcelPerms: cloneDeep(xlsperms),
                    filteredexportToExcelPerms: cloneDeep(xlsperms)
                }
            })
            setisLoading(prv => prv - 1)
        }
    }, [])

    const isCodeAvailable = useCallback(async (id) => {

        let data = await FetchData('DataFiles/Forms/GroupsDefinition.json', 'get', null,
            id ? (e) => { return e.Grp_Code.toString() === id } : () => false);
        return data.length === 0
    }, [])
    const handleBlur = useCallback(async (value, key) => {
        let changed = {}

        switch (key) {
            case 'internalemail':
                if (value && !validator.isEmail(value)) {
                    changed.internalemailinvalid = true;
                }
                break;
            case 'externalemail':
                if (value && !validator.isEmail(value)) {
                    changed.externalemailinvalid = true;

                }
                break;
            default:
                break;
        }

        if (!isEmpty(changed)) {
            setState(prv => {
                return { ...prv, ...changed }
            })
        }

        // let isAvailable = await isCodeAvailable(value);
        // setState(prv => {
        //     return { ...prv, codeAvailable: isAvailable }

        // })



    }, [])
    const handleChange = useCallback(async (value, key) => {

        let changed = {};
        console.log(key, value)
        switch (key) {
            case 'linkToAttendace':
                changed.codeinattendance = [];
                break;
            case 'type':
                changed.subtype = ''
                break;
            case 'folio':
                let folio = value.split('/');
                let data = folios.current.find(e => e.Fo_serno.toString() === folio[0] && e.Fo_subno.toString() === folio[1]);

                if (data) {

                    changed.folioname = data.Fo_name;
                    changed.folioaddress = data.Fo_addres;
                    changed.folioemail = data.Fo_Email;
                    changed.foliofax = data.Fo_fax;
                    changed.foliophone1 = data.Fo_phone1;
                    changed.foliophone2 = data.Fo_phone2;
                    changed.foliormk = data.Fo_remark;
                }
                else {
                    changed.folioname = '';
                    changed.folioaddress = '';
                    changed.folioemail = '';
                    changed.foliofax = '';
                    changed.foliophone1 = '';
                    changed.foliophone2 = '';
                    changed.foliormk = '';
                }
                break;
            case 'filterexcelpermissions':
                setState(prv => {
                    if (value) {
                        return {
                            ...prv, filterexcelpermissions: value, filteredexportToExcelPerms: customTableSearch(value, prv.exportToExcelPerms)
                        }
                    }
                    else {
                        return {
                            ...prv, filterexcelpermissions: value, filteredexportToExcelPerms: cloneDeep(prv.exportToExcelPerms)
                        }
                    }
                })
                return;

            case 'filterlinkedgroups':
                setState(prv => {
                    if (value) {
                        return {
                            ...prv, filterlinkedgroups: value, filteredgroupsData: customTableSearch(value, prv.groupsData)
                        }
                    }
                    else {
                        return {
                            ...prv, filterlinkedgroups: value, filteredgroupsData: cloneDeep(prv.groupsData)
                        }
                    }
                })
                return;

            default:
                break;
        }
        setState(prv => {
            if (prv.hasOwnProperty(`missing${key}`)) {
                return { ...prv, [key]: value, [`missing${key}`]: false, ...changed }
            }
            else if (prv.hasOwnProperty(`${key}invalid`)) {
                return { ...prv, [key]: value, [`${key}invalid`]: false, ...changed }
            }
            else {
                return { ...prv, [key]: value, ...changed }
            }
        })
    }, [])
    const handleSave = useCallback(async () => {
        let missing = isRequiredDataEmpty(state);


        if (!isEmpty(missing)) {
            setState({ ...state, ...missing },
                (nextState, nextSetState) => {
                    saveFinished(nextState, nextSetState, "error", "Some required fields can't be left empty", "", false)
                })
            return
        }
        else if (!state.codeAvailable) {
            return

        }
        else {
            saveFinished(state, setState, "success", "", "", true, navigate)
        }
    }, [state])
    const ButtonClick = useCallback((id) => {
        switch (id) {
            case 'clear':

                setState({ ...initialState })
                break;
            case 'save':
                handleSave();
                break;
            case 'close':
                navigate(-1);
                break;

        }
    }, [handleSave, initialState])

    const OnRowCheckChange = useCallback((gridname) => (checked, key) => {

        switch (gridname) {
            case 'excel':

                setState(prv => {
                    let arr = cloneDeep(prv.filteredexportToExcelPerms)
                    let arr1 = cloneDeep(prv.exportToExcelPerms)
                    arr1.find(e => e.rowid === key).checked = checked;
                    arr.find(e => e.rowid === key).checked = checked;
                    return {
                        ...prv,
                        filteredexportToExcelPerms: arr,
                        exportToExcelPerms: arr1
                    }
                });
                break;

            case 'groups':
                setState(prv => {
                    let arr = cloneDeep(prv.filteredgroupsData)
                    let arr1 = cloneDeep(prv.groupsData)
                    arr1.find(e => e.rowid === key).checked = checked;
                    arr.find(e => e.rowid === key).checked = checked;
                    return {
                        ...prv,
                        filteredgroupsData: arr,
                        groupsData: arr1
                    }
                });
                break;
            default:
                break;
        }


    }, [])

    const OnCheckAll = useCallback((checked, key) => {

        switch (key) {
            case 'allpermissionschecked':
                setState(prv => {
                    let newdata = prv.filteredexportToExcelPerms.map(e => {
                        return {
                            ...e, checked: checked
                        }
                    })

                    return {
                        ...prv,
                        allpermissionschecked: checked,
                        filteredexportToExcelPerms: newdata,
                        exportToExcelPerms: prv.exportToExcelPerms.map(e => {
                            let item = newdata.find(e1 => e1.rowid === e.rowid)
                            return {
                                ...e, checked: item ? item.checked : e.checked
                            }
                        })
                    }
                });
                break;
            case 'allgroupschecked':

                setState(prv => {
                    let newdata = prv.filteredgroupsData.map(e => {
                        return {
                            ...e, checked: checked
                        }
                    })

                    return {
                        ...prv,
                        allgroupschecked: checked,
                        filteredgroupsData: newdata,
                        groupsData: prv.groupsData.map(e => {
                            let item = newdata.find(e1 => e1.rowid === e.rowid)
                            return {
                                ...e, checked: item ? item.checked : e.checked
                            }
                        })
                    }
                });
                break;
            default:
                break;
        }


    }, [])

    const handleDateTimeChange = useCallback((key, value, isvalid) => {


        if (isvalid) {

        } else {

        }
    }, [])


    const toggle = useCallback((tabid) => (e) => {
        if (tabid === 1) {
            setTimeout(() => {
                scrollIntoView(rmk.current)
            }, (0));
        }
        else if (tabid === 2) {
            setTimeout(() => {
                scrollIntoView(grp.current)
            }, (0));
        }
        else if (tabid === 3) {
            setTimeout(() => {
                scrollIntoView(xls.current)
            }, (0));
        }
        setState(prv => { return { ...prv, tabid: tabid } })
    }, [])
    const getWindowWidth = useCallback(() => {
        setState(prv => {
            return {
                ...prv, screenWidth: window.innerWidth
            }
        })
    }, []);
    //#endRegion

    // #region Memoized Values
    const groupColumns = useMemo(() => {
        const screenWidth = state.screenWidth

        return [
            {
                Header: () => (
                    <div className="checkbox-in-table-header">
                        <CheckBoxComp
                            checked={state.allgroupschecked}
                            onCheckChange={OnCheckAll}
                            name="allgroupschecked"
                            disabled={state.privileges.Add !== 1 || state.privileges.Modify !== 1 || state.privileges.Delete !== 1}
                        />
                        {" "}
                        <div>Check All</div>
                    </div>
                ),
                accessor: '',
                fixed: "left",
                width: 120,
                sortable: false,
                Cell: row => {
                    return (<>
                        <span className="cell-value hidden-mobile text-center">
                            <CheckBoxComp
                                checked={row.original.checked}
                                onCheckChange={OnRowCheckChange('groups')}
                                increaseArea
                                name={row.original.rowid}
                                disabled={state.privileges.Add !== 1 || state.privileges.Modify !== 1 || state.privileges.Delete !== 1}
                            // description={row.original.Grp_Code}
                            />
                        </span>
                        <span className="cell-value hidden-pc">
                            <CheckBoxComp
                                checked={row.original.checked}
                                onCheckChange={OnRowCheckChange('groups')}
                                increaseArea
                                name={row.original.rowid}
                                disabled={state.privileges.Add !== 1 || state.privileges.Modify !== 1 || state.privileges.Delete !== 1}
                            //description={row.original.modulename}
                            />
                        </span>

                    </>)
                },

            },
            {
                Header: 'Group Code',
                accessor: "Grp_Code",
                Cell: row => (
                    <>
                        <span className="mobile-label">{'Group Code'}</span>
                        <span className="cell-value">{row.value}</span>
                    </>
                ),
                width: screenWidth * 0.15,
            },
            {
                Header: 'Group Name',
                accessor: "Grp_Name",
                Cell: row => (
                    <>
                        <span className="mobile-label">{'Group Name'}</span>
                        <span className="cell-value">{row.value}</span>
                    </>
                ),
                width: screenWidth * 0.15,
            }
        ]
    }
        , [state])

    const excelPermissionsColumns = useMemo(() => {
        return [{
            Header: () => (
                <div className="checkbox-in-table-header">
                    <CheckBoxComp
                        checked={state.allpermissionschecked}
                        onCheckChange={OnCheckAll}
                        name="allpermissionschecked"
                        disabled={state.privileges.Add !== 1 || state.privileges.Modify !== 1 || state.privileges.Delete !== 1}
                    />
                    {" "}
                    <div>Check All</div>
                </div>
            ),
            accessor: '',
            fixed: "left",
            Cell: row => {
                return (<>
                    <span className="cell-value hidden-mobile">
                        <CheckBoxComp
                            checked={row.original.checked}
                            onCheckChange={OnRowCheckChange('excel')}
                            increaseArea
                            name={row.original.rowid}
                            disabled={state.privileges.Add !== 1 || state.privileges.Modify !== 1 || state.privileges.Delete !== 1}
                            description={row.original.Permission}
                        />
                    </span>
                    <span className="cell-value hidden-pc">
                        <CheckBoxComp
                            checked={row.original.checked}
                            onCheckChange={OnRowCheckChange('excel')}
                            increaseArea
                            name={row.original.rowid}
                            disabled={state.privileges.Add !== 1 || state.privileges.Modify !== 1 || state.privileges.Delete !== 1}
                            description={row.original.Permission}
                        />
                    </span>

                </>)
            },

        },]

    }, [state])

    const userTypesDropDown = useMemo(() => {
        return cloneDeep(userTypes.current.map(e => { return { value: e.value, label: e.label } }))

    }, [userTypes.current])

    const userSubTypesDropDown = useMemo(() => {
        return userTypes.current?.filter(e => e.value === state.type).flatMap(e => e.subtypes)

    }, [userTypes.current, state.type])

    const userinAttendanceDropDown = useMemo(() => {

        return usersinAttendance.current.map(e => { return { label: e.user_name, value: e.user_code } })

    }, [usersinAttendance.current])

    const foliosDropDown = useMemo(() => {
        return folios.current.map(e => {
            return {
                label: e.Fo_serno.toString() + '/' + e.Fo_subno.toString() + ' ' + e.Fo_name,
                value: e.Fo_serno.toString() + '/' + e.Fo_subno.toString()
            }
        });
    }, [folios.current]);




    // #endRegion

    return (
        <>
            {!useInModal
                &&
                <ButtonsContainer
                    handleButtonClick={ButtonClick}
                    createdBy={state.createdBy}
                    creationDate={state.creationDate}
                    modifiedBy={state.modifiedBy}
                    modifiedDate={state.modifiedDate}
                    hideSaveAsDraft={true}
                />
            }
            <div className="animated fadeIn activeComponent" >
                <Notification
                    type={state.notifType}
                    title={state.notifTitle}
                    message={state.notifMessage}
                    display={state.notifDisplay}
                />
                <div className="row">
                    <div id="UserDefinitionContainer" className="col-md-12 title">Users Definition  - {state.mode} </div>
                </div>
                <div className="row mt-3">
                    <div className='col-12 col-lg-8'>
                        {/* Login User Code; HIS2 User Code */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2 required ">Log in User Code</div>
                            <div className="col-sm-4 col-lg-4 col-xl-5">
                                <InputTextComp
                                    value={state.code}
                                    name="code"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode === "Edit" ? true : false}
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                                {!state.codeAvailable &&
                                    <label className="errorLabel"> Code Already Exists </label>
                                }
                            </div>
                            <div className="col-sm-3 col-lg-3 col-xl-2 required">HIS 2 User Code</div>
                            <div className="col-sm-2 col-lg-2 col-xl-3">
                                <InputTextComp
                                    value={state.his2code}
                                    name="his2code"
                                    maxLength={5}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode === "Edit" ? true : false}
                                    className={`${state.missinghis2code || !state.his2codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                                {!state.his2codeAvailable &&
                                    <label className="errorLabel"> Code Already Exists </label>
                                }
                            </div>
                        </div>
                        {/* Name */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2 required ">Name</div>
                            <div className="col-sm-9 col-lg-9 col-xl-10">
                                <InputTextComp
                                    value={state.name}
                                    name="name"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode === "Edit" ? true : false}
                                    className={`${state.missingname ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                            </div>
                        </div>
                        {/* Status */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2 required ">Status</div>
                            <div className="col-sm-4 col-lg-4 col-xl-5">
                                <RadioGroupComp
                                    name="status"
                                    value={state.status}
                                    radios={[{ value: "A", name: "Active" }, { value: "I", name: "Inactive" }]}
                                    onClick={handleChange}
                                    increaseArea
                                    className={`${state.missingstatus ? "alert-danger" : ""}`}
                                    disabled={false}
                                />
                            </div>
                        </div>
                        {/* Since */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2  ">Since</div>
                            <div className="col-sm-4 col-lg-4 col-xl-5">
                                <DateTimePickerComp
                                    selected={state.since}
                                    onDateTimeChange={handleDateTimeChange}
                                    name="since"
                                    className={`form-control ${state.sinceNotValid ? "alert-danger" : ""}`}
                                    placeholder="--/--/----"
                                    dateSlash
                                />
                                {state.sinceNotValid && <label className="errorLabel">Invalid Date</label>}
                            </div>
                        </div>
                        {/* Password ; Access WAN */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2  ">Password</div>
                            <div className="col-sm-4 col-lg-4 col-xl-5">
                                <InputPassComp
                                    value={state.password}
                                    name="password"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode === "Edit" ? true : false}
                                    removeSpaces
                                />
                            </div>
                            <div className="col-sm-3 col-lg-2 col-xl-2">Access WAN</div>
                            <div className="col-sm-2 col-lg-3 col-xl-3">
                                <RadioGroupComp
                                    name="accessWan"
                                    value={state.accessWan}
                                    radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                                    onClick={handleChange}
                                    increaseArea
                                    disabled={false}
                                    className=""
                                />
                            </div>
                        </div>
                        {/* Link To Attendance */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2">Link To Attendance</div>
                            <div className="col-sm-4 col-lg-4 col-xl-5">
                                <RadioGroupComp
                                    name="linkToAttendace"
                                    value={state.linkToAttendace}
                                    radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                                    onClick={handleChange}
                                    increaseArea
                                    className=""
                                    disabled={false}
                                />
                            </div>
                        </div>
                        {/* User Code In Attendance */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2">User Code In Attendance</div>
                            <div className="col-sm-9 col-lg-9 col-xl-5">
                                <SelectComp
                                    value={state.codeinattendance}
                                    onChange={handleChange}
                                    name="codeinattendance"
                                    options={userinAttendanceDropDown}
                                    clearable
                                    disabled={state.linkToAttendace !== 'Y'}
                                    className=""
                                    multi={true}
                                />
                            </div>
                        </div>
                        {/* Type */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2">Type</div>
                            <div className="col-sm-9 col-lg-9 col-xl-5">
                                <SelectComp
                                    value={state.type}
                                    onChange={handleChange}
                                    name="type"
                                    options={userTypesDropDown}
                                    className={`${state.missingtype ? "alert-danger" : ""}`}
                                    clearable
                                    disabled={userTypesDropDown.length === 0}
                                />
                            </div>
                        </div>
                        {/* SubType */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2">Sub Type</div>
                            <div className="col-sm-9 col-lg-9 col-xl-5">
                                <SelectComp
                                    value={state.subtype}
                                    onChange={handleChange}
                                    name="subtype"
                                    options={userSubTypesDropDown}
                                    className={`${state.missingsubtype ? "alert-danger" : ""}`}
                                    clearable
                                    disabled={userSubTypesDropDown.length === 0}
                                />
                            </div>
                        </div>
                        {/* Mobile */}
                        <div className='row mb-2'>
                            <div className="col-sm-3 col-lg-3 col-xl-2">Mobile</div>
                            <div className="col-sm-9 col-lg-9 col-xl-10">
                                <InputTextComp
                                    value={state.mobile}
                                    name="mobile"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={false}
                                    removeSpaces
                                />
                            </div>
                        </div>

                    </div>

                    {/* Signature area */}
                    <div className='col-12 col-lg-4'>
                        <div className='row mt-1'>
                            <div className="col-11">
                                <MnuBkGImgComp key={1}
                                    moduleName="User's Signature"
                                    name="signature"
                                    skipstyle
                                    modulePrfix={""}
                                    base64img={state.signature}
                                    handleChange={handleChange}
                                />

                            </div>
                        </div>

                    </div>

                </div>
                <div className='row mt-4'>
                    <div className='col-12'>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={state.tabid === 1 ? 'active' : ''} onClick={toggle(1)}>
                                    <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                                        Folio Information
                                    </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={state.tabid === 2 ? 'active' : ''} onClick={toggle(2)}>
                                    <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                                        Linked Groups
                                    </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={state.tabid === 3 ? 'active' : ''} onClick={toggle(3)}>
                                    <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                                        Export to Excel Permissions
                                    </span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={state.tabid}>
                            <TabPane tabId={1}>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        {/* Folio */}
                                        <div className='row mb-2'>
                                            <div className=" col-lg-3 col-xl-2  ">Folio</div>
                                            <div className=" col-lg-4 col-xl-5">
                                                <SelectComp
                                                    value={state.folio}
                                                    onChange={handleChange}
                                                    name="folio"
                                                    options={foliosDropDown}
                                                    className=""
                                                    clearable
                                                    disabled={false}
                                                />
                                            </div>
                                            <div className=" col-lg-2 col-xl-1">Name</div>
                                            <div className=" col-lg-3 col-xl-4">
                                                <InputTextComp
                                                    value={state.folioname}
                                                    name="folioname"
                                                    readOnly
                                                    className=""
                                                    removeSpaces
                                                />
                                            </div>
                                        </div>
                                        {/* Address */}
                                        <div className='row mb-2'>
                                            <div className="col-sm-3 col-lg-3 col-xl-2  ">Address</div>
                                            <div className="col-sm-9 col-lg-9 col-xl-10">
                                                <InputTextComp
                                                    value={state.folioaddress}
                                                    name="folioaddress"
                                                    readOnly
                                                    className=""
                                                    removeSpaces
                                                />
                                            </div>
                                        </div>
                                        {/* Fax */}
                                        <div className='row mb-2'>
                                            <div className="col-sm-3 col-lg-3 col-xl-2  ">Fax</div>
                                            <div className="col-sm-9 col-lg-9 col-xl-10">
                                                <InputTextComp
                                                    value={state.foliofax}
                                                    name="foliofax"
                                                    readOnly
                                                    className=""
                                                    removeSpaces
                                                />
                                            </div>
                                        </div>
                                        {/* Phones */}
                                        <div className='row mb-1'>
                                            <div className="col-sm-3 col-lg-3 col-xl-2   ">Phones</div>
                                            <div className='col-sm-9 col-lg-9 col-xl-10'>
                                                <div className='row'>

                                                    <div className="col-12 col-sm-6 mb-2">

                                                        <InputTextComp
                                                            value={state.foliophone1}
                                                            name="foliophone1"
                                                            readOnly
                                                            className=""
                                                            removeSpaces
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <InputTextComp
                                                            value={state.foliophone2}
                                                            name="foliophone2"
                                                            readOnly
                                                            className=""
                                                            removeSpaces
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        {/* Folio Email */}
                                        <div className='row mb-2'>
                                            <div className="col-sm-3 col-lg-3 col-xl-2  ">Folio Email</div>
                                            <div className="col-sm-9 col-lg-9 col-xl-10">
                                                <InputTextComp
                                                    value={state.folioemail}
                                                    name="folioemail"
                                                    readOnly
                                                    className=""
                                                    removeSpaces
                                                />
                                            </div>
                                        </div>
                                        {/* Verification Email */}
                                        <div className='row mt-4 mb-2' style={{ 'position': 'relative', 'border': 'dashed', 'padding': '6px' }}>
                                            <span style={{ position: 'absolute', top: -20, left: '5px', fontWeight: 'bolder' }}>Verification Email</span>
                                            <div className="col-sm-3 col-lg-3 col-xl-2 mb-2 ">Internal Email</div>
                                            <div className="col-sm-9 col-lg-9 col-xl-10 mb-2">
                                                <InputTextComp
                                                    value={state.internalemail}
                                                    name="internalemail"
                                                    maxLength={200}
                                                    handleOnblur={handleBlur}
                                                    handleChange={handleChange}
                                                    className=""
                                                    removeSpaces
                                                />
                                                {state.internalemailinvalid &&
                                                    <label className="errorLabel">Invalid Email </label>
                                                }
                                            </div>

                                            <div className="col-sm-3 col-lg-3 col-xl-2  ">External Email</div>

                                            <div className="col-sm-9 col-lg-9 col-xl-10">
                                                <InputTextComp
                                                    value={state.externalemail}
                                                    name="externalemail"
                                                    maxLength={200}
                                                    handleOnblur={handleBlur}
                                                    handleChange={handleChange}
                                                    className=""
                                                    removeSpaces
                                                />
                                                {state.externalemailinvalid &&
                                                    <label className="errorLabel"> Invalid Email </label>
                                                }
                                            </div>




                                        </div>

                                        {/* Remarks */}
                                        <div className='row mb-2' ref={rmk} >
                                            <div className="col-sm-3 col-lg-3 col-xl-2   " >Remarks</div>
                                            <div className="col-sm-9 col-lg-9 col-xl-10">
                                                <InputTextComp
                                                    value={state.foliormk}
                                                    name="foliormk"
                                                    readOnly
                                                    className=""
                                                    removeSpaces
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </TabPane>
                            <TabPane tabId={2}>
                                <div className="row mt-1" ref={grp}>
                                    <div className="row mt-1 mb-2">
                                        <div className="col-12 col-sm-6">
                                            <InputTextComp
                                                value={state.filterlinkedgroups}
                                                name="filterlinkedgroups"
                                                placeholder="Search..."
                                                maxLength={50}
                                                handleChange={handleChange}
                                                disabled={false}
                                                removeSpaces
                                            />
                                        </div>


                                    </div>
                                    <div className="col-12">
                                        <RTable
                                            className="-striped mobile-overflow"
                                            data={state.filteredgroupsData}
                                            columns={groupColumns}
                                            style={{ maxHeight: "56vh" }}
                                            minRows={0}
                                            showPaginationBottom={false}
                                            showPaginationTop={false}
                                            defaultPageSize={0}
                                            resizable={false}
                                            defaultSorted={[{ id: "code", asc: true }]}
                                        />
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId={3}>
                                <div className="row mt-1" ref={xls}>
                                    <div className="row mt-1 mb-2">
                                        <div className="col-12 col-sm-6">
                                            <InputTextComp
                                                value={state.filterexcelpermissions}
                                                name="filterexcelpermissions"
                                                placeholder="Search..."
                                                maxLength={50}
                                                handleChange={handleChange}
                                                disabled={false}
                                                removeSpaces
                                            />
                                        </div>


                                    </div>
                                    <div className="col-12">
                                        <RTable
                                            className="-striped mobile-overflow"
                                            data={state.filteredexportToExcelPerms}
                                            columns={excelPermissionsColumns}
                                            style={{ maxHeight: "56vh" }}
                                            minRows={0}
                                            showPaginationBottom={false}
                                            showPaginationTop={false}
                                            defaultPageSize={0}
                                            resizable={false}
                                            defaultSorted={[{ id: "code", asc: true }]}
                                        />
                                    </div>
                                </div>
                            </TabPane>

                        </TabContent>
                    </div>

                </div>


            </div>
        </>
    )
}
