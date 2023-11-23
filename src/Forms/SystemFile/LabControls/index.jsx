import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater'
import { sysFileMemoCb } from '../helpers'
import { RowContainer } from '../RowContainer'
import { BloodGroupControls } from './BloodGroupControls'
import { LabControlsSection } from './LabControls'

export default React.memo(function LabControls({ changeState, state }) {

  const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "L_C");

  const { Sys_LbERApp = "Y", Sys_SendExam = "N", Sys_LbStTime = null, Sys_LbEndTime = null, Sys_LbIntervalTime = "", Sys_LbSpcHdr = "" } = state ?? {};

  const labControlsSectionProps = { Sys_LbERApp, Sys_SendExam, Sys_LbStTime, Sys_LbEndTime, Sys_LbIntervalTime, Sys_LbSpcHdr };


  return (
    <div className="animated fadeIn activeComponent">
      <RowContainer>
        <LabControlsSection {...labControlsSectionProps} handleChange={handleChange} handleDateTimeChange={handleDateTimeChange} handleBlur={handleBlur} />
        <BloodGroupControls />
      </RowContainer>
    </div>
  )
}, sysFileMemoCb)
