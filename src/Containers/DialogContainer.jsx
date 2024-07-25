import React, { forwardRef, useCallback, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { DialogContext } from '../ContextProvider/DialogContext'
import { ModalBody, Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';

export function DialogContainer() {
    const { dialogs, setDialogs } = useContext(DialogContext);
    const renderDialogs = useCallback(() => {
        return dialogs.map((dialog, idx) => {
            const {
                hideFooterButtons, modalTitle, Body, BodyProps, onOk, onCancel
            } = dialog

            const refBody = forwardRef((props, ref) => {

                return <Body />
            })

            const onDialogOk = (payload) => {

                onOk(payload)
                setDialogs(prv => {
                    prv.pop()
                    return [...prv]
                })
            }
            const onDialogCancel = (payload) => {
                onCancel(payload)
                setDialogs(prv => {
                    prv.pop()
                    return [...prv]
                })
            }

            return <Modal key={idx} isOpen={true}>
                {
                    modalTitle &&
                    <ModalHeader>
                        {modalTitle}
                    </ModalHeader>
                }

                <ModalBody>
                    <Body {...BodyProps} onDialogCancel={onDialogCancel} onDialogOk={onDialogOk} />
                </ModalBody>
                {/* {
                    !hideFooterButtons &&
                    <ModalFooter id="custom-modal-footer">
                        {
                            <Button color={"warning"} onClick={() => { }}>{"Refused"}</Button>
                        }
                        {onDialogOk &&
                            <Button color={"info"} onClick={onDialogOk}>{"Save"}</Button>
                        }
                        {onDialogCancel &&
                            <Button color={"danger"} onClick={onDialogCancel}>{"Close"}</Button>
                        }
                    </ModalFooter>
                } */}



            </Modal>

        })

    }, [dialogs])


    return (
        <>
            {renderDialogs()}
            {/* <h1 style={style}>Error: {errorMessage}</h1> */}
            <Outlet />
        </>

    )
}
