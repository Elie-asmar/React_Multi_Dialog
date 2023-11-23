import React, { useCallback, useMemo } from 'react'
import { sysFileMemoCb, } from '../helpers';
import { HospitaInformation } from './HospitaInformation';
import { RowContainer } from "../RowContainer";
import { Dictionary } from './Dictionary'
import { MedicalFile } from './MedicalFile'
import { GeneralCounters } from "./GeneralCounters";
import { Printing } from "./Printing";
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';

export default React.memo(function HospitalInfo({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "H_I");

    const { Sys_HoCode = "", Sys_HisLogo = "", Sys_HoName = "", Sys_InstDate = "", Sys_Clipper = "", Sys_CleaningPhaseActive = "", Sys_Vers = "", Sys_ActDict = "N", Sys_CardLstNo = "", Sys_CardPrefix = "", Sys_GenMFOutPat = "N", Sys_LeftMargin = "", Sys_MedLstNo = "", Sys_MedPrefix = "", Sys_TopMargin = "", Sys_AcceptNames = "", Sys_Comp = "" } = state ?? {};

    const hospitaInformationProps = { Sys_HoCode, Sys_HisLogo, Sys_HoName, Sys_InstDate, Sys_Clipper, Sys_CleaningPhaseActive, Sys_Vers, Sys_Comp };
    const medicalFileProps = { Sys_CardLstNo, Sys_CardPrefix, Sys_GenMFOutPat, Sys_MedLstNo, Sys_MedPrefix }
    const dictionaryProps = { Sys_ActDict, Sys_AcceptNames }
    const printingProps = { Sys_LeftMargin, Sys_TopMargin };

    // #region Rendering
    return <div className="animated fadeIn activeComponent">
        <HospitaInformation {...hospitaInformationProps} handleChange={handleChange} handleBlur={handleBlur} handleDateTimeChange={handleDateTimeChange} />
        <RowContainer>
            <MedicalFile {...medicalFileProps} handleChange={handleChange} handleBlur={handleBlur} />
            <Dictionary {...dictionaryProps} handleChange={handleChange} />
        </RowContainer>
        <RowContainer>
            <GeneralCounters handleChange={handleChange} handleBlur={handleBlur} />
            <Printing {...printingProps} handleChange={handleChange} handleBlur={handleBlur} />
        </RowContainer>
    </div>

}, sysFileMemoCb)
