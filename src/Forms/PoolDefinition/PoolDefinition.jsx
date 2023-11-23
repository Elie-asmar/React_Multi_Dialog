import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import { FetchData, isRequiredDataEmpty, saveFinished, SetMandatoryFields } from '../../utils/functions';
import { urlPath } from '../../globals';
import Notification from '../../ReusableComponents/Other/Notification/Notification'
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import RadioGroupComp from '../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import { isEmpty } from 'lodash';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
export function PoolDefinition({ uuid, useInModal, routing, ...props }) {


    const { location, params } = routing;

    const STATE = {
        mode: '',

        code: "",
        missingcode: false,
        status: 'A',
        missingstatus: false,
        poolName: "",
        missingpoolName: false,
        vatAccNo: '',
        auxAccNo: '',

        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['code', 'poolName'],

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

    //#pool Side Effects
    useEffect(() => {
        if (!userData) {
            return
        }
        if (!useInModal) {
            let priv = getUserPrivs(uuid);
            if (location.pathname.toLocaleLowerCase().includes("/edit")) {
                if (priv?.Modify === 0) {
                    navigate('/PoolDefinition', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit' } })
                    setInitialState(prv => { return { ...prv, mode: 'Edit' } })
                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/PoolDefinition', { replace: true })
                }
                else {
                    setState(prv => { return { ...prv, mode: 'Add New' } })
                    setInitialState(prv => { return { ...prv, mode: 'Add New' } })

                }
            }

        }
    }, [userData])


    //#endPool

    //#pool Memoized Callbacks
    const FillData = useCallback(async (id) => {


        if (id) {
            setisLoading(prv => prv + 1)
            const _data = {
                Pol_Code : id
            }
            let data = await FetchData(`${urlPath}/DoctorsPool/getDoctorsPoolByCode`, 'get', _data);
            setisLoading(prv => prv - 1)
            if (data && data.data.length > 0) {
                let o = {
                    code: data.data[0].pol_Code ? data.data[0].pol_Code: '',
                    status: data.data[0].pol_Status,
                    poolName: data.data[0].pol_Name,
                    vatAccNo: data.data[0].pol_VATAccNo ? data.data[0].pol_VATAccNo : '',
                    auxAccNo: data.data[0].pol_AuxAccNo ? data.data[0].pol_AuxAccNo : '',
                    createdBy: '',
                    creationDate: '',
                    modifiedBy: '',
                    modifiedDate: '',
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

    const isCodeAvailable = useCallback(async (id) => {

        let data = await FetchData(`${urlPath}/DoctorsPool/getDoctorsPool`, 'get', null,
            id ? (e) => { return e.pol_Code.toString() === id } : () => false);
        return data.data.length === 0
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
                Pol_Code: state.code,
                Pol_Name: state.poolName,
                Pol_Status: state.status,
                Pol_AuxAccNo: state.auxAccNo,
                Pol_Dstmp: null,
                Pol_Ustmp: null,
                Pol_VATAccNo: state.vatAccNo
            }
            const response = await FetchData(`${urlPath}/DoctorsPool/upsertDoctorsPool`, 'post', objToSave).
                catch(err => {
                    throw err
                })
            if (response.success) {
                saveFinished(state, setState, "success", "", "", true, navigate)
            }
            else {
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
    //#endPool 


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
                    <div className="col-md-12 title">Pool Definition  - {state.mode} </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-xl-2 col-sm-3 required">Pool Code</div>
                            <div className="col-xl-2 col-sm-6">
                                <InputTextComp
                                    value={state.code}
                                    name="code"
                                    maxLength={20}
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
                            <div className="col-xl-2 col-sm-3 required"> Pool Name</div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.poolName}
                                    name="poolName"
                                    handleChange={handleChange}
                                    maxLength={1000}
                                    className={`${state.missingpoolName ? "alert-danger" : ""}`}
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
                                    disabled={state.mode !== "Edit" }
                                />
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-xl-2 col-sm-3">Auxiliary A/C No</div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.auxAccNo}
                                    name="auxAccNo"
                                    handleChange={handleChange}
                                    maxLength={1000}
                                    disabled={false}
                                />
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-xl-2 col-sm-3">VAT A/C No</div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.vatAccNo}
                                    name="vatAccNo"
                                    handleChange={handleChange}
                                    maxLength={1000}
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
