import React, { useMemo, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import { withRouter } from '../../ReusableComponents/Other/WithRouter/withRouter';
import { ConnectionInfoDefinition } from './ConnectionInfoDefinition';
import { ConnectionInfoList } from './ConnectionInfoList';

export function ConnectionInfoRoutes() {
    //Use reference to create the NatDefWithRouter only once and not on every re-render.
    const ConDefWithRouter = useRef(withRouter(ConnectionInfoDefinition));

    return (
        <Routes  >

            <Route path='' element={<ConnectionInfoList uuid="1A0DF8DD-2B29-4510-AA04-F919073D5C97" />} />
            <Route path='add' element={<ConDefWithRouter.current uuid='1A0DF8DD-2B29-4510-AA04-F919073D5C97' />} />
            <Route path='edit' element={<ConDefWithRouter.current uuid='1A0DF8DD-2B29-4510-AA04-F919073D5C97' />} />
            <Route path='*' element={<Navigate to="" />} />

        </Routes>
    )
}
