import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';
import { sysFileMemoCb } from '../helpers'
import { RowContainer } from '../RowContainer';
import { CRUM } from './CRUM';
import { PrintingInfo } from './PrintingInfo';
import { Remarks } from './Remarks';

export default React.memo(function HospitalRemarks({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "H_R");

    const { } = state ?? {};


    return <div className="animated fadeIn activeComponent">
        <Remarks />
        <RowContainer>
            <PrintingInfo />
            <CRUM />
        </RowContainer>
    </div>

}, sysFileMemoCb)