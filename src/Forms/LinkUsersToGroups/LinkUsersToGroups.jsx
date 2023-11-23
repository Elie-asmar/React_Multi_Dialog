import { cloneDeep, isEmpty, isEqual } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import RTable from '../../ReusableComponents/Other/AdvancedTable/RTable';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import CheckBoxComp from '../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import Notification from '../../ReusableComponents/Other/Notification/Notification';
import RadioGroupComp from '../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp';
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent';
import { ColoringStatusLikeLegends, customTableSearch, FetchData, isRequiredDataEmpty, saveFinished } from '../../utils/functions';


export function LinkUsersToGroups({ uuid, useInModal, ...props }) {
    const STATE = {
        userorgroup: 'U',
        user_group_selected_value: '',
        missinguser_group_selected_value: false,
        selectoptions: [],
        filtertext: '',
        checkAll: false,
        datatable: [],
        initialdata: [],
        filterdatatable: [],
        screenWidth: window.innerWidth,
        mandatory: ['user_group_selected_value'],

    }

    const [state, setState] = useStateWithCallback(STATE);
    const [initialState, setInitialState] = useState(STATE);
    const { userData, getUserPrivs } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);
    const navigate = useNavigate();
    const usersList = useRef([]);
    const groupsList = useRef([]);

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

            if (priv?.Modify === 0 && priv?.Add === 0) {
                navigate('/', { replace: true })
            }
            else {
                FillData()

            }

        }
    }, [userData])

    const getWindowWidth = useCallback(() => {
        setState(prv => {
            return {
                ...prv, screenWidth: window.innerWidth
            }
        })
    }, []);

    const FillData = useCallback(async (id) => {
        try {
            setisLoading(prv => prv + 1);
            let lstusers = await FetchData('DataFiles/Forms/LinkUsersToGroups/Users.json', 'get')
            let lstgroups = await FetchData('DataFiles/Forms/LinkUsersToGroups/Groups.json', 'get')
            if (lstusers.length > 0) {
                usersList.current = cloneDeep(lstusers);
            }
            if (lstgroups.length > 0) {
                groupsList.current = cloneDeep(lstgroups);
            }
            if (state.userorgroup === 'U') {
                setState(prv => {
                    return { ...prv, selectoptions: usersList.current.map(v => { return { value: v.user_code, label: v.User_Name } }) }
                })

                setInitialState(prv => {
                    return { ...prv, selectoptions: usersList.current.map(v => { return { value: v.user_code, label: v.User_Name } }) }
                })
            }
            else if (state.userorgroup === 'G') {
                setState(prv => {
                    return { ...prv, selectoptions: groupsList.current.map(v => { return { value: v.Grp_Code, label: v.Grp_Name } }) }
                })
                setInitialState(prv => {
                    return { ...prv, selectoptions: groupsList.current.map(v => { return { value: v.Grp_Code, label: v.Grp_Name } }) }
                })
            }
        }
        catch (error) {
            throw error
        }
        finally {
            setisLoading(prv => prv - 1)
        }

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
        else {
            if (isEqual(state.datatable, state.initialdata)) {
                saveFinished(state, setState, "", "No Changes To Save", "")
                return
            }
            else {
                saveFinished(state, setState, "success", "", "", true, navigate)
            }


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
                navigate(-1)

                break;

        }
    }, [handleSave])
    const handleChange = useCallback(async (value, key, rowid) => {
        switch (key) {
            case 'userorgroup':

                setState(prv => {

                    if (value === 'U') {
                        return {
                            ...prv, userorgroup: value, user_group_selected_value: '', datatable: [], initialdata: [], filterdatatable: [], filtertext: '', missinguser_group_selected_value: false,
                            selectoptions: usersList.current.map(v => { return { value: v.user_code, label: v.User_Name } })
                        }
                    }
                    else if (value === 'G') {
                        return {
                            ...prv, userorgroup: value, user_group_selected_value: '', datatable: [], initialdata: [], filterdatatable: [], filtertext: '', missinguser_group_selected_value: false,
                            selectoptions: groupsList.current.map(v => { return { value: v.Grp_Code, label: v.Grp_Name } })
                        }
                    }

                })



                break;
            case 'user_group_selected_value':
                let datatable = [];

                if (state.userorgroup === 'U') {
                    datatable = groupsList.current.map((e, k) => {
                        return {
                            rowid: k,
                            checked: usersList.current.findIndex(e1 => e1.User_Group === e.Grp_Code && e1.user_code === value) > -1,
                            code: e.Grp_Code,
                            name: e.Grp_Name
                        }
                    })
                }
                else if (state.userorgroup === 'G') {
                    datatable = usersList.current.map((e, k) => {
                        return {
                            rowid: k,
                            checked: e.User_Group === value,
                            code: e.user_code,
                            name: e.User_Name,
                            status: e.User_Status
                        }

                    })
                }
                else {
                    datatable = []
                }
                setState(prv => {
                    return {
                        ...prv,
                        user_group_selected_value: value, datatable, filterdatatable: cloneDeep(datatable), initialdata: cloneDeep(datatable)
                    }
                })
                break;
            case 'filtertext':
                setState(prv => {
                    if (value) {
                        return {
                            ...prv, filtertext: value,
                            filterdatatable: customTableSearch(value, prv.datatable)
                        }
                    }
                    else {
                        return {
                            ...prv, filtertext: value,
                            filterdatatable: cloneDeep(prv.datatable)
                        }
                    }
                });
                break;
            case 'checkAll':
                setState(prv => {
                    let newdata = prv.filterdatatable.map(e => {
                        return {
                            ...e, checked: value
                        }
                    })

                    return {
                        ...prv,
                        checkAll: value,
                        filterdatatable: newdata,
                        datatable: prv.datatable.map(e => {
                            return {
                                ...e, checked: newdata.find(e1 => e1.rowid === e.rowid)?.checked || e.checked
                            }
                        })
                    }
                });
                // return { ...prv, user_group_selected_value: value }
                break;
            case 'checkcolumn':
                setState(prv => {
                    let arr = cloneDeep(prv.filterdatatable)
                    let arr1 = cloneDeep(prv.datatable)

                    arr1.find(e => e.rowid === rowid).checked = value;
                    arr.find(e => e.rowid === rowid).checked = value;


                    return {
                        ...prv,
                        filterdatatable: arr,
                        datatable: arr1
                    }
                });
                break;
        }
    }, [state.userorgroup])


    const columns = useMemo(() => {
        const screenWidth = state.screenWidth
        let priv = getUserPrivs(uuid);

        let Cols = [
            {

                Header: () => (
                    <div className="checkbox-in-table-header">
                        <CheckBoxComp
                            checked={state.checkAll}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="checkAll"
                            disabled={priv?.Add !== 1 && priv?.Modify !== 1 && priv?.Delete !== 1}

                        />
                        {" "}
                        <div>Print</div>
                    </div>
                ),
                accessor: 'checked',
                Cell: row => (<>
                    <span className="cell-value hidden-mobile text-center">
                        <CheckBoxComp
                            checked={row.value === true}
                            onCheckChange={(checked, key) =>
                                handleChange(checked, key, row.original.rowid)
                            }
                            increaseArea
                            name="checkcolumn"
                            disabled={priv?.Add !== 1 && priv?.Modify !== 1 && priv?.Delete !== 1}
                        />
                    </span>
                    <span className="col-4">
                        <span className="mobile-label"></span>

                        <span className="cell-value hidden-pc">
                            <CheckBoxComp
                                checked={row.value === true}
                                onCheckChange={(checked, key) =>
                                    handleChange(checked, key, row.original.rowid)
                                }
                                increaseArea
                                name="checkcolumn"
                                disabled={priv?.Add !== 1 && priv?.Modify !== 1 && priv?.Delete !== 1}
                            />
                        </span>
                    </span>

                </>),
                width: screenWidth * 0.1,
                sortable: false
            },
            {
                Header: state.userorgroup === 'U' ? 'Group Code' : 'User Code',
                accessor: "code",
                Cell: row => (
                    <>
                        <span className="mobile-label">{state.userorgroup === 'U' ? 'Group Code' : 'User Code'}</span>
                        <span className="cell-value">{row.value}</span>
                    </>
                ),
                width: screenWidth * 0.15,
            },
            {
                Header: state.userorgroup === 'U' ? 'Group Name' : 'User Name',
                accessor: "name",
                Cell: row => (
                    <>
                        <span className="mobile-label">{state.userorgroup === 'U' ? 'Group Name' : 'User Name'}</span>
                        <span className="cell-value">{row.value}</span>
                    </>
                ),
                width: screenWidth * 0.25,
            },


        ]
        if (state.userorgroup === 'G') {
            Cols.push({
                Header: 'Status',
                accessor: "status",
                Cell: row => (
                    <>
                        <span className="mobile-label">Status</span>
                        <span className="cell-value">{ColoringStatusLikeLegends(row.value === 'A' ? 'Active' : 'Inactive')}</span>
                    </>
                ),
                width: screenWidth * 0.1,
            })
        }


        return Cols



    }, [state, userData])


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
                    <div className="col-md-12 title">Link Users To Groups </div>
                </div>
                <div className="row mt-1">
                    <div className=" col-3 col-sm-5 col-md-4 col-xl-2 ">Filtrate By</div>
                    <div className=" col-9 col-sm-5 col-md-4 col-xl-3">

                        <RadioGroupComp
                            name="userorgroup"
                            value={state.userorgroup}
                            radios={[{ value: "U", name: "User" }, { value: "G", name: "Group" }]}
                            onClick={handleChange}
                            increaseArea
                            disabled={false}
                        />
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-12 col-sm-6 ">
                        <SelectComp
                            placeholder={`${state.userorgroup === 'U' ? 'Select User...' : 'Select Group...'}`}
                            value={state.user_group_selected_value}
                            onChange={handleChange}
                            name="user_group_selected_value"
                            // onFocus={onFocus}
                            options={state.selectoptions}
                            clearable
                            className={`${state.missinguser_group_selected_value ? "alert-danger" : ""}`}
                        />
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-12 col-sm-6">
                        <InputTextComp
                            value={state.filtertext}
                            name="filtertext"
                            placeholder="Search..."
                            maxLength={20}
                            handleChange={handleChange}
                            disabled={false}
                            removeSpaces
                        />
                    </div>


                </div>

                <div className="row mt-1">
                    <div className="col-12">


                        <RTable
                            className="-striped mobile-overflow"
                            data={state.filterdatatable}
                            columns={columns}
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
        </>
    )
}
