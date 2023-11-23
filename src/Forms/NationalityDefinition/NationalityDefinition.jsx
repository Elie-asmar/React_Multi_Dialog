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
import { urlPath } from '../../globals';
export function NationalityDefinition({ uuid, useInModal, routing, ...props }) {


    const { location, params } = routing;


    const STATE = {
        mode: '',
        code: "",
        missingcode: false,
        status: '',
        missingstatus: false,
        desc: "",
        missingdesc: false,
        arabicdesc: "",
        frenchdesc: "",
        needresdata: "",
        remarks: "",
        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['code', 'desc'],
        appliedOn: "",
        codeAvailable: true,
        notifType: "",
        notifTitle: "",
        notifMessage: "",
        notifTime: 2500,
        notifDisplay: '',
        statusDisabeld: false,
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
                    navigate('/Nationality', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit' } })
                    setInitialState(prv => { return { ...prv, mode: 'Edit' } })
                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/Nationality', { replace: true })
                }
                else {
                    setState(prv => { return { ...prv, mode: 'Add New', status: "A", statusDisabeld: true } })
                    setInitialState(prv => { return { ...prv, mode: 'Add New', status: "A", statusDisabeld: true } })
                }
            }

        }
    }, [userData])



    //#endRegion

    //#region Memoized Callbacks
    const FillData = useCallback(async (id) => {


        if (id) {
            setisLoading(prv => prv + 1)
            const _data = {
                Nat_Code: id
            }
            let data = await FetchData(`${urlPath}/Nationality/getNationalityById`, 'get', _data);
            let finaldata = data.data
            setisLoading(prv => prv - 1)

            if (finaldata && finaldata.length > 0) {
                let o = {
                    code: finaldata[0].nat_Code ? finaldata[0].nat_Code.toString() : '',
                    status: finaldata[0].nat_Status,
                    desc: finaldata[0].nat_Desc,
                    arabicdesc: finaldata[0].nat_ArDesc ? finaldata[0].nat_ArDesc : '',
                    frenchdesc: finaldata[0].nat_FrDesc ? finaldata[0].nat_FrDesc : '',
                    remarks: finaldata[0].nat_Remarks ? finaldata[0].nat_Remarks : '',
                    createdBy: '',
                    creationDate: '',
                    modifiedBy: finaldata[0].nat_Ustmp,
                    modifiedDate: finaldata[0].nat_Dstmp,
                    needresdata: finaldata[0].nat_NeedResData,
                    appliedOn: finaldata[0].nat_AppliedOn
                }
                setState(prv => {
                    return { ...prv, ...o }
                })
                setInitialState(prv => {
                    return { ...prv, ...o }
                })
            }
        }
    }, [])

    const isCodeAvailable = useCallback(async (code) => {

        setisLoading(prv => prv + 1)
        const _data = {
            Nat_Code: code
        }

        let data = await FetchData(`${urlPath}/Nationality/getNationalityById`, 'get', _data);

        setisLoading(prv => prv - 1)

        if (data.status === 200) {
            return false
        } else if (data.status === 313) {
            return true
        }

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
        if (key === "code") {
            setState(prv => { return { ...prv, codeAvailable: true } })
        }
        if (key === "needresdata" && state.appliedOn === "") {
            setState(prv => { return { ...prv, appliedOn: "I" } })
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
        else if (!state.codeAvailable) {
            return
        }

        else {

            let objToSave = {
                nat_AppliedOn: state.appliedOn,
                nat_NeedResData: state.needresdata,
                nat_FrDesc: state.frenchdesc,
                nat_Remarks: state.remarks,
                nat_ArDesc: state.arabicdesc,
                nat_Status: state.status,
                nat_Code: state.code,
                nat_Desc: state.desc,
                nat_Ustmp: null,
                nat_Dstmp: null,
            }

            const response = await FetchData(`${urlPath}/Nationality/upsertNationality`, 'post', objToSave).
                catch(error => {
                    throw error
                })
            if (response.success) {
                saveFinished(state, setState, "success", "", "", true, navigate)
            } else {
                let errs = response.data[0];
                let errmsg = ''
                for (let o of Object.keys(errs)) {
                    errmsg += errs[o] + ' ; '
                }
                saveFinished(state, setState, "error", "Saving Failed", errmsg, false)
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
                    <div className="col-md-12 title">Nationality Definition  - {state.mode} </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-xl-2 col-sm-3 required"> Code</div>
                            <div className="col-xl-2 col-sm-6">
                                <InputTextComp
                                    maxLength={4}
                                    value={state.code}
                                    name="code"
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode == "Edit"}
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
                        {state.needresdata === "Y" &&
                            <div className="row mt-1">
                                <div className="col-xl-2 col-sm-3">Apply On</div>
                                <div className="col-xl-4 col-sm-9">
                                    <RadioGroupComp
                                        name="appliedOn"
                                        value={state.appliedOn}
                                        radios={[{ value: "I", name: "Internal" }, { value: "E", name: "External" }, { value: "B", name: "Both" }]}
                                        onClick={handleChange}
                                        increaseArea
                                    />
                                </div>
                            </div>}
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
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
