import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { DepartmentsDefinition } from './DepartmentsDefinition';
import { DepartmentsDefinitionList } from './DepartmentsDefinitionList'

export function DepartmentsRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const DepWithRouter = useRef(withRouter(DepartmentsDefinition));

    return (
        <Routes  >

            <Route path='' element={<DepartmentsDefinitionList uuid="133259F9-20D9-479E-B650-DE2E3CB048B3" />} />
            <Route path='add' element={<DepWithRouter.current uuid='133259F9-20D9-479E-B650-DE2E3CB048B3' />} />
            <Route path='edit' element={<DepWithRouter.current uuid='133259F9-20D9-479E-B650-DE2E3CB048B3' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
