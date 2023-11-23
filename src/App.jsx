import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthenticationContainer } from './Containers/AuthenticationContainer';
import { LoadingContainer } from './Containers/LoadingContainer';
import { LoadingContext } from './ContextProvider/LoadingContext';
import { Full } from './Components/MainMenu/Full';
import { Login } from './Forms/Login';
import { SettingsContext } from './ContextProvider/SettingsContext'
import { useFetchData } from './CustomHooks/APIs/useFetchData';
import { ErrorContainer } from './Containers/ErrorContainer';
import { SystemFileRoutes } from './Forms/SystemFile/SystemFileRoutes';
import { NationalityDefinitionList } from './Forms/NationalityDefinition/NationalityDefinitionList';
import { NationalityRoutes } from './Forms/NationalityDefinition/NationalityRoutes';
import { UserGroupsRoutes } from './Forms/UserGroupsDefinition/UserGroupsRoutes';
import { ConnectionInfoRoutes } from './Forms/ConnectionInfoDefinition/ConnectionInfoRoutes';
import { MenuBackground } from './Forms/MenuBackground/MenuBackground';
import { ReligionRoutes } from './Forms/ReligionDefinition/ReligionRoutes';
import { MouhafazaRoutes } from './Forms/MouhafazaDefinition/MouhafazaRoutes';
import { KazaRoutes } from './Forms/KazaDefinition/KazaRoutes';
import { ProfessionRoutes } from './Forms/ProfessionsDefinition/ProfessionsRoutes';
import { RegionRoutes } from './Forms/RegionDefinition/RegionRoutes';
import { HospitalRoutes } from './Forms/HospitalDefinition/HospitalRoutes';
import { LinkUsersToGroups } from './Forms/LinkUsersToGroups/LinkUsersToGroups';
import { DoctorsSpecialtyRoutes } from './Forms/DoctorsSpecialtyDefinition/DoctorsSpecialtyRoutes';
import { UsersRoutes } from './Forms/UsersDefinition/UsersRoutes';
import { PoolDefinitionRoutes } from './Forms/PoolDefinition/PoolDefinitionRoutes';
import { DepartmentsDefinition } from './Forms/DepartmentsDefinition/DepartmentsDefinition';
import { DepartmentsRoutes } from './Forms/DepartmentsDefinition/DepartmentsRoutes';

import { UsersPrivileges } from './Forms/UsersPrivileges/UsersPrivileges';
import { HospitalityClassesDefinitionRoutes } from './Forms/HospitalClassesDefinition/HospitalityClassesDefinitionRoutes';
import { InvoicingClassesRoutes } from './Forms/InvoicingClassesDefinition/InvoicingClassesRoutes';
import { CoverageTypesDefRoutes } from './Forms/CoverageTypesDefinition/CoverageTypesDefRoutes';
import { CoverageGrpRoutes } from './Forms/CoverageGrpDefinition/CoverageGrpRoutes';
import axios from 'axios';
import { cloneDeep, has, identity, isArray } from 'lodash';
import { getSessionInfo } from './utils/session';
import { DoctorsRoutes } from './Forms/DoctorsDefinition/DoctorsRoutes';
import { GeneralDiagnosisRoutes } from './Forms/GeneralDiagnosis/GeneralDiagnosisRoutes';
import { DietRoutes } from './Forms/DietDefinition/DietRoutes';
import { ActivityRoutes } from './Forms/ActivityDefinition/ActivityRoutes';
import { ConditionRoutes } from './Forms/ConditionDefinition/ConditionRoutes';
import { PrecautionRoutes } from './Forms/PrecautionDefinition/PrecautionRoutes';


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
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Full />}>
              {/*To understand the '*' part of this route, read the Descendant Routes section of the Router documentation. */}
              <Route path='SystemFile/*' element={<SystemFileRoutes />} />
              <Route path='Nationality/*' element={<NationalityRoutes />} />
              <Route path='UserGroupsDef/*' element={<UserGroupsRoutes />} />
              <Route path='ConnInfoDef/*' element={<ConnectionInfoRoutes />} />
              <Route path='MenuBackGround' element={<MenuBackground />} />
              <Route path='ReligionDef' element={<ReligionRoutes />} />
              <Route path='MouhafazaDef/*' element={<MouhafazaRoutes />} />
              <Route path='KazaDef/*' element={<KazaRoutes />} />
              <Route path='ProfessionDef/*' element={<ProfessionRoutes />} />
              <Route path='ReligionDef/*' element={<ReligionRoutes />} />
              <Route path='RegionDef/*' element={<RegionRoutes />} />
              <Route path='HospitalDef/*' element={<HospitalRoutes />} />
              <Route path='UsersDefinition/*' element={<UsersRoutes />} />
              <Route path='DepartmentsDefinition/*' element={<DepartmentsRoutes />} />

              <Route path='LinkUsrsToGrps/*' element={<LinkUsersToGroups uuid="41407F5F-77EC-4DA8-B3AE-E9B9BC45975D" />} />
              <Route path='UserPrivileges/*' element={<UsersPrivileges uuid="ED5246D9-D8A2-4A00-9354-3836AD7482D7" />} />

              <Route path='DoctorSpecialtyDef/*' element={<DoctorsSpecialtyRoutes />} />
              <Route path='PoolDefinition/*' element={<PoolDefinitionRoutes />} />
              <Route path='HospitalDefinition/*' element={<HospitalityClassesDefinitionRoutes />} />
              <Route path='InvoicingClassDef/*' element={<InvoicingClassesRoutes />} />
              <Route path='CovTypeDefinition/*' element={<CoverageTypesDefRoutes />} />
              <Route path='CovGroupDefinition/*' element={<CoverageGrpRoutes />} />
              <Route path='DoctorsDefinition/*' element={<DoctorsRoutes />} />
              <Route path='GeneralDiagnosisDef/*' element={<GeneralDiagnosisRoutes />} />
              <Route path='DietDefinition/*' element={<DietRoutes />} />
              <Route path='ActivityDefinition/*' element={<ActivityRoutes />} />
              <Route path='ConditionDefinition/*' element={<ConditionRoutes />} />
              <Route path='PrecautionDefinition/*' element={<PrecautionRoutes />} />

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
