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
import TextAreaComp from '../../ReusableComponents/Other/TextAreaComp/TextAreaComp';
import { CalculateTitleHeight, FetchData, isRequiredDataEmpty, saveFinished } from '../../utils/functions';

export function UserGroupsDefinition({ uuid, useInModal, routing, ...props }) {
    const { location, params } = routing;
    const tableRef = useRef(null);

    const STATE = {
        mode: '',
        code: "",
        missingcode: false,
        desc: "",
        missingdesc: false,
        exportToExcelList: ["Main", "Admission", "Residence", "Laboratory", "Radiology", "General_Exams",
            "Operations", "Doctors", "Pharmacy", "Externals", "Invoicing", "Collection",
            "Accounting", "Cashiers", "Statistics", "Floor_Request", "Medical_Committee",
            "Export_Data", "Lab_Results", "Rad_Results", "Med_Records",
            "Blood_Bank", "ORM", "Workflow", "OR", "Ext_Clinics",
            "Oncology", "Diet", "Special"],
        exportToExcelPerms: [],


        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['code', 'desc'],

        codeAvailable: true,
        notifType: "",
        notifTitle: "",
        notifMessage: "",
        notifTime: 2500,
        notifDisplay: '',
        statusDisabeld: true,
        modified: [], //This state is Just to check if the value changed or not 
        shouldBlockNavigation: false,
        privileges: {},
        allchecked: false
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
                }
            }

        }
    }, [userData])
    //#endRegion

    //#region Memoized Callbacks
    const FillData = useCallback(async (id) => {
        if (id) {
            setisLoading(prv => prv + 1)
            let data = await FetchData('DataFiles/Forms/GroupsDefinition.json', 'get', null,
                (e) => { return e.Grp_Code.toString() === id.toString() });
            setisLoading(prv => prv - 1)

            if (data && data.length > 0) {

                let o = {
                    code: data[0].Grp_Code ? data[0].Grp_Code.toString() : '',
                    desc: data[0].Grp_Name,
                    createdBy: '',
                    creationDate: '',
                    modifiedBy: data[0].Grp_Ustmp,
                    modifiedDate: data[0].Grp_Dstmp,
                    exportToExcelPerms: STATE.exportToExcelList.map((v, k) => {
                        let e = data[0][`${v}`]
                        return {
                            modulename: v, modulepermission: e.toLowerCase() === 'y'
                        }
                    }),
                }

                setState(prv => {
                    return { ...prv, ...cloneDeep(o) }
                })
                setInitialState(prv => {
                    return { ...prv, ...cloneDeep(o) }
                })


            }
        }
    }, [])



    const isCodeAvailable = useCallback(async (id) => {

        let data = await FetchData('DataFiles/Forms/GroupsDefinition.json', 'get', null,
            id ? (e) => { return e.Grp_Code.toString() === id } : () => false);
        return data.length === 0
    }, [])
    const handleBlur = useCallback(async (value, key) => {
        let isAvailable = await isCodeAvailable(value);
        setState(prv => {
            return { ...prv, codeAvailable: isAvailable }

        })



    }, [])
    const handleChange = useCallback(async (value, key) => {
        setState(prv => {
            if (prv.hasOwnProperty(`missing${key}`)) {
                return { ...prv, [key]: value, [`missing${key}`]: false }
            }
            else {
                return { ...prv, [key]: value }
            }
        })
    }, [])
    const handleSave = useCallback(async () => {
        let missing = isRequiredDataEmpty(state);
        // console.log('state', state)

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
                // console.log({ initialState });
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

    const OnCheckChange = useCallback((checked, key) => {
        setState(prv => {
            let arr = prv.exportToExcelPerms;
            let elem = arr.find(e => e.modulename === key);
            elem.modulepermission = !elem.modulepermission;
            return { ...prv, exportToExcelPerms: arr }

        })

    }, [])

    const OnCheckAll = useCallback((checked, key) => {
        setState(prv => {
            let fltr = tableRef.current.state.dataArrayFiltered;
            console.log('fltr', tableRef.current.state.dataArrayFiltered)
            console.log('prv', prv.exportToExcelPerms)
            let arr = prv.exportToExcelPerms.map(e => {
                if (fltr.findIndex(e1 => e1.modulename === e.modulename) > -1) {
                    return { ...e, modulepermission: checked }
                }
                else {
                    return { ...e }
                }
            })
            return { ...prv, exportToExcelPerms: [...arr], allchecked: checked }
        })

    }, [])

    const afterdataFilter = useCallback(() => {
        let fltr = tableRef.current.state.dataArrayFiltered;
        console.log('Hooking into the afterdatafilter of advanced table')

    }
        , []);
    //#endRegion

    const columns = useMemo(() => {

        return [
            {
                Header: () => (
                    <div className="checkbox-in-table-header">
                        <CheckBoxComp
                            checked={state.allchecked}
                            onCheckChange={OnCheckAll}
                            name="add"
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
                                checked={row.original.modulepermission}
                                onCheckChange={OnCheckChange}
                                increaseArea
                                name={row.original.modulename}
                                disabled={state.privileges.Add !== 1 || state.privileges.Modify !== 1 || state.privileges.Delete !== 1}
                                description={row.original.modulename}
                            />
                        </span>
                        <span className="cell-value hidden-pc">
                            <CheckBoxComp
                                checked={row.original.modulepermission}
                                onCheckChange={OnCheckChange}
                                increaseArea
                                name={row.original.modulename}
                                disabled={state.privileges.Add !== 1 || state.privileges.Modify !== 1 || state.privileges.Delete !== 1}
                                description={row.original.modulename}
                            />
                        </span>

                    </>)



                },

            }
        ]
    }
        , [state])


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
                    <div id="UserGroupsListContainer" className="col-md-12 title">User Groups Definition  - {state.mode} </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-xl-2 col-sm-3 required"> Code</div>
                            <div className="col-xl-2 col-sm-6">
                                <InputTextComp
                                    value={state.code}
                                    name="code"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={false}
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />

                                {!state.codeAvailable &&
                                    <label className="errorLabel"> Code Already Exists </label>
                                }
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-xl-2 col-sm-3 required"> Description</div>
                            <div className="col-xl-4 col-sm-9">
                                <TextAreaComp
                                    value={state.desc}
                                    name="desc"
                                    onChange={handleChange}
                                    maxLength={1000}
                                    style={{ minHeight: "100px" }}
                                    className={`${state.missingdesc ? "alert-danger" : ""}`}
                                    disabled={false}

                                />
                            </div>
                        </div>

                        <div className="row mt-1">
                            <div className="col-12 col-lg-6">
                                <ContainerComp
                                    containerHeader='Export to Excel Permissions'
                                    containerBody={
                                        <AdvancedTable
                                            ref={tableRef}
                                            maxHeight='400px'
                                            dataArray={state.exportToExcelPerms}
                                            columns={columns}
                                            enableSearch
                                            defaultSorted={[{ id: "Grp_Code", desc: true }]}
                                            singleFilter
                                            showPagination={false}
                                            afterdataFilter={afterdataFilter}
                                        />
                                    }
                                    addPlus={false}
                                    name=""
                                    onClickPlus={() => { }}
                                />

                            </div>
                        </div>





                    </div>

                </div>
            </div>
        </>
    )
}
