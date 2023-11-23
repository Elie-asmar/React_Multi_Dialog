import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater'
import { sysFileMemoCb } from '../helpers'
import { RowContainer } from '../RowContainer'
import { RadioControlsSection } from './RadioControls'

export default React.memo(function RadioControls({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "R_C");

    const { Sys_RdERApp = "Y", Sys_RdBedER = "N", Sys_RdStTime = null, Sys_RdEndTime = null, Sys_RdIntervalTime = "", Sys_RISApp = "", Sys_RdSpcHdr = "", Sys_ReqFromRIS } = state ?? {};

    const radioControlsProps = {
        Sys_RdERApp,
        Sys_RdBedER,
        Sys_RdStTime,
        Sys_RdEndTime,
        Sys_RdIntervalTime,
        Sys_RISApp,
        Sys_RdSpcHdr,
        Sys_ReqFromRIS
    }

    return (
        <div className="animated fadeIn activeComponent">
            <RowContainer>
                <RadioControlsSection {...radioControlsProps} handleChange={handleChange} handleDateTimeChange={handleDateTimeChange} handleBlur={handleBlur} />
            </RowContainer>
        </div>
    )
}, sysFileMemoCb)
