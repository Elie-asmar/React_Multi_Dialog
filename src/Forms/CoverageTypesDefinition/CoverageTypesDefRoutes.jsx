import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { CoverageTypesDefList } from './CoverageTypesDefList';
import { CoverageTypesDef } from './CoverageTypesDef';

export function CoverageTypesDefRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const CovTypeDefWithRouter = useRef(withRouter(CoverageTypesDef));

    return (
        <Routes  >

            <Route path='' element={<CoverageTypesDefList uuid="B10B203F-7B11-492F-8DFF-49C01535B176" />} />
            <Route path='add' element={<CovTypeDefWithRouter.current uuid='B10B203F-7B11-492F-8DFF-49C01535B176' />} />
            <Route path='edit' element={<CovTypeDefWithRouter.current uuid='B10B203F-7B11-492F-8DFF-49C01535B176' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
