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


export function Login() {
    const STATE = {
        username: '',
        password: '',
        errorUserClass: "",
        errorUserTxt: "",
        errorPswdClass: "",
        errorPswdTxt: "",
        errorLoginTxt: "",
        pswdChangeSuccess: "",
        pswdChangeError: "",
        forgotPswd: false,
        active: false
    }
    const [state, setState] = useState(STATE);
    const { userData, setUserData } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);
    const navigate = useNavigate();
    const UsrRef = useRef(null);
    const PwdRef = useRef(null);
    const BtnRef = useRef(null);


    useEffect(() => {

        if (sessionStorage.getItem('token') === 'test') {
            navigate('/', { replace: true });
        }
        else {
            document.body.classList.add("gradientBg")
        }
        return () => {
            document.body.classList.remove("gradientBg");
        }
    }, [])

    const handleClick = useCallback(async () => {
        try {
            setState({ ...state, errorLoginTxt: '', pswdChangeSuccess: '', pswdChangeError: '' });
            setisLoading(prv => prv + 1)

            const username = state.username;
            const password = state.password;
            let isError = false;

            if (!username) {
                isError = true;
                setState({
                    ...state,
                    errorUserClass: "alert-danger",
                    errorUserTxt: "Please enter your user name",
                });
            }
            else {
                setState({
                    ...state,
                    errorUserClass: "",
                    errorUserTxt: "",
                });
            };

            if (!isError) {
                let resp = await FetchData(`${authUrlPath}`, 'post', { usr_code: username, usr_Pwrd: password });
                // debugger
                if (!resp.success) {
                    setState({ ...state, errorLoginTxpt: 'Invalid Login Parameters' });
                }
                else {
                    //debugger
                    let priv_resp = await FetchData('DataFiles/Privileges.json', 'get');

                    let obj = { userInfo: resp.data[0].userinfo, userPriv: priv_resp.data }
                    setSessionInfo('token', resp.data[0].access_token);
                    setSessionInfo('user', JSON.stringify(obj));
                    navigate('/', { replace: true });
                }



            }


        }
        catch (e) {
            throw e;
        }
        finally {
            setisLoading(prv => prv - 1)
        }


    }, [state])




    const OnTextChange = useCallback((id) => (e) => {
        switch (id) {
            case 'UCode':
                setState(prv => {
                    return { ...prv, username: e.target.value }
                })

                break;
            case 'Pass':
                setState(prv => {
                    return { ...prv, password: e.target.value }
                })
                break;
            default:
                break;
        }
    }, [])

    const handleKeyDown = useCallback(
        (event) => {

            if (event.key === 'Enter') {
                BtnRef.current.click();
            }
            else {

                switch (event.target) {
                    case UsrRef.current:
                        setState(prv => {
                            return {
                                ...prv,
                                errorUserClass: "",
                                errorUserTxt: "",
                                errorLoginTxt: ""
                            }
                        });
                        break;
                    case PwdRef.current:
                        setState(
                            prv => {
                                return {
                                    ...prv,
                                    errorPswdClass: "",
                                    errorPswdTxt: "",
                                    errorLoginTxt: ""
                                }
                            }
                        );
                        break;
                    default:
                        break;
                }

            }

        }, [])

    return (
        <div className="app flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card-group mb-0">

                            <div className="card nobg ">
                                <div className="card-block">
                                    <div className="mb-3"><img src="img/logo.png" className="loginHeader" alt="" /></div>

                                    <div className="input-group mb-1">
                                        <span className={`input-group-addon ${state.errorUserClass}`}><i className="icon-user"></i></span>
                                        <input type="text" ref={UsrRef}
                                            className={`form-control ${state.errorUserClass}`} placeholder="User Name"
                                            value={state.username} onChange={OnTextChange('UCode')}
                                            onKeyDown={handleKeyDown} autoFocus={true} />
                                    </div>


                                    <div className="input-group mb-2">
                                        <span className={`input-group-addon ${state.errorPswdClass}`}><i className="icon-lock"></i></span>
                                        <input type="password" ref={PwdRef}
                                            className={`form-control ${state.errorPswdClass}`} placeholder="Password"
                                            value={state.password} onChange={OnTextChange('Pass')}
                                            onKeyDown={handleKeyDown} />
                                    </div>

                                    <ul className="alert-container" style={{ position: "relative", display: "block" }}>
                                        <li className="alert-text alert-text-danger" style={{ display: `${state.errorUserClass ? "block" : "none"}` }}> {state.errorUserTxt}</li>
                                        <li className="alert-text alert-text-danger" style={{ display: `${state.errorPswdClass ? "block" : "none"}` }} > {state.errorPswdTxt}</li>
                                        <li className="alert-text alert-text-danger" style={{ display: `${state.errorLoginTxt ? "block" : "none"}` }}>{state.errorLoginTxt}</li>
                                    </ul>

                                    <div className="row">
                                        <div className="col-12">
                                            <button type="button" ref={BtnRef} className="btn btn-custom btn-block px-2 pointer" onClick={handleClick}>Login</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )

}
