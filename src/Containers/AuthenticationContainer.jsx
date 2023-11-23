import React, { useContext, useEffect } from 'react'
import { LoadingContext } from '../ContextProvider/LoadingContext';
import { AuthContext } from '../ContextProvider/AuthContext'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ErrorContext } from '../ContextProvider/ErrorContext';
import { setSessionInfo, getSessionInfo } from '../utils/session'

export function AuthenticationContainer() {
    const { userData, setUserData } = useContext(AuthContext);
    const { isLoading, setisLoading } = useContext(LoadingContext);
    const { setErrorMessage } = useContext(ErrorContext)
    const navigate = useNavigate();
    const location = useLocation();


    const CheckAuthenticationData = async () => {
        try {

            setisLoading(prv => prv + 1);

            if (!sessionStorage.getItem('token')) {
                navigate('/login', { replace: true });
            }
            else {
                if (!userData) {
                    setUserData(JSON.parse(getSessionInfo('user')))
                }
            }
        }
        catch (err) {

        }
        finally {
            //  setTimeout(() => {
            setisLoading(prv => prv - 1)
            // }, 1000);

        }
    }

    useEffect(() => {
        CheckAuthenticationData();

    }, [location.pathname])

    return <Outlet />
}
