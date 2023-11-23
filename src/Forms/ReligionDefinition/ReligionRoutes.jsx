import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { ReligionDefinition } from './ReligionDefinition';
import { ReligionDefinitionList } from './ReligionDefinitionList';

export function ReligionRoutes() {
    //Use reference to create the RelDefWithRouter only once and not on every re-render.
    const RelDefWithRouter = useRef(withRouter(ReligionDefinition));

    return (
        <Routes  >

            <Route path='' element={<ReligionDefinitionList uuid="60A84467-1A54-4A0F-806A-9952D32C30D1" />} />
            <Route path='add' element={<RelDefWithRouter.current uuid='60A84467-1A54-4A0F-806A-9952D32C30D1' />} />
            <Route path='edit' element={<RelDefWithRouter.current uuid='60A84467-1A54-4A0F-806A-9952D32C30D1' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
