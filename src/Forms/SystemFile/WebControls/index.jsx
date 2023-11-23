import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';
import { sysFileMemoCb } from '../helpers';
import { LowerComponent } from './LowerComponent';
import { MidComponent } from './MidComponent';
import UpperComponent from './UpperComponent';

export default React.memo(function WebControls({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "W_C");

    const { } = state ?? {};

    return <div className="animated fadeIn activeComponent">
        <UpperComponent />
        <MidComponent />
        <LowerComponent />
    </div>

}, sysFileMemoCb)