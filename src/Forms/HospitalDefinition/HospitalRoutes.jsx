import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { HospitalDefinition } from './HospitalDefinition';
import { HospitalDefinitionList } from './HospitalDefinitionList';

export function HospitalRoutes() {
    //Use reference to create the HospDefWithRouter only once and not on every re-render.
    const HospDefWithRouter = useRef(withRouter(HospitalDefinition));

    return (
        <Routes  >

            <Route path='' element={<HospitalDefinitionList uuid="E13F2FAD-C96F-4082-A07B-3F4C58CBA669" />} />
            <Route path='add' element={<HospDefWithRouter.current uuid='E13F2FAD-C96F-4082-A07B-3F4C58CBA669' />} />
            <Route path='edit' element={<HospDefWithRouter.current uuid='E13F2FAD-C96F-4082-A07B-3F4C58CBA669' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
