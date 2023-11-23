import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { InvoicingClassesDefinition } from './InvoicingClassesDefinition';
import { InvoicingClassesDefinitionList } from './InvoicingClassesDefinitionList';

export function InvoicingClassesRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const InvoiceClassDefWithRouter = useRef(withRouter(InvoicingClassesDefinition));

    return (
        <Routes  >

            <Route path='' element={<InvoicingClassesDefinitionList uuid="D8F706A2-EDF5-48E2-A4A1-BF2D04FEBAF7" />} />
            <Route path='add' element={<InvoiceClassDefWithRouter.current uuid='D8F706A2-EDF5-48E2-A4A1-BF2D04FEBAF7' />} />
            <Route path='edit' element={<InvoiceClassDefWithRouter.current uuid='D8F706A2-EDF5-48E2-A4A1-BF2D04FEBAF7' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
