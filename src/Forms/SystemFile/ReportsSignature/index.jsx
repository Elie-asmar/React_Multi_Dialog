import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';
import { sysFileMemoCb } from '../helpers';
import { RowContainer } from '../RowContainer';

export default React.memo(function ReportsSignature({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "W_C");

    const { } = state ?? {};

    return <div className="animated fadeIn activeComponent">
    </div>

}, sysFileMemoCb)