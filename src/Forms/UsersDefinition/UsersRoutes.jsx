import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { UsersDefinition } from './UsersDefinition';
import { UsersDefinitionList } from './UsersDefinitionList'

export function UsersRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const UWithRouter = useRef(withRouter(UsersDefinition));

    return (
        <Routes  >

            <Route path='' element={<UsersDefinitionList uuid="2CBDAB48-86AA-4459-AABD-8B675DC0099B" />} />
            <Route path='add' element={<UWithRouter.current uuid='2CBDAB48-86AA-4459-AABD-8B675DC0099B' />} />
            <Route path='edit' element={<UWithRouter.current uuid='2CBDAB48-86AA-4459-AABD-8B675DC0099B' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
