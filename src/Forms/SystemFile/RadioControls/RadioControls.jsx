import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'
import TextAreaComp from '../../../ReusableComponents/Other/TextAreaComp/TextAreaComp'


export function RadioControlsSection({ handleChange, handleDateTimeChange, handleBlur, ...restProps }) {

    const { Sys_RdERApp,
        Sys_RdBedER,
        Sys_RdStTime,
        Sys_RdEndTime,
        Sys_RdIntervalTime,
        Sys_RISApp,
        Sys_RdSpcHdr,
        Sys_ReqFromRIS
    } = restProps;

    return (
        <div className='col-9'>
            <div className="row">
                <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0"> Radio Controls</div>
            </div>
            <div className="row mb-3">
                <div className="col-xl-2 col-sm-3 required">Emergency Rate Applicable in Radio </div>
                <div className="col-xl-4 col-sm-9">
                    <RadioGroupComp
                        name="Sys_RdERApp"
                        value={Sys_RdERApp}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={handleChange}
                        increaseArea
                        disabled={false}
                    />
                </div>
                <div className="col-xl-2 col-sm-3 required">"In Bed" Rate Applicable in Radio </div>
                <div className="col-xl-4 col-sm-9">
                    <RadioGroupComp
                        name="Sys_RdBedER"
                        value={Sys_RdBedER}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={handleChange}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-xl-2 col-sm-3 required">Start Time to Apply Emergency  </div>
                <div className="col-xl-4 col-sm-9">
                    <InputTextComp
                        value={Sys_RdStTime}
                        name="Sys_RdStTime"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        placeholder="--/--/----"
                        disabled={false}
                        removeSpaces
                    />
                </div>
                <div className="col-xl-2 col-sm-3 required">RIS Active</div>
                <div className="col-xl-4 col-sm-9">
                    <RadioGroupComp
                        name="Sys_RISApp"
                        value={Sys_RISApp}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={handleChange}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-xl-2 col-sm-3 required">End Time to Apply Emergency  </div>
                <div className="col-xl-4 col-sm-9">
                    <InputTextComp
                        value={Sys_RdEndTime}
                        name="Sys_RdEndTime"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        placeholder="--/--/----"
                        disabled={false}
                        removeSpaces
                    />
                </div>
                <div className="col-xl-2 col-sm-3 required">Time Interval to Send HL7 Request </div>
                <div className="col-xl-4 col-sm-9">
                    <InputNumericComp
                        value={Sys_RdIntervalTime}
                        name="Sys_RdIntervalTime"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                        suffix=" Minutes"
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <div className="col-sm-3 col-lg-3 col-xl-2 required ">Special Header to Print on documents</div>
                <div className="col-sm-4 col-lg-4 col-xl-10">
                    <TextAreaComp
                        value={Sys_RdSpcHdr}
                        name="Sys_RdSpcHdr"
                        onChange={e => null}
                        maxLength={1000}
                        style={{ minHeight: "75px" }}
                        disabled={false}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className='col-6'>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={(checked, key) => (checked, key)}
                        name="Thursday"
                        description="Print Radio & G. Exams Bon When invoiced"
                    />
                </div>
            </div>
        </div>
    )
}
