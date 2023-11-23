import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { DietDefinition } from './DietDefinition';
import { DietDefinitionList } from './DietDefinitionList';

export function DietRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const DietDefWithRouter = useRef(withRouter(DietDefinition));

    return (
        <Routes  >

            <Route path='' element={<DietDefinitionList uuid="3CAC686C-68BD-4260-B43C-FEA6E0829E78" />} />
            <Route path='add' element={<DietDefWithRouter.current uuid='3CAC686C-68BD-4260-B43C-FEA6E0829E78' />} />
            <Route path='edit' element={<DietDefWithRouter.current uuid='3CAC686C-68BD-4260-B43C-FEA6E0829E78' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
