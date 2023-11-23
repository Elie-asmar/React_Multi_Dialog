import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfessionDefinitionList } from './ProfessionsDefinitionList';
import { ProfessionDefinition } from './ProfessionDefinition';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';

export function ProfessionRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.

    const ProfDefWithRouter = useRef(withRouter(ProfessionDefinition));

    return (
        <Routes  >
            <Route path='' element={<ProfessionDefinitionList uuid="548C207B-8AEA-4DB4-A0D3-631212BAF3F1" />} />
            <Route path='add' element={<ProfDefWithRouter.current uuid="548C207B-8AEA-4DB4-A0D3-631212BAF3F1" />} />
            <Route path='edit' element={<ProfDefWithRouter.current uuid="548C207B-8AEA-4DB4-A0D3-631212BAF3F1" />} />
            <Route path='*' element={<Navigate to="" />} />
        </Routes>
    )
}
