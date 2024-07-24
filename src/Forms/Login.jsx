import React from 'react'
import { DialogBodyForm } from './DialogFormTest/DialogBodyForm';
import useDialog from '../CustomHooks/useDialog';

export function Login() {

    const { showDialog } = useDialog()


    return (
        <div className="app flex-row align-items-center">
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-custom btn-block px-2 pointer" onClick={() => {
                            showDialog('Hello', DialogBodyForm, { title: '1' }, false).onOk((payload) => {
                                console.log('Ok Clicked and returned ' + payload)
                            }).onCancel(() => {
                                console.log('Cancel Clicked')
                            })

                        }}>Add Dialog</button>
                    </div>
                </div>

            </div>
        </div>


    )

}
