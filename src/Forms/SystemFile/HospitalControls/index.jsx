import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';
import { sysFileMemoCb } from '../helpers'
import { HospitalClassification } from './HospitalClassification';
import { RowContainer } from '../RowContainer'
import { SameNameAlert } from './SameNameAlert';
import { Authorizations } from './Authorizations';
import { DPIB } from './DPIB';
import { Alerts } from './Alerts';
import { Controls } from './Controls';
import { VatReg } from './VatReg';
import { Activation } from './Activation';
import { Labels } from './Labels';
import { AgeCalc } from './AgeCalc';


export default React.memo(function HospitalControls({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "H_C");

    const { } = state ?? {};

    return <div className="animated fadeIn activeComponent">
        <RowContainer>
            <HospitalClassification handleChange={handleChange} handleBlur={handleBlur} />
            <SameNameAlert handleChange={handleChange} />
            <div className='col-1' />
            <Authorizations />
        </RowContainer>
        <RowContainer>
            <DPIB />
            <Alerts />
            <Controls />
        </RowContainer>
        <RowContainer>
            <VatReg />
            <Activation />
            <Labels />
        </RowContainer>
        <RowContainer>
            <AgeCalc />
        </RowContainer>
    </div>

}, sysFileMemoCb)
