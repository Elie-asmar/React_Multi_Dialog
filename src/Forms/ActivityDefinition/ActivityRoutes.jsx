import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { ActivityDefinition } from './ActivityDefinition';
import { ActivityDefinitionList } from './ActivityDefinitionList';

export function ActivityRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const ActDefWithRouter = useRef(withRouter(ActivityDefinition));

    return (
        <Routes  >

            <Route path='' element={<ActivityDefinitionList uuid="1D363DAA-42DC-4B1E-A0A5-5DC4488F8748" />} />
            <Route path='add' element={<ActDefWithRouter.current uuid='1D363DAA-42DC-4B1E-A0A5-5DC4488F8748' />} />
            <Route path='edit' element={<ActDefWithRouter.current uuid='1D363DAA-42DC-4B1E-A0A5-5DC4488F8748' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
