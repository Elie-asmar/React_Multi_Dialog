import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import DateTimePickerComp from '../../../ReusableComponents/Other/DateTimePickerComp/DateTimePickerComp'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import SelectComp from '../../../ReusableComponents/Other/SelectComponent/SelectComponent'
import TextAreaComp from '../../../ReusableComponents/Other/TextAreaComp/TextAreaComp'
import { MnuBkGImgComp } from '../../MenuBackground/MnuBkGImgComp'

export function HospitaInformation({ handleChange, handleBlur, handleDateTimeChange, ...restProps }) {

    const { Sys_HoCode, Sys_InstDate, Sys_CleaningPhaseActive, Sys_Vers, Sys_HoName, Sys_Clipper, Sys_HisLogo, Sys_Comp } = restProps;

    // #region Rendering
    return <div className="row mt-3 mb-3">
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Hospital Information</div>
        </div>
        <div className='col-8'>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-2 required ">Hospital Code</div>
                <div className="col-sm-4 col-lg-4 col-xl-4">
                    <InputTextComp
                        value={Sys_HoCode}
                        name="Sys_HoCode"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                    />
                </div>
                <div className="col-sm-3 col-lg-3 col-xl-2 required">Company Code</div>
                <div className="col-sm-2 col-lg-2 col-xl-4">
                    <SelectComp
                        value={Sys_Comp}
                        name="Sys_Comp"
                        onChange={handleChange}
                        options={[]}
                        className=""
                        clearable
                        disabled={false}
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-2 required ">HIS Install Date</div>
                <div className="col-sm-4 col-lg-4 col-xl-4">
                    <DateTimePickerComp
                        selected={Sys_InstDate}
                        onDateTimeChange={handleDateTimeChange}
                        name="Sys_InstDate"
                        className={`form-contro`}
                        placeholder="--/--/----"
                        dateSlash
                    />
                </div>
                <div className="col-sm-2 col-lg-2 col-xl-3">
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={handleChange}
                        increaseArea
                        name={"name"}
                        disabled={false}
                        description={"Exact Leave Time Active"}
                    />
                </div>
                <div className="col-sm-2 col-lg-2 col-xl-3">
                    <CheckBoxComp
                        checked={Sys_CleaningPhaseActive}
                        onCheckChange={handleChange}
                        increaseArea
                        name={"Sys_CleaningPhaseActive"}
                        disabled={false}
                        description={"Cleaning Phase Active"}
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-2 required ">Version No.</div>
                <div className="col-sm-4 col-lg-4 col-xl-2">
                    <InputTextComp
                        value={Sys_Vers}
                        name="Sys_Vers"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                    />
                </div>
                <div className="col-sm-3 col-lg-3 col-xl-2 required">Hospital Name</div>
                <div className="col-sm-2 col-lg-2 col-xl-6">
                    <InputTextComp
                        value={Sys_HoName}
                        name="Sys_HoName"
                        maxLength={5}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-2 required ">HIS Clipper FilesFolder Name</div>
                <div className="col-sm-4 col-lg-4 col-xl-10">
                    <TextAreaComp
                        value={Sys_Clipper}
                        name="Sys_Clipper"
                        onChange={handleChange}
                        maxLength={1000}
                        style={{ minHeight: "75px" }}
                        disabled={false}
                    />
                </div>
            </div>
        </div>
        <div className="col-4">
            <MnuBkGImgComp key={1}
                moduleName="HIS-Experience 4 Logo"
                name="Sys_HisLogo"
                skipstyle
                modulePrfix={""}
                base64img={Sys_HisLogo}
                handleChange={handleChange}
            />
        </div>
    </div>
}
