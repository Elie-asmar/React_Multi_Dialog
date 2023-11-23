import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { PoolDefinitionList } from './PoolDefinitionList';
import { PoolDefinition } from './PoolDefinition';

export function PoolDefinitionRoutes() {
    //Use reference to create the PoolDefWithRouter only once and not on every re-render.
    const PoolDefWithRouter = useRef(withRouter(PoolDefinition));

    return (
        <Routes  >

            <Route path='' element={<PoolDefinitionList uuid="2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B" />} />
            <Route path='add' element={<PoolDefWithRouter.current uuid='2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B' />} />
            <Route path='edit' element={<PoolDefWithRouter.current uuid='2AE6E2B1-7EE6-4099-9144-60ABB8AE5F1B' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
