import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { HospitalityClassesDefinition } from './HospitalityClassesDefinition';
import { HospitalityClassesDefinitionList } from './HospitalityClassesDefinitionList';

export function HospitalityClassesDefinitionRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const HospClassesDefWithRouter = useRef(withRouter(HospitalityClassesDefinition));

    return (
        <Routes  >

            <Route path='' element={<HospitalityClassesDefinitionList uuid="36851309-4A68-4370-B718-098B0222615F" />} />
            <Route path='add' element={<HospClassesDefWithRouter.current uuid='36851309-4A68-4370-B718-098B0222615F' />} />
            <Route path='edit' element={<HospClassesDefWithRouter.current uuid='36851309-4A68-4370-B718-098B0222615F' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
