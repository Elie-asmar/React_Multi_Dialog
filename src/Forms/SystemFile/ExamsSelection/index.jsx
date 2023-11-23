import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';
import { sysFileMemoCb } from '../helpers'
import { RowContainer } from '../RowContainer';
import { GeneralExams } from './GeneralExams';
import { Laboratory } from './Laboratory';
import { Radiology } from './Radiology';

export default React.memo(function ExamsSelection({ changeState, state }) {


    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "E_S_C");

    return <div className="animated fadeIn activeComponent">
        <Laboratory />
        <Radiology />
        <GeneralExams />
    </div>
}, sysFileMemoCb);

