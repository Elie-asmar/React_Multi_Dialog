import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';
import { sysFileMemoCb } from '../helpers';
import { RowContainer } from '../RowContainer';
import { AccDataDoc } from './AccDataDoc';
import { GenAccData } from './GenAccData';
import { MaxDiscAcc } from './MaxDiscAcc';

export default React.memo(function Accounting({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "ACC");

    const { } = state ?? {};

    return <div className="animated fadeIn activeComponent">
        <AccDataDoc />
        <GenAccData />
        <MaxDiscAcc />
    </div>

}, sysFileMemoCb)