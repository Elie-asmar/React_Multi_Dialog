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
import { urlPath } from '../../globals';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
export function DietDefinition({ uuid, useInModal, routing, ...props }) {


    const { location, params } = routing;


    const STATE = {
        mode: '',
        dietCode: "",
        missingdietCode: false,
        status: 'A',
        missingstatus: false,
        dietDesc: "",
        missingdietDesc: false,
        arDietDesc:'',
        remarks: "",

        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['dietCode', 'dietDesc'],

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
                    navigate('/DietDefinition', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit' } })
                    setInitialState(prv => { return { ...prv, mode: 'Edit' } })
                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/DietDefinition', { replace: true })
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
                Die_Code : id
            }
            let data = await FetchData(`${urlPath}/Diet/getDietDefinitionById`, 'get', _data);

            setisLoading(prv => prv - 1)
            if (data && data.data.length > 0) {
                let o = {
                    dietCode: data.data[0].die_Code ? data.data[0].die_Code : '',
                    status: data.data[0].die_Sts,
                    dietDesc: data.data[0].die_Desc,
                    arDietDesc: data.data[0].die_DescAr,
                    remarks: data.data[0].die_Remarks ? data.data[0].die_Remarks : '',

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
        if (id) {
            try {
                let _data = {
                    Die_Code : id
                }
                let data = await FetchData(`${urlPath}/Diet/getDietDefinitionById`, 'get', _data);
                if (data.success && data.data.length > 0) return false;
                if (data.status == 313 && !data.success ) {
                    return true
                }
            } catch (error) {
                console.dir(error);
            }
        } else {
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
                Die_Code:state.dietCode ,
                Die_Desc:state.dietDesc ,
                Die_Sts: state.status ,
                Die_Remarks:state.remarks ,
                Die_DescAr: state.arDietDesc ,
            }
            const response = await FetchData(`${urlPath}/Diet/upsertDietDefinition`, 'post', objToSave).
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
                    <div className="col-md-12 title">Diet Definition  - {state.mode} </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-xl-2 col-sm-3 required"> Diet Code</div>
                            <div className="col-xl-2 col-sm-6">
                                <InputTextComp
                                    value={state.dietCode}
                                    name="dietCode"
                                    maxLength={4}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={state.mode == "Edit"}
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    
                                />

                                {!state.codeAvailable &&
                                    <label className="errorLabel">Diet Code Already Exists </label>
                                }
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-xl-2 col-sm-3 required"> Diet Description </div>
                            <div className="col-xl-4 col-sm-6">
                                <InputTextComp
                                    value={state.dietDesc}
                                    name="dietDesc"
                                    maxLength={50}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={false}
                                    className={`${state.missingdietDesc ? "alert-danger" : ""}`}
                                    
                                />

                            </div>
                        </div> 
                        
                         <div className="row mt-2">
                            <div className="col-xl-2 col-sm-3 "> Arabic Diet Description </div>
                            <div className="col-xl-4 col-sm-6">
                                <InputTextComp
                                    value={state.arDietDesc}
                                    name="arDietDesc"
                                    maxLength={50}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={false}
                                    // className={`${state.missingdietDesc ? "alert-danger" : ""}`}
                                    
                                />

                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-2 col-sm-3 "> Remarks</div>
                            <div className="col-xl-4 col-sm-9">
                                <TextAreaComp
                                    value={state.remarks}
                                    name="remarks"
                                    onChange={handleChange}
                                    maxLength={500}
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
                                    disabled={state.mode !=="Edit"}
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
