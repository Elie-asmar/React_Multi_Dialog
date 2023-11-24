import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react'
import { useCallback } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextProvider/AuthContext';
import { LoadingContext } from '../ContextProvider/LoadingContext';

import { SubmitButton } from '../ReusableComponents/Buttons/SubmitButton';
import { PasswordInput } from '../ReusableComponents/Inputs/PasswordInput';
import { TextInput } from '../ReusableComponents/Inputs/TextInput'
import { setSessionInfo } from '../utils/session'
import { awaitableTimeOut, FetchData, FetchData_New } from '../utils/functions'
import { authUrlPath, urlPath } from '../globals';
import { DialogContext } from '../ContextProvider/DialogContext';
import { DialogBodyForm } from './DialogFormTest/DialogBodyForm';
import useDialog from '../CustomHooks/useDialog';
// import { DialogBodyForm } from 'src/Forms/DialogFormTest/DialogBodyForm'


export function Login() {

    const { showDialog } = useDialog()




    return (
        <div className="app flex-row align-items-center">
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-custom btn-block px-2 pointer" onClick={() => {
                            console.log(showDialog().onOk)
                            showDialog(DialogBodyForm, { title: '1' }).onOk(() => {
                                console.log('Ok Clicked')
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
