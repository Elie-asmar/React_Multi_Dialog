import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { KazaDefinitionList } from './KazaDefinitionList';
import { KazaDefinition } from './KazaDefinition';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';

export function KazaRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.

    const KazDefWithRouter = useRef(withRouter(KazaDefinition));

    return (
        <Routes  >

            <Route path='' element={<KazaDefinitionList uuid="770562FD-3FA9-415A-B35C-70F04FDE8E18" />} />
            <Route path='add' element={<KazDefWithRouter.current uuid="770562FD-3FA9-415A-B35C-70F04FDE8E18" />} />
            <Route path='edit' element={<KazDefWithRouter.current uuid="770562FD-3FA9-415A-B35C-70F04FDE8E18" />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
