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
import useDialog from '../../CustomHooks/useDialog';
export function DialogBodyForm(props) {
    // console.log('props', props)


    const STATE = {
        mode: '',
        recId: '',
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
    const { showDialog } = useDialog()



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

    }, [state])

    const ButtonClick = useCallback((id) => {
        switch (id) {
            case 'clear':
                setState({ ...initialState })
                break;
            case 'save':
                // handleSave();
                props.onDialogOk('I have returned ' + props.counter)
                break;
            case 'close':
                props.onDialogCancel()
                break;

        }
    }, [handleSave])
    //#endRegion 


    return (
        <>

            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-custom btn-block px-2 pointer" onClick={() => {

                        showDialog(DialogBodyForm, { counter: (props.counter ?? 0) + 1 }).onOk((payload) => {
                            console.log('Ok Clicked and returned ' + payload)

                        }).onCancel(() => {
                            console.log('Cancel Clicked')
                        })


                    }}>Add Dialog {props.counter}</button>
                </div>
            </div>
            <ButtonsContainer
                handleButtonClick={ButtonClick}
                createdBy={state.createdBy}
                creationDate={state.creationDate}
                modifiedBy={state.modifiedBy}
                modifiedDate={state.modifiedDate}
                hideSaveAsDraft={true}
            />

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
                                    options={[]}
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
                                    handleOnblur={() => { }}
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
                                    options={[]}
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
