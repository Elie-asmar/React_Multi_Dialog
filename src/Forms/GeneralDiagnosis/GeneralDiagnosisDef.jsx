import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
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
import { urlPath } from '../../globals';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent';
import CheckBoxComp from '../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import { useFetchData } from '../../CustomHooks/APIs/useFetchData';
export function GeneralDiagnosisDef({ uuid, useInModal, routing, ...props }) {


    const { location, params } = routing;


    const STATE = {
        mode: '',
        recId: '',

        chapter: '',
        group: '',
        sub: '',

        admissionDiagType: '',
        admissionDiagTypeDropdown: [],

        description: "",
        status: 'A',
        trauma: false,

        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['chapter', 'group'],

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

    const [diagnosisType, error] = useFetchData(`${urlPath}/Diagnosis/getDiagnosisType`, 'get');

    const [state, setState] = useStateWithCallback(STATE);
    const [initialState, setInitialState] = useState(STATE);
    const { userData, getUserPrivs } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);
    const navigate = useNavigate();


    const diagnosisTypeDropdowm = useMemo(() => {
        let newArrayFormatted = []
        diagnosisType.forEach(eachElement => {
            newArrayFormatted.push({ value: eachElement.adt_Code, label: eachElement.adt_Description })
        })
        return newArrayFormatted;

    }, [diagnosisType])



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
                    navigate('/GeneralDiagnosisDef', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit' } })
                    setInitialState(prv => { return { ...prv, mode: 'Edit' } })
                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/GeneralDiagnosisDef', { replace: true })
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
    const FillData = useCallback(async (id) => {

        if (id) {
            setisLoading(prv => prv + 1)
            let _data = {
                Dig_Chapter: id.Dig_Chapter,
                Dig_Group: id.Dig_Group,
                Dig_SubGroup: id.Dig_SubGroup,
            }
            let data = await FetchData(`${urlPath}/Diagnosis/getDiagnosisById`, 'get', _data);
            setisLoading(prv => prv - 1)

            if (data && data.data.length > 0) {
                let o = {
                    recId: data.data[0].dig_RecId ? data.data[0].dig_RecId : 0,
                    chapter: data.data[0].dig_Chapter ? data.data[0].dig_Chapter : '',
                    status: data.data[0].dig_Status,
                    group: data.data[0].dig_Group,
                    sub: data.data[0].dig_SubGroup ? data.data[0].dig_SubGroup : '',
                    admissionDiagType: data.data[0].dig_Type ? data.data[0].dig_Type : '',
                    description: data.data[0].dig_Desc ? data.data[0].dig_Desc : '',
                    trauma: data.data[0].dig_Trauma == "Y" ? true : false,

                    createdBy: '',
                    creationDate: '',
                    modifiedBy: '',
                    modifiedDate: '',
                    needresdata: '',
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

        if (id) {
            try {
                let _data = {
                    Dig_Chapter: state.chapter,
                    Dig_Group: state.group,
                    Dig_SubGroup: state.sub,
                }

                let data = await FetchData(`${urlPath}/Diagnosis/getDiagnosisById`, 'get', _data);
                if (data.success && data.data.length > 0) return false;
                if (data.status == 313 && !data.success) {
                    return true
                }
            } catch (error) {
                console.dir(error);
            }
        } else {
            return true
        }

    })



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
                Dig_RecId: state.mode == "Edit" ? state.recId : 0,
                Dig_Chapter: state.chapter,
                Dig_Group: state.group,
                Dig_SubGroup: state.sub,
                Dig_Desc: state.description,
                Dig_Status: state.status,
                Dig_Trauma: state.trauma ? "Y" : 'N',
                Dig_Type: state.admissionDiagType,

            }

            const response = await FetchData(`${urlPath}/Diagnosis/upsertDiagnosis`, 'post', objToSave).
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
                    <div className="col-md-12 title">General Diagnosis - {state.mode} </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className='row mt-2'>
                            <div className='col-md-12 title'>
                                Diagnosis Information
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className='col-6'>
                                <div className='row'>
                                    <div className="col-xl-2 col-sm-3 required"> Chapter</div>
                                    <div className="col-xl-5 col-sm-4">
                                        <InputTextComp
                                            value={state.chapter}
                                            name="chapter"
                                            maxLength={3}
                                            // handleOnblur={handleBlur}
                                            handleChange={handleChange}
                                            disabled={state.mode == "Edit"}
                                            // className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                            removeSpaces
                                        />


                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    <div className="col-xl-12 col-sm-12  title"> Auto Filtration By Type</div>

                                </div>
                                <div className='row mt-2'>
                                    <div className="col-xl-4 col-sm-3 "> Admission Diagnosis Type</div>
                                    <div className="col-xl-6 col-sm-4">
                                        <SelectComp
                                            value={state.admissionDiagType}
                                            onChange={handleChange}
                                            name="admissionDiagType"
                                            options={diagnosisTypeDropdowm}
                                            className=""
                                            clearable
                                            disabled={false}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-xl-1 col-sm-3 required"> Group</div>
                            <div className="col-xl-3 col-sm-5">
                                <InputTextComp
                                    value={state.group}
                                    name="group"
                                    maxLength={8}
                                    // handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode == "Edit"}
                                    // className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />

                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-xl-1 col-sm-3"> Sub</div>
                            <div className="col-xl-3 col-sm-5">
                                <InputTextComp
                                    value={state.sub}
                                    name="sub"
                                    maxLength={8}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode == "Edit"}
                                    // className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                                {!state.codeAvailable &&
                                    <label className="errorLabel"> Group Already Exists </label>
                                }

                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-xl-1 col-sm-3 ">Description</div>
                            <div className="col-xl-4 col-sm-6">

                                <TextAreaComp
                                    value={state.description}
                                    name="description"
                                    onChange={handleChange}
                                    maxLength={400}
                                    style={{ minHeight: "100px" }}
                                    disabled={false}
                                />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className='col-6'>
                                <div className='row'>
                                    <div className="col-xl-2 col-sm-3">Status</div>
                                    <div className="col-xl-4 col-sm-9">

                                        <RadioGroupComp
                                            name="status"
                                            value={state.status}
                                            radios={[{ value: "A", name: "Active" }, { value: "I", name: "Inactive" }]}
                                            onClick={handleChange}
                                            increaseArea
                                            className={""}
                                            disabled={state.mode !== "Edit"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    {/* <div className="col-xl-2 col-sm-3">Trauma Case Alert </div> */}
                                    <div className="col-xl-4 col-sm-9">
                                        <CheckBoxComp
                                            checked={state.trauma}
                                            onCheckChange={(checked, key) => handleChange(checked, key)}
                                            name="trauma"
                                            description="Trauma Case Alert "
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
