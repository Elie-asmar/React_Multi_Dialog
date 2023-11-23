import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthenticationContainer } from './Containers/AuthenticationContainer';
import { LoadingContainer } from './Containers/LoadingContainer';
import { LoadingContext } from './ContextProvider/LoadingContext';
import { Login } from './Forms/Login';
import { SettingsContext } from './ContextProvider/SettingsContext'
import { useFetchData } from './CustomHooks/APIs/useFetchData';
import { ErrorContainer } from './Containers/ErrorContainer';
import { DialogContainer } from './Containers/DialogContainer';


function App() {

  // const [systemSettings, error] = useFetchData('DataFiles/Settings.json', 'get');
  const [userLogin, setUserLogin] = useState(null);
  const [buttonSaveClicked, setbuttonSaveClicked] = useState(false);

  const { Settings, setSystemSettings } = useContext(SettingsContext);
  const { isLoading, setisLoading } = useContext(LoadingContext);

  const [SystemSettings] = useFetchData('DataFiles/Settings.json', 'get');



  useEffect(() => {
    if (SystemSettings) {
      setSystemSettings({ ...Settings, SystemSettings: SystemSettings })
    }
  }, [SystemSettings]);

  useEffect(() => {


  }, [])


  return (
    <Routes>
      <Route element={<ErrorContainer />}>
        <Route element={<LoadingContainer />}>
          <Route element={<AuthenticationContainer />}>
            <Route element={<DialogContainer />}>
              <Route path='/login' element={<Login />} />



            </Route>
          </Route>
        </Route>


        {/* <Route path='/' element={<Login />}></Route>
        <Route element={userLogin ? <Outlet /> : <RedirectToLogin />} >
          <Route path="/Full" element={<Full />}>
            <Route path="Admission" element={<Admission mode="add" />} />
            <Route path="Admission/edit" element={<RedirectToLogin mode="edit" />} />
          </Route>
          <Route path="/Simple" element={<Simple />} />
        </Route> */}

      </Route>
    </Routes >

  );
}

export default App;
