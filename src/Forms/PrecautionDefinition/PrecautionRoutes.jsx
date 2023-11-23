import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { PrecautionDefinitionList } from './PrecautionDefinitionList';
import { PrecautionDefinition } from './PrecautionDefinition';

export function PrecautionRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const PrecDefWithRouter = useRef(withRouter(PrecautionDefinition));

    return (
        <Routes  >

            <Route path='' element={<PrecautionDefinitionList uuid="C5D0F15E-975F-4E23-AF06-07541EF3A7D6" />} />
            <Route path='add' element={<PrecDefWithRouter.current uuid='C5D0F15E-975F-4E23-AF06-07541EF3A7D6' />} />
            <Route path='edit' element={<PrecDefWithRouter.current uuid='C5D0F15E-975F-4E23-AF06-07541EF3A7D6' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
