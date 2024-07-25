import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import useDialog from '../../CustomHooks/useDialog';
import { Button, ModalFooter } from 'reactstrap';
export function DialogBodyForm(props) {

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
    const [state, setState] = useState(STATE);
    const [initialState, setInitialState] = useState(STATE);
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

                        showDialog('Hi', DialogBodyForm, { counter: (props.counter ?? 0) + 1 }, false).onOk((payload) => {
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
            <ModalFooter style={{ paddingTop: '50px', marginBottom: '-15px', marginRight: '-15px' }}>
                {
                    <Button color={"warning"} onClick={() => { }}>{"Refused"}</Button>
                }
                {props.onDialogOk &&
                    <Button color={"info"} onClick={() => { props.onDialogOk('I have returned ' + props.counter) }}>{"Save"}</Button>
                }
                {props.onDialogCancel &&
                    <Button color={"danger"} onClick={() => { props.onDialogCancel() }}>{"Close"}</Button>
                }
            </ModalFooter>

        </>
    )
}
