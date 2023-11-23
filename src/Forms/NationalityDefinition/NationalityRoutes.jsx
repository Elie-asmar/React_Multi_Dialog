import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { NationalityDefinitionList } from './NationalityDefinitionList';
import { NationalityDefinition } from './NationalityDefinition';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';

export function NationalityRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const NatDefWithRouter = useRef(withRouter(NationalityDefinition));

    return (
        <Routes  >

            <Route path='' element={<NationalityDefinitionList uuid="B10B203F-7B11-492F-8DFF-49C01535B176" />} />
            <Route path='add' element={<NatDefWithRouter.current uuid='B10B203F-7B11-492F-8DFF-49C01535B176' />} />
            <Route path='edit' element={<NatDefWithRouter.current uuid='B10B203F-7B11-492F-8DFF-49C01535B176' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
