import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'
import TextAreaComp from '../../../ReusableComponents/Other/TextAreaComp/TextAreaComp'

export function LabControlsSection({ handleChange, handleBlur, handleDateTimeChange, ...restProps }) {

    const { Sys_LbERApp, Sys_SendExam, Sys_LbStTime, Sys_LbEndTime, Sys_LbIntervalTime, Sys_LbSpcHdr } = restProps;

    console.log({ restProps });

    return (
        <div className='col-9'>
            <div className="row">
                <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0"> Lab Controls</div>
            </div>
            <div className="row mb-3">
                <div className="col-xl-2 col-sm-3 required">Emergency Rate Applicable in Lab </div>
                <div className="col-xl-4 col-sm-9">
                    <RadioGroupComp
                        name="Sys_LbERApp"
                        value={Sys_LbERApp}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={handleChange}
                        increaseArea
                        disabled={false}
                    />
                </div>
                <div className="col-xl-2 col-sm-3 required">Results Module Active </div>
                <div className="col-xl-4 col-sm-9">
                    <RadioGroupComp
                        name="type"
                        value={"Y"}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-xl-2 col-sm-3 required">Start Time to Apply Emergency  </div>
                <div className="col-xl-4 col-sm-9">
                    <InputTextComp
                        value={Sys_LbStTime}
                        name="Sys_LbStTime"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        placeholder="--/--/----"
                        disabled={false}
                        removeSpaces
                    />
                </div>
                <div className="col-xl-2 col-sm-3 required">Send Exam To Results Module</div>
                <div className="col-xl-4 col-sm-9">
                    <RadioGroupComp
                        name="Sys_SendExam"
                        value={Sys_SendExam}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-xl-2 col-sm-3 required">End Time to Apply Emergency  </div>
                <div className="col-xl-4 col-sm-9">
                    <InputTextComp
                        value={Sys_LbEndTime}
                        name="Sys_LbEndTime"
                        maxLength={20}
                        handleOnblur={handleBlur}
                        handleChange={handleChange}
                        placeholder="--/--/----"
                        disabled={false}
                        removeSpaces
                    />
                </div>
                <div className="col-xl-2 col-sm-3 required">Time Interval to Send Request </div>
                <div className="col-xl-4 col-sm-9">
                    <InputNumericComp
                        value={Sys_LbIntervalTime}
                        name="Sys_LbIntervalTime"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={handleChange}
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
                        value={Sys_LbSpcHdr}
                        name="Sys_LbSpcHdr"
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
                        description="Alert Schedule Extraction"
                    />
                </div>
                <div className='col-6'>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={(checked, key) => (checked, key)}
                        name="Thursday"
                        description="Set Extraction Date/Time - Lab Transaction Date/Time"
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className='col-6'>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={(checked, key) => (checked, key)}
                        name="Thursday"
                        description="Print Laboratory Bon When Invoiced"
                    />
                </div>
                <div className='col-6'>
                    <div className="col-xl-4 col-sm-3">Lab Bon Order</div>
                    <div className="col-xl-8 col-sm-9">
                        <RadioGroupComp
                            name="status"
                            value={"A"}
                            radios={[{ value: "A", name: "Active" }, { value: "I", name: "Inactive" }]}
                            onClick={e => null}
                            increaseArea
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className='col-6'>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={(checked, key) => (checked, key)}
                        name="Thursday"
                        description="Print Laboratory Skeleton When Invoiced"
                    />
                </div>
            </div>
        </div>
    )
}
