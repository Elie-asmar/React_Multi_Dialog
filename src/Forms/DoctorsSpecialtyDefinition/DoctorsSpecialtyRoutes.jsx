import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { DoctorsSpecialtyDefinitionList } from './DoctorsSpecialtyDefinitionList';
import { DoctorsSpecialtyDefinition } from './DoctorsSpecialtyDefinition';

export function DoctorsSpecialtyRoutes() {
    //Use reference to create the DocSpecialtyDefWithRouter only once and not on every re-render.
    const DocSpecialtyDefWithRouter = useRef(withRouter(DoctorsSpecialtyDefinition));

    return (
        <Routes  >

            <Route path='' element={<DoctorsSpecialtyDefinitionList uuid="B10B203F-7B11-492F-8DFF-49C01535B176" />} />
            <Route path='add' element={<DocSpecialtyDefWithRouter.current uuid='B10B203F-7B11-492F-8DFF-49C01535B176' />} />
            <Route path='edit' element={<DocSpecialtyDefWithRouter.current uuid='B10B203F-7B11-492F-8DFF-49C01535B176' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
