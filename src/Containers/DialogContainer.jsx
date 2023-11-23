import React, { useCallback, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { DialogContext } from '../ContextProvider/DialogContext'
import { ModalBody, Modal } from 'reactstrap';
import { ModalComp } from '../ReusableComponents/Other/ModalComp/ModalComp';




export function DialogContainer() {
    const { dialogs, setDialogs } = useContext(DialogContext);

    const renderDialogs = useCallback(() => {
        return dialogs.map((dialog, idx) => {
            const {
                Body, BodyProps, onOk, onCancel
            } = dialog

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
                <ModalBody>
                    <Body {...BodyProps} onDialogCancel={onDialogCancel} onDialogOk={onDialogOk} />
                </ModalBody>
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
