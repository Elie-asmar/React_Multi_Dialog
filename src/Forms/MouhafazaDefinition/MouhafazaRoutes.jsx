import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { MouhafazaDefinitionList } from './MouhafazaDefinitionList';
import { MouhafazaDefinition } from './MouhafazaDefinition';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';

export function MouhafazaRoutes() {
    //Use reference to create the MouhDefWithRouter only once and not on every re-render.
    const MouhDefWithRouter = useRef(withRouter(MouhafazaDefinition));

    return (
        <Routes  >

            <Route path='' element={<MouhafazaDefinitionList uuid="E9CE6A40-4642-45DB-82B5-AFAFB4807A31" />} />
            <Route path='add' element={<MouhDefWithRouter.current uuid="E9CE6A40-4642-45DB-82B5-AFAFB4807A31" />} />
            <Route path='edit' element={<MouhDefWithRouter.current uuid="E9CE6A40-4642-45DB-82B5-AFAFB4807A31" />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
