import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { CoverageGrpDefinition } from './CoverageGrpDefinition';
import { CoverageGrpDefinitionList } from './CoverageGrpDefinitionList';

export function CoverageGrpRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const CovGrpDefWithRouter = useRef(withRouter(CoverageGrpDefinition));

    return (
        <Routes  >

            <Route path='' element={<CoverageGrpDefinitionList uuid="6F9B7D73-0185-49B6-87A6-8B86B522F74F" />} />
            <Route path='add' element={<CovGrpDefWithRouter.current uuid='6F9B7D73-0185-49B6-87A6-8B86B522F74F' />} />
            <Route path='edit' element={<CovGrpDefWithRouter.current uuid='6F9B7D73-0185-49B6-87A6-8B86B522F74F' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
