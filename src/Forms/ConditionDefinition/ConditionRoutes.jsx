import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { ConditionDefinitionList } from './ConditionDefinitionList';
import { ConditionDefinition } from './ConditionDefinition';

export function ConditionRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const CondDefWithRouter = useRef(withRouter(ConditionDefinition));

    return (
        <Routes  >

            <Route path='' element={<ConditionDefinitionList uuid="44452F9F-33B2-4DE7-9D47-049780BEDAC0" />} />
            <Route path='add' element={<CondDefWithRouter.current uuid='44452F9F-33B2-4DE7-9D47-049780BEDAC0' />} />
            <Route path='edit' element={<CondDefWithRouter.current uuid='44452F9F-33B2-4DE7-9D47-049780BEDAC0' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
