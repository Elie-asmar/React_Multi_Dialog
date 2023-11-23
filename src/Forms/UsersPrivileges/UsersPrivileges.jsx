import { cloneDeep, isEmpty } from 'lodash'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../ContextProvider/AuthContext'
import { LoadingContext } from '../../ContextProvider/LoadingContext'
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback'
import RTable from '../../ReusableComponents/Other/AdvancedTable/RTable'
import { Button } from 'reactstrap'
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer'
import CheckBoxComp from '../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import Notification from '../../ReusableComponents/Other/Notification/Notification'
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent'
import { customTableSearch, FetchDataMultiple } from '../../utils/functions'
import Comp1 from './comp1'
import Comp2 from './comp2'
import { ModalComp } from '../../ReusableComponents/Other/ModalComp/ModalComp'
import { UserPrivilegesDetails } from './UserPrivilegesDetails'


export function UsersPrivileges({ uuid, useInModal, ...props }) {

    const intital_State = useRef({
        usersgroup: '',
        modulesData: [],
        filteredmodulesData: [],
        filtermodules: '',
        allmoduleschecked: false,

        usersData: [],
        filteredusersData: [],
        filterusers: '',
        selecteduser: {},
        alluserschecked: false,
        screenWidth: window.innerWidth,

        usersPrivilegesData: [],

        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        privilegesDisabled: false,
        privilegesOpen: false,

        application: 'HIS-2 / Hospital Information System 2',
        module: 'Main / MAIN MODULE',
        notifType: '',
        notifTitle: '',
        notifMessage: '',
        notifDisplay: ''
    })

    const [state, setState] = useState(intital_State.current)
    const [initialState, setInitialState] = useState(intital_State.current);
    const usersGroups = useRef([]);
    const usersData = useRef([]);
    const modulesData = useRef([]);
    const { userData, getUserPrivs } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);

    const timeout = useRef(null)



    useEffect(() => {
        setState(cloneDeep(intital_State.current))

    }, [])
    useEffect(() => {
        window.addEventListener('resize', getWindowWidth);
        return () => {
            window.removeEventListener('resize', getWindowWidth)
        }

    }, []);
    useEffect(() => {
        if (!userData) {
            return
        }
        if (!useInModal) {

            let priv = getUserPrivs(uuid);

            if (priv?.Modify === 0) {
                Navigate('/', { replace: true })
            }
            else {
                FillData()
                setState(prv => { return { ...prv, mode: 'Edit', privileges: priv } })
                setInitialState(prv => {
                    return { ...prv, mode: 'Edit', privileges: priv }
                })

            }



        }
    }, [userData])

    useEffect(() => {
        let arr = cloneDeep(state.usersData);
        if (state.usersgroup) {
            arr = arr.filter(e => e.usergroup === state.usersgroup)
        }
        if (state.filterusers) {
            arr = customTableSearch(state.filterusers, arr)
        }
        setState(prv => { return { ...prv, filteredusersData: arr } })
    }, [state.usersgroup, state.filterusers])

    useEffect(() => {
        if (state.filteredusersData.filter(e => e.checked).length > 0) {
            setState(prv => { return { ...prv, privilegesDisabled: false } })
        }
        else {
            setState(prv => { return { ...prv, privilegesDisabled: true } })
        }

    }, [state.filteredusersData])



    const ButtonClick = useCallback((id) => {

    }, []);
    const handleChange = useCallback(async (value, key) => {
        let changed = {}
        switch (key) {
            case 'usersgroup':
                setState(prv => { return { ...prv, usersgroup: value } })
                break;
            case 'filtermodules':
                setState(prv => {
                    if (value) {
                        return {
                            ...prv,
                            filtermodules: value,
                            filteredmodulesData: customTableSearch(value, prv.modulesData)
                        }
                    }
                    else {
                        return {
                            ...prv, filtermodules: value, filteredmodulesData: cloneDeep(prv.modulesData)
                        }
                    }
                })
                return;

            case 'filterusers':

                setState(prv => {
                    return { ...prv, filterusers: value }
                });

                return;
            default:
                break;
        }


    }, [])
    const handleBlur = useCallback(async (value, key) => {

    }, [])
    const getWindowWidth = useCallback(() => {
        setState(prv => {
            return {
                ...prv, screenWidth: window.innerWidth
            }
        })
    }, []);
    const OnCheckAll = useCallback((checked, key) => {

        switch (key) {
            case 'alluserschecked':
                setState(prv => {
                    let newdata = prv.filteredusersData.map(e => {
                        return {
                            ...e, checked: checked
                        }
                    })

                    return {
                        ...prv,
                        alluserschecked: checked,
                        filteredusersData: newdata,
                        usersData: prv.usersData.map(e => {
                            let item = newdata.find(e1 => e1.rowid === e.rowid)
                            return {
                                ...e, checked: item ? item.checked : e.checked
                            }
                        })
                    }
                });
                break;


            case 'allmoduleschecked':
                setState(prv => {
                    let newdata = prv.filteredmodulesData.map(e => {
                        return {
                            ...e, checked: checked
                        }
                    })

                    return {
                        ...prv,
                        allmoduleschecked: checked,
                        filteredmodulesData: newdata,
                        modulesData: prv.modulesData.map(e => {
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
    const OnRowCheckChange = useCallback((gridname, colName) => (checked, key) => {

        switch (gridname) {
            case 'modules':

                setState(prv => {
                    let arr = cloneDeep(prv.filteredmodulesData)
                    let arr1 = cloneDeep(prv.modulesData)
                    arr1.find(e => e.rowid === key)[colName] = checked;
                    arr.find(e => e.rowid === key)[colName] = checked;
                    return {
                        ...prv,
                        filteredmodulesData: arr,
                        modulesData: arr1
                    }
                });
                break;

            case 'users':
                setState(prv => {
                    let arr = []
                    let arr1 = []
                    if (colName === 'isselected') {
                        arr = prv.filteredusersData.map(e => { return { ...e, isselected: false } })
                        arr1 = prv.usersData.map(e => { return { ...e, isselected: false } })
                    }
                    else {
                        arr = cloneDeep(prv.filteredusersData)
                        arr1 = cloneDeep(prv.usersData)
                    }
                    arr1.find(e => e.rowid === key)[colName] = checked;
                    arr.find(e => e.rowid === key)[colName] = checked;

                    return {
                        ...prv,
                        filteredusersData: arr,
                        usersData: arr1
                    }
                });
                break;
            default:
                break;
        }


    }, [])
    const FillData = useCallback(async () => {

        let apis = [
            { url: 'DataFiles/Forms/UsersDefinition/UsersData.json', Type: 'get', params: '', datafilterfunction: null },
            { url: 'DataFiles/Forms/UserPrivileges/modules.json', Type: 'get', params: '', datafilterfunction: null },
            { url: 'DataFiles/Forms/LinkUsersToGroups/Groups.json', Type: 'get', params: '', datafilterfunction: null },
        ]

        setisLoading(prv => prv + 1)
        let response = await FetchDataMultiple(apis);
        usersGroups.current = response[2].data.map((e, k) => { return { label: e.Grp_Name, value: e.Grp_Code } })

        usersData.current = response[0].data.map((e, k) => { return { rowid: k, usercode: e.user_code, username: e.user_name, checked: false, usergroup: e.user_group, isselected: false } })
        modulesData.current = response[1].data.map((e, k) => { return { rowid: k, modulecode: e.ModCode, modulename: e.Module } })

        setState(prv => {
            return {
                ...prv,
                usersgroup: '',

                filteredmodulesData: cloneDeep(modulesData.current),
                modulesData: cloneDeep(modulesData.current),

                filteredusersData: cloneDeep(usersData.current),
                usersData: cloneDeep(usersData.current)
            }
        })
        setisLoading(prv => prv - 1)

    }, [])

    const toggleModal = useCallback(() => {
        setState(prv => { return { ...prv, privilegesOpen: !prv.privilegesOpen } })
    }, [])

    const setusersPrivilegesData = useCallback((data) => {

        // setState(prv => {
        //     return {
        //         ...prv,
        //         usersPrivilegesData: cloneDeep(data)
        //     }
        // })
    }, [])

    const onSaveClick = useCallback((data) => {

    }, [])
    const onCloseClick = useCallback(() => {
        setState(prv => { return { ...prv, privilegesOpen: false } })
    }, [])

    const moduleColumns = useMemo(() => {
        const screenWidth = document.getElementById('tbl_modules')?.clientWidth
        return [
            {
                Header: () => (
                    <div className="checkbox-in-table-header ">

                        <CheckBoxComp
                            checked={state.allmoduleschecked}
                            onCheckChange={OnCheckAll}
                            name="allmoduleschecked"
                            disabled={false}
                        />
                        {" "}
                        <div>Check All</div>
                    </div>
                ),
                accessor: '',
                fixed: "left",
                width: screenWidth * 0.99,
                sortable: false,
                Cell: row => {
                    return (<>
                        <span className="cell-value hidden-mobile ">
                            <CheckBoxComp
                                checked={row.original.checked}
                                onCheckChange={OnRowCheckChange('modules', 'checked')}
                                increaseArea
                                name={row.original.rowid}
                                disabled={false}
                                description={row.original.modulename}
                            />
                        </span>
                        <span className="cell-value hidden-pc">
                            <CheckBoxComp
                                checked={row.original.checked}
                                onCheckChange={OnRowCheckChange('modules', 'checked')}
                                increaseArea
                                name={row.original.rowid}
                                disabled={false}
                                description={row.original.modulename}
                            />
                        </span>

                    </>)
                },

            }

        ]

    }, [state])

    const usersColumns = useMemo(() => {
        const screenWidth = document.getElementById('tbl_users')?.clientWidth

        return [
            {
                Header: () => (
                    <div className="checkbox-in-table-header ">
                        <CheckBoxComp
                            checked={state.alluserschecked}
                            onCheckChange={OnCheckAll}
                            name="alluserschecked"
                            disabled={false}
                        />
                    </div>
                ),
                accessor: '',
                fixed: "left",
                width: screenWidth * 0.05,
                sortable: false,
                Cell: row => {
                    return (<>
                        <span className="cell-value hidden-mobile ">
                            <CheckBoxComp
                                checked={row.original.checked}
                                onCheckChange={OnRowCheckChange('users', 'checked')}
                                increaseArea
                                name={row.original.rowid}
                                disabled={false}

                            />
                        </span>
                        <span className="cell-value hidden-pc">
                            <CheckBoxComp
                                checked={row.original.checked}
                                onCheckChange={OnRowCheckChange('users', 'checked')}
                                increaseArea
                                name={row.original.rowid}
                                disabled={false}

                            />
                        </span>

                    </>)
                },

            },
            {
                Header: 'User Code',
                accessor: 'usercode',
                fixed: "left",
                width: screenWidth * 0.25,
                sortable: false,
                Cell: row => {
                    return (
                        <>
                            <span className="mobile-label">User Code</span>
                            <span className="cell-value">{row.value}</span>
                        </>
                    )
                },

            },
            {
                Header: 'User Name',
                accessor: 'username',
                fixed: "left",
                width: screenWidth * 0.55,
                sortable: false,
                Cell: row => {
                    return (
                        <>
                            <span className="mobile-label">User Name</span>
                            <span className="cell-value">{row.value}</span>
                        </>
                    )
                },

            },
            {
                Header: 'Selected',
                accessor: 'isselected',

                width: screenWidth * 0.15,
                sortable: false,
                Cell: row => {
                    return (<>
                        <span className="cell-value hidden-mobile ">
                            <CheckBoxComp
                                checked={row.original.isselected}
                                onCheckChange={OnRowCheckChange('users', 'isselected')}
                                increaseArea
                                name={row.original.rowid}
                                disabled={false}

                            />
                        </span>
                        <span className="cell-value hidden-pc">
                            <CheckBoxComp
                                checked={row.original.isselected}
                                onCheckChange={OnRowCheckChange('users', 'isselected')}
                                increaseArea
                                name={row.original.rowid}
                                disabled={false}
                                description='Selected'

                            />
                        </span>

                    </>)
                },

            },

        ]

    }, [state])

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
                    hideSave
                    hideClear
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
                    <div id="UserDefinitionContainer" className="col-md-12 title">Users Privileges</div>
                    <div className="row mt-3">
                        <div className='col-12 col-lg-8'>
                            <div className='row mb-2'>
                                <div className="col-sm-3 col-lg-3 col-xl-2  ">User Group</div>
                                <div className="col-sm-9 col-lg-6 col-xl-6">
                                    <SelectComp
                                        value={state.usersgroup}
                                        onChange={handleChange}
                                        name="usersgroup"
                                        options={usersGroups.current}
                                        clearable
                                        disabled={false}
                                        className=""
                                        multi={false}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className='col-12 col-lg-8'>
                            <div className='row mb-2'>
                                <div className="col-sm-3 col-lg-3 col-xl-2  ">Application</div>
                                <div className="col-sm-9 col-lg-6 col-xl-6">
                                    <InputTextComp
                                        value={state.application}
                                        name="application"
                                        handleOnblur={handleBlur}
                                        handleChange={handleChange}
                                        disabled={true}
                                        removeSpaces
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className='col-12 col-lg-8'>
                            <div className='row mb-2'>
                                <div className="col-sm-3 col-lg-3 col-xl-2  ">Module</div>
                                <div className="col-sm-9 col-lg-6 col-xl-6">
                                    <InputTextComp
                                        value={state.module}
                                        name="module"
                                        handleOnblur={handleBlur}
                                        handleChange={handleChange}
                                        disabled={true}
                                        removeSpaces
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-9 col-lg-6 col-xl-6">
                            <Button
                                disabled={state.privilegesDisabled}
                                color="primary" onClick={toggleModal}>Apply on Privileges</Button>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className='col-12 col-lg-6'>
                            <div className="row mt-1 mb-2">
                                <div className="col-12">
                                    <InputTextComp
                                        value={state.filtermodules}
                                        name="filtermodules"
                                        placeholder="Search modules..."
                                        maxLength={50}
                                        handleChange={handleChange}
                                        disabled={false}
                                        removeSpaces
                                    />
                                </div>
                            </div>
                            <div id="tbl_modules" className="col-12  ">
                                <RTable
                                    className=" -striped mobile-overflow"
                                    data={state.filteredmodulesData}
                                    columns={moduleColumns}
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
                        <div className='col-12 col-lg-6'>
                            <div className="row mt-1 mb-2">
                                <div className="col-12">
                                    <InputTextComp
                                        value={state.filterusers}
                                        name="filterusers"
                                        placeholder="Search users..."
                                        maxLength={50}
                                        handleChange={handleChange}
                                        disabled={false}
                                        removeSpaces
                                    />
                                </div>
                            </div>
                            <div id="tbl_users" className="col-12  table-header-to-left">
                                <RTable
                                    className="-striped mobile-overflow"
                                    data={state.filteredusersData}
                                    columns={usersColumns}
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


                    </div>

                    <div className="row mt-2">
                        <ModalComp
                            className="modal-xl allowBootstrapHeader"
                            modal={state.privilegesOpen}
                            onClose={onCloseClick}
                            onCloseText="Cancel"
                            onAccept={onSaveClick}
                            onAcceptText="Save"
                            onRefused={onCloseClick}
                            onRefusedText="Undo"
                            modalBody={<UserPrivilegesDetails
                                data={{
                                    selecteduser: { ...state.selecteduser },
                                    selectedmodules: cloneDeep(state.filteredmodulesData)
                                }}
                                setusersPrivilegesData={setusersPrivilegesData} />}
                            modalTitle={
                                <>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <span>Privileges...</span>
                                        </div>
                                    </div>
                                </>
                            }
                        />

                    </div>


                </div>



            </div>
        </>
    )
}
