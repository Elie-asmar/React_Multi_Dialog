import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import {  RegionDefinitionList } from './RegionDefinitionList';
import { RegionDefinition } from './RegionDefinition';

export function RegionRoutes() {
    //Use reference to create the RegionDefWithRouter only once and not on every re-render.
    const RegionDefWithRouter = useRef(withRouter(RegionDefinition));

    return (
        <Routes  >

            <Route path='' element={<RegionDefinitionList uuid="F4E396A6-F4AA-489B-A6EE-BE209BB4FBCB" />} />
            <Route path='add' element={<RegionDefWithRouter.current uuid='F4E396A6-F4AA-489B-A6EE-BE209BB4FBCB' />} />
            <Route path='edit' element={<RegionDefWithRouter.current uuid='F4E396A6-F4AA-489B-A6EE-BE209BB4FBCB' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
