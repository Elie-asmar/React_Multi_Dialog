import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { UserGroupsDefinition } from './UserGroupsDefinition';
import { UserGroupsList } from './UserGroupsList';

export function UserGroupsRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const UGWithRouter = useRef(withRouter(UserGroupsDefinition));

    return (
        <Routes  >

            <Route path='' element={<UserGroupsList uuid="37F34B2D-A195-47D2-9262-0A962951F64E" />} />
            <Route path='add' element={<UGWithRouter.current uuid='37F34B2D-A195-47D2-9262-0A962951F64E' />} />
            <Route path='edit' element={<UGWithRouter.current uuid='37F34B2D-A195-47D2-9262-0A962951F64E' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
