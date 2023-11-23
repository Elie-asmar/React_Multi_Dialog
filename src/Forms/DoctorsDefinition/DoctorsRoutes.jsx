import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { DoctorsDefinitionList } from './DoctorsDefinitionList';
import { DoctorsDefinition } from './DoctorsDefinition';

export function DoctorsRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const DocDefWithRouter = useRef(withRouter(DoctorsDefinition));

    return (
        <Routes  >

            <Route path='' element={<DoctorsDefinitionList uuid="B10B203F-7B11-492F-8DFF-49C01535B176" />} />
            <Route path='add' element={<DocDefWithRouter.current uuid='B10B203F-7B11-492F-8DFF-49C01535B176' />} />
            <Route path='edit' element={<DocDefWithRouter.current uuid='B10B203F-7B11-492F-8DFF-49C01535B176' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
