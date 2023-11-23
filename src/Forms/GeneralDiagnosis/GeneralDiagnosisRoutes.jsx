import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { GeneralDiagnosisDef } from './GeneralDiagnosisDef';
import { GeneralDiagnosisDefList } from './GeneralDiagnosisDefList';

export function GeneralDiagnosisRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const GenDiagDefWithRouter = useRef(withRouter(GeneralDiagnosisDef));

    return (
        <Routes  >

            <Route path='' element={<GeneralDiagnosisDefList uuid="963E9D34-C8AC-4B72-9F93-1235970A7907" />} />
            <Route path='add' element={<GenDiagDefWithRouter.current uuid='963E9D34-C8AC-4B72-9F93-1235970A7907' />} />
            <Route path='edit' element={<GenDiagDefWithRouter.current uuid='963E9D34-C8AC-4B72-9F93-1235970A7907' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
