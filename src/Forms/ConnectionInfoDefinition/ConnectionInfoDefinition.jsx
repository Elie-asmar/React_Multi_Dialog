import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import { FetchData, isRequiredDataEmpty, saveFinished, SetMandatoryFields } from '../../utils/functions';
import Notification from '../../ReusableComponents/Other/Notification/Notification'
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import TextAreaComp from '../../ReusableComponents/Other/TextAreaComp/TextAreaComp';
import RadioGroupComp from '../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import { isEmpty } from 'lodash';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent';
import InputPassComp from '../../ReusableComponents/Other/InputPassComp/InputPassComp';
export function ConnectionInfoDefinition({ uuid, useInModal, routing, ...props }) {


    const { location, params } = routing;


    const STATE = {
        mode: '',
        dbcode: "",
        missingdbcode: false,
        servername: "",
        missingservername: false,
        dbname: "",
        missingdbname: false,
        password: "",
        missingpassword: false,
        cpassword: "",
        missingcpassword: false,
        passwordmismatch: false,
        authType: "",
        missingauthType: false,
        dbaccess: "",
        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['dbcode', 'servername', 'dbname', 'password', 'cpassword', 'authType'],

        databasecodeOptions: [],
        authenticationOptions: [],



        codeAvailable: true,
        notifType: "",
        notifTitle: "",
        notifMessage: "",
        notifTime: 2500,
        notifDisplay: '',
        statusDisabeld: true,
        modified: [], //This state is Just to check if the value changed or not 
        shouldBlockNavigation: false,
        privileges: {}
    }
    const [state, setState] = useStateWithCallback(STATE);
    const [initialState, setInitialState] = useState(STATE);
    const { userData, getUserPrivs } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);
    const navigate = useNavigate();



    //useInModal, state: editid, mode,

    //#region Side Effects
    useEffect(() => {
        if (!userData) {
            return
        }
        if (!useInModal) {
            let priv = getUserPrivs(uuid);
            if (location.pathname.toLocaleLowerCase().includes("/edit")) {
                if (priv?.Modify === 0) {
                    navigate('/ConnInfoDef', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit' } })
                    setInitialState(prv => { return { ...prv, mode: 'Edit' } })
                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/ConnInfoDef', { replace: true })
                }
                else {
                    setState(prv => { return { ...prv, mode: 'Add New' } })
                    setInitialState(prv => { return { ...prv, mode: 'Add New' } })
                    FillData()

                }
            }

        }
    }, [userData])



    //#endRegion

    //#region Memoized Callbacks
    const FillData = useCallback(async (id) => {
        try {
            setisLoading(prv => prv + 1);
            let databasecodeOptions = await FetchData('DataFiles/Forms/ConnectionInfoDefinition/ConnectionInfoAvailableDB.json', 'get')
            if (databasecodeOptions.length > 0) {
                databasecodeOptions = databasecodeOptions.map(e => { return { label: e, value: e } })
            }
            let authenticationOptions = await FetchData('DataFiles/Forms/ConnectionInfoDefinition/ConnectionInfoAuthenticationOptions.json', 'get')
            setState(prv => {
                return { ...prv, databasecodeOptions: [...databasecodeOptions], authenticationOptions: [...authenticationOptions] }
            })
            setInitialState(prv => {
                return { ...prv, databasecodeOptions: [...databasecodeOptions], authenticationOptions: [...authenticationOptions] }
            })
            if (id) {

                let data = await FetchData('DataFiles/Forms/ConnectionInfoDefinition/ConnectionInfoDefinition.json', 'get', null,
                    (e) => { return e.Con_DBCode.toString() === id.toString() });

                if (data && data.length > 0) {
                    let o = {
                        dbcode: data[0].Con_DBCode ? data[0].Con_DBCode.toString() : '',
                        servername: data[0].Con_ServerName,
                        dbname: data[0].Con_DBName,
                        password: data[0].Con_DBPwd,
                        cpassword: data[0].Con_DBPwd,
                        createdBy: '',
                        creationDate: '',
                        modifiedBy: data[0].Nat_Ustmp,
                        modifiedDate: data[0].Nat_Dstmp,
                        needresdata: data[0].Nat_NeedResData,
                        authType: data[0].Con_Auth,
                        dbaccess: data[0].Con_Path,
                        modifiedBy: data[0].Con_Ustmp,
                        modifiedDate: data[0].Con_Dstmp
                    }
                    setState(prv => {
                        return { ...prv, ...o }
                    })
                    setInitialState(prv => {
                        return { ...prv, ...o }
                    })
                }
            }
        }
        catch (error) {
            throw error
        }
        finally {
            setisLoading(prv => prv - 1)
        }

    }, [])

    const isCodeAvailable = useCallback(async (id) => {
        let data = await FetchData('DataFiles/Forms/ConnectionInfoDefinition/ConnectionInfoDefinition.json', 'get', null,
            id ? (e) => { return e.Con_DBCode.toString() === id } : () => false);
        return data.length === 0
    }, [])

    const handleOnBlur = useCallback(async (value, key) => {

    }, [])

    const handleChange = useCallback(async (value, key) => {
        if (key === 'dbcode') {
            let isAvailable = await isCodeAvailable(value);
            setState(prv => {
                return { ...prv, codeAvailable: isAvailable }
            })
        }
        setState(prv => {
            if (prv.hasOwnProperty(`missing${key}`)) {
                return { ...prv, [key]: value, [`missing${key}`]: false }
            }
            else {
                return { ...prv, [key]: value }
            }
        });
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
        else if (state.password !== state.cpassword) {
            setState({ ...state, passwordmismatch: true })
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
    }, [handleSave])
    //#endRegion 


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
                    <div className="col-md-12 title">Connection Info Definition  - {state.mode} </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-xl-2 col-sm-3 required"> Database Code</div>
                            <div className="col-xl-2 col-sm-6">
                                <SelectComp
                                    value={state.dbcode}
                                    onChange={handleChange}
                                    name="dbcode"
                                    options={state.databasecodeOptions}
                                    className={`${state.missingdbcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    clearable
                                    disabled={false}
                                />
                                {!state.codeAvailable &&
                                    <label className="errorLabel"> Code Already Exists </label>
                                }
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-xl-2 col-sm-3 required"> SQL Server Name</div>
                            <div className="col-xl-4 col-sm-9">
                                <TextAreaComp
                                    value={state.servername}
                                    name="servername"
                                    onChange={handleChange}
                                    maxLength={1000}
                                    style={{ minHeight: "50px" }}
                                    className={`${state.missingservername ? "alert-danger" : ""}`}
                                    disabled={false}

                                />
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-xl-2 col-sm-3 required">Database Name</div>
                            <div className="col-xl-4 col-sm-9">
                                <TextAreaComp
                                    value={state.dbname}
                                    name="dbname"
                                    onChange={handleChange}
                                    maxLength={1000}
                                    style={{ minHeight: "50px" }}
                                    className={`${state.missingdbname ? "alert-danger" : ""}`}
                                    disabled={false}

                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-6">
                                <div className="row mt-1">
                                    <div className="col-xl-4 col-sm-3 required">Password </div>
                                    <div className="col-xl-8 col-sm-9" >
                                        <InputPassComp
                                            // ref={node => this.reference = node}
                                            value={state.password}
                                            name="password"
                                            maxLength={30}
                                            handleChange={handleChange}
                                            disabled={false}
                                            handleOnblur={handleOnBlur}
                                            className={`${state.missingpassword ? "alert-danger" : ""}`}
                                            removeSpaces
                                        />
                                        {state.passwordmismatch &&
                                            <label className="errorLabel"> Passwords do not match </label>
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="row mt-1">
                                    <div className="col-xl-4 col-sm-3 required">Confirm Password </div>
                                    <div className="col-xl-8 col-sm-9" >
                                        <InputPassComp
                                            //  ref={node => this.reference = node}
                                            value={state.cpassword}
                                            name="cpassword"
                                            maxLength={30}
                                            handleChange={handleChange}
                                            disabled={false}
                                            handleOnblur={handleOnBlur}
                                            className={`${state.missingcpassword ? "alert-danger" : ""}`}
                                            removeSpaces
                                        />
                                        {state.passwordmismatch &&
                                            <label className="errorLabel"> Passwords do not match </label>
                                        }
                                    </div>

                                </div>
                            </div>


                        </div>
                        <div className="row mt-1">
                            <div className="col-xl-2 col-sm-3 required"> Authentication</div>
                            <div className="col-xl-2 col-sm-6">
                                <SelectComp
                                    value={state.authType}
                                    onChange={handleChange}
                                    name="authType"
                                    options={state.authenticationOptions}
                                    className={`${state.missingauthType ? "alert-danger" : ""}`}
                                    clearable
                                    disabled={false}
                                />

                            </div>
                        </div>

                        <div className="row mt-1">
                            <div className="col-xl-2 col-sm-3 ">DB Access Path</div>
                            <div className="col-xl-4 col-sm-9">
                                <TextAreaComp
                                    value={state.dbaccess}
                                    name="dbaccess"
                                    onChange={handleChange}
                                    maxLength={1000}
                                    style={{ minHeight: "50px" }}
                                    className={``}
                                    disabled={false}

                                />
                            </div>
                        </div>

                        {/*
                    <div className="row mt-1">
                        <div className="col-xl-2 col-sm-3">Arabic Description</div>
                        <div className="col-xl-4 col-sm-9">
                            <TextAreaComp
                                value={state.arabicdesc}
                                name="arabicdesc"
                                onChange={handleChange}
                                maxLength={1000}
                                style={{ minHeight: "100px" }}
                                disabled={false}

                            />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-xl-2 col-sm-3">French Description</div>
                        <div className="col-xl-4 col-sm-9">
                            <TextAreaComp
                                value={state.frenchdesc}
                                name="frenchdesc"
                                onChange={handleChange}
                                maxLength={1000}
                                style={{ minHeight: "100px" }}
                                disabled={false}
                            />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-xl-2 col-sm-3 required">Status</div>
                        <div className="col-xl-4 col-sm-9">

                            <RadioGroupComp
                                name="status"
                                value={state.status}
                                radios={[{ value: "A", name: "Active" }, { value: "I", name: "Inactive" }]}
                                onClick={handleChange}
                                increaseArea
                                className={`${state.missingstatus ? "alert-danger" : ""}`}
                                disabled={state.statusDisabeld || state.savedSuccessfully}
                            />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-xl-2 col-sm-3">Need Residence Data</div>
                        <div className="col-xl-4 col-sm-9">

                            <RadioGroupComp
                                name="needresdata"
                                value={state.needresdata}
                                radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                                onClick={handleChange}
                                increaseArea
                                className={""}
                                disabled={false}
                            />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-xl-2 col-sm-3">Remarks</div>
                        <div className="col-xl-4 col-sm-9">
                            <TextAreaComp
                                value={state.remarks}
                                name="remarks"
                                onChange={handleChange}
                                maxLength={1000}
                                style={{ minHeight: "100px" }}
                                disabled={false}
                            />
                        </div>
                    </div> */}

                    </div>

                </div>
            </div>
        </>
    )
}
