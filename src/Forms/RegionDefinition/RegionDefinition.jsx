import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import { FetchData, isRequiredDataEmpty, saveFinished, SetMandatoryFields } from '../../utils/functions';
import { urlPath } from '../../globals';
import Notification from '../../ReusableComponents/Other/Notification/Notification'
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import TextAreaComp from '../../ReusableComponents/Other/TextAreaComp/TextAreaComp';
import RadioGroupComp from '../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import { isEmpty, map } from 'lodash';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent';
import { useFetchData } from '../../CustomHooks/APIs/useFetchData';
import moment from 'moment';
export function RegionDefinition({ uuid, useInModal, routing, ...props }) {



    const { location, params } = routing;


    const STATE = {
        mode: '',
        recId : '' , 
        mouhafaza: '',
        missingmouhafaza: false,
        mouhafazaOptions: '',
        code: "",
        missingcode: false,
        status: 'A',
        missingstatus: false,
        desc: "",
        missingdesc: false,
        arabicdesc: "",
        kazacode: "",
        missingkazacode: false,
        kazacodeOptions: [],
        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['code', 'desc', 'kazacode'],

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


    const [mouhafazaOptions, mouhafazaOptionsError] = useFetchData(`${urlPath}/Mouhafaza/getMouhafaza`, 'get');
    const [kazaOptions, kazaOptionsError] = useFetchData(`${urlPath}/Kaza/getKaza`, 'get');


    const mouhafazaDropdown = useMemo(() => {
        const mouhafazaOptionsArray = [];
        mouhafazaOptions.forEach(eachElement => {
            mouhafazaOptionsArray.push({ label: eachElement.moh_Description, value: eachElement.moh_Code })
        })
        return mouhafazaOptionsArray;
    }, [mouhafazaOptions]);

    const kazaDropdown = useMemo(() => {
        const kazaOptionsArray = [];
        kazaOptions.forEach(eachElement => {
            kazaOptionsArray.push({ label: eachElement.kaz_Description, value: eachElement.kaz_Code })
        })
        return kazaOptionsArray;
    }, [kazaOptions]);

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
                    navigate('/RegionDef', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit' , recId: params?.editid.reg_RecId } })
                    setInitialState(prv => { return { ...prv, mode: 'Edit' } })
                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/RegionDef', { replace: true })
                }
                else {
                    setState(prv => { return { ...prv, mode: 'Add New' } })
                    setInitialState(prv => { return { ...prv, mode: 'Add New' } })

                }
            }

        }
    }, [userData])


    //#endRegion

    //#region Memoized Callbacks
    const FillData = useCallback(async (obj) => {
        if (obj) {
            setisLoading(prv => prv + 1)
            const _data = {reg_code: obj.reg_RegCode}
            
            let data = await FetchData(`${urlPath}/Region/getRegionById`, 'get', _data);
            setisLoading(prv => prv - 1)

            if (data && data.data.length > 0 ) {
                let o = {
                    code: data.data[0]?.reg_RegCode ? data.data[0].reg_RegCode : '',
                    // mouhafazaOptions: mouhafazaOptions,
                    mouhafaza: data.data[0].reg_Mouhafazat.toString(),
                    kazacode: data.data[0].reg_Kaza,
                    status: data.data[0].reg_Status == "A" ? "A" : "I",
                    desc: data.data[0].reg_Description,
                    arabicdesc: data.data[0].reg_ArDesc ? data.data[0].reg_ArDesc : '',
                    createdBy: '',
                    creationDate: '',
                    modifiedBy: data.data[0].reg_Ustmp,
                    modifiedDate: data.data[0].reg_Dstmp,
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
        let data = await FetchData(`${urlPath}/Region/GetAllRegions`, 'get', null,
            id ? (e) => { return e.reg_RegCode.toString() == id } : () => false);
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
                reg_RecId: state.mode == "Edit" ?  state.recId : 0,
                reg_Mouhafazat: state.mouhafaza,
                reg_RegCode: state.code,
                reg_Status: state.status,
                reg_Description: state.desc,
                reg_ArDesc: state.arabicdesc,
                reg_Ustmp: null,
                // reg_Ustmp: state.modifiedBy,
                reg_Dstmp: null ,
                // reg_Dstmp: moment().format(),
                reg_Kaza: state.kazacode,
            }

            const response = await FetchData(`${urlPath}/Region/upsertRegion`, 'post', objToSave).
            catch(err=>{
                throw err
            })
            if (response.success){
                saveFinished(state, setState, "success", "", "", true, navigate)
            }
            else{
                let errs = response.data[0];
                let errmsg = ''
                for (let o of Object.keys(errs) ){
                    errmsg += errs[o] + ' ; '
                }
                saveFinished(state, setState, "error", "Saving Failed",errmsg, false) 
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
                    <div className="col-md-12 title">Regions Definition  - {state.mode} </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-xl-2 col-sm-3 required"> Mouhafaza</div>
                            <div className="col-xl-4 col-sm-9">
                                <SelectComp
                                    value={state.mouhafaza}
                                    onChange={handleChange}
                                    placeholder="Mouhafaza.."
                                    name="mouhafaza"
                                    options={mouhafazaDropdown}
                                    className={`${state.missingdbcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    clearable
                                    disabled={state.mode === "Edit"}
                                />

                                {!state.codeAvailable &&
                                    <label className="errorLabel"> Code Already Exists </label>
                                }
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-2 col-sm-3 required"> Code</div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.code}
                                    name="code"
                                    maxLength={3}
                                    placeholder="Code.."
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode === "Edit"}
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />

                                {!state.codeAvailable &&
                                    <label className="errorLabel"> Code Already Exists </label>
                                }
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-2 col-sm-3 required"> Description</div>
                            <div className="col-xl-4 col-sm-9">
                                <TextAreaComp
                                    value={state.desc}
                                    name="desc"
                                    placeholder="Description.."
                                    onChange={handleChange}
                                    maxLength={1000}
                                    style={{ minHeight: "100px" }}
                                    className={`${state.missingdesc ? "alert-danger" : ""}`}
                                    disabled={state.mode === "Edit"}

                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-2 col-sm-3">Arabic Description</div>
                            <div className="col-xl-4 col-sm-9">
                                <TextAreaComp
                                    value={state.arabicdesc}
                                    name="arabicdesc"
                                    placeholder="Arabic Description.."
                                    onChange={handleChange}
                                    maxLength={1000}
                                    style={{ minHeight: "100px" }}
                                    disabled={false}

                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-xl-2 col-sm-3 required">Kaza Code</div>
                            <div className="col-xl-4 col-sm-9">

                                <SelectComp
                                    name="kazacode"
                                    placeholder="Kaza Code.."
                                    value={state.kazacode}
                                    onChange={handleChange}
                                    options={kazaDropdown}
                                    className={`${state.missingkazacode ? "alert-danger" : ""}`}
                                    clearable
                                    disabled={false}
                                />

                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-2 col-sm-3 required">Status</div>
                            <div className="col-xl-4 col-sm-9">

                                <RadioGroupComp
                                    name="status"
                                    value={state.status}
                                    radios={[{ value: "A", name: "Active" }, { value: "I", name: "Inactive" }]}
                                    onClick={handleChange}
                                    increaseArea
                                    className={`${state.missingstatus ? "alert-danger" : ""}`}
                                    disabled={state.mode !== "Edit" ? true : false || state.savedSuccessfully}
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
