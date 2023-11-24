import React, { useContext, useEffect, useState } from 'react'
import { DialogContext } from '../ContextProvider/DialogContext';

export default function useDialog() {
    const { setDialogs } = useContext(DialogContext)
    const [okCallBack, setOkCallback] = useState(null)
    const [cancelCallBack, setCancelCallback] = useState(null)
    const [dialog, setDialog] = useState(null)

    useEffect(() => {

        if (dialog && okCallBack && cancelCallBack) {

            setDialogs(prv => {
                return [
                    ...prv, {
                        Body: dialog.Body,
                        BodyProps: dialog.BodyProps,
                        onOk: okCallBack,
                        onCancel: cancelCallBack
                    }
                ]
            })
        }

    }, [dialog, okCallBack, cancelCallBack])

    const showDialog = (Body, BodyProps) => {
        console.log(BodyProps)
        setDialog({ Body, BodyProps })

        return chainableFunctions
    }

    const onOk = (callback) => {

        setOkCallback(prv => { return callback })
        return chainableFunctions
    }
    const onCancel = (callback) => {
        setCancelCallback(prv => { return callback })
        return chainableFunctions
    }


    const chainableFunctions = {
        showDialog,
        onOk,
        onCancel,

    };

    return chainableFunctions
}
