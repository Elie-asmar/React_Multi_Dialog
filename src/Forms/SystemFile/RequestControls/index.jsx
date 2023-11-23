import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';
import { sysFileMemoCb } from '../helpers'
import { RowContainer } from '../RowContainer';
import { CancelRequest } from './CancelRequest';
import { DTTFR } from './DTTFR';
import { LowerLeftComponent } from './LowerLeftComponent';
import { LowerRightComponent } from './LowerRightComponent';
import { MidLeftComponent } from './MidLeftComponent';
import { MidRightComponent } from './MidRightComponent';
import { UpperRightComponent } from './UpperRightComponent';

export default React.memo(function RequestControls({ changeState, state }) {


    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "REQ_C");
    const { } = state ?? {};

    return <div className="animated fadeIn activeComponent">
        <RowContainer>
            <DTTFR />
            <CancelRequest />
            <UpperRightComponent />
        </RowContainer>
        <RowContainer>
            <MidLeftComponent />
            <MidRightComponent />
        </RowContainer>
        <RowContainer>
            <LowerLeftComponent />
            <LowerRightComponent />
        </RowContainer>
    </div>
}, sysFileMemoCb);

