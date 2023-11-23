import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import SelectComp from '../../../ReusableComponents/Other/SelectComponent/SelectComponent'

export function MedicalFile({ handleChange, handleBlur, ...restProps }) {

    const { Sys_CardLstNo, Sys_CardPrefix, Sys_GenMFOutPat, Sys_MedLstNo, Sys_MedPrefix } = restProps;

    // #region Rendering
    return <div className="col-6 mt-3 mb-3">
        <div className="row">
            <div id="MedicalFileContainer" className="col-md-12 title mb-4 p-0">Medical File No.</div>
        </div>
        <div className='col-12'>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-2 required ">Medical File No. For Babies</div>
                <div className="col-sm-4 col-lg-4 col-xl-10">
                    <SelectComp
                        value={null}
                        onChange={handleChange}
                        name="folio"
                        options={[]}
                        className=""
                        clearable
                        disabled={false}
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-2 required ">Medical File No. Prefix</div>
                <div className="col-sm-4 col-lg-4 col-xl-4">
                    <InputTextComp
                        value={Sys_MedPrefix}
                        name="Sys_MedPrefix"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                    />
                </div>
                <div className="col-sm-3 col-lg-3 col-xl-2 required">Medical File Last No.</div>
                <div className="col-sm-2 col-lg-2 col-xl-4">
                    <InputTextComp
                        value={Sys_MedLstNo}
                        name="Sys_MedLstNo"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-2 required ">HIS Card Prefix</div>
                <div className="col-sm-4 col-lg-4 col-xl-4">
                    <InputTextComp
                        value={Sys_CardPrefix}
                        name="Sys_CardPrefix"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                    />
                </div>
                <div className="col-sm-3 col-lg-3 col-xl-2 required">HIS Card Last No.</div>
                <div className="col-sm-2 col-lg-2 col-xl-4">
                    <InputTextComp
                        value={Sys_CardLstNo}
                        name="Sys_CardLstNo"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-12">
                    <CheckBoxComp
                        checked={Sys_GenMFOutPat === "Y" ? true : false}
                        onCheckChange={handleChange}
                        increaseArea
                        name={"Sys_GenMFOutPat"}
                        disabled={false}
                        description={"Generate M / F # For Out Patients (Y/N)"}
                    />
                </div>
            </div>
        </div>
    </div>
}
