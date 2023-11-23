import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import DateTimePickerComp from '../../../ReusableComponents/Other/DateTimePickerComp/DateTimePickerComp'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'

export function AgeCalc() {
    return <div className='col-12 row mb-4'>
        <div className='col-8'>
            <div className="row">
                <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                    Age Calculation Parameters
                </div>
            </div>
            <div className='row'>
                <div className='col-3'>
                    <p className='mb-2'>Age = 0 Day (@ date of birth)</p>
                    <div className="row">
                        <div className="col-6" style={{ display: 'flex', alignItems: "center" }}>Age Less than</div>
                        <div className="col-6">
                            <InputNumericComp
                                value={0}
                                name="Sys_LeftMargin"
                                maxLength={20}
                                onBlur={e => null}
                                handleChange={e => null}
                                disabled={false}
                                removeSpaces
                                suffix=" Years"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <RadioGroupComp
                        name="needresdata"
                        value={""}
                        radios={[{ value: "hrs", name: "Print In Hrs." }, { value: "d", name: "Print 0 Day" }]}
                        onClick={e => null}
                        increaseArea
                        className="p-0"
                        disabled={false}
                    />
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name="Emergency"
                        description="Print In Months"
                    />
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name="Emergency"
                        description="Print In Weeks"
                    />
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name="Emergency"
                        description="Print In Days"
                    />
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-6" style={{ display: 'flex', alignItems: "center" }}>Age Less than</div>
                        <div className="col-6">
                            <InputNumericComp
                                value={0}
                                name="Sys_LeftMargin"
                                maxLength={20}
                                onBlur={e => null}
                                handleChange={e => null}
                                disabled={false}
                                removeSpaces
                                suffix=" Month"
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6" style={{ display: 'flex', alignItems: "center" }}>Age &#62;&#61; than</div>
                        <div className="col-6">
                            <InputNumericComp
                                value={0}
                                name="Sys_LeftMargin"
                                maxLength={20}
                                onBlur={e => null}
                                handleChange={e => null}
                                disabled={false}
                                removeSpaces
                                suffix=" Years"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name="Emergency"
                        description="Print In Weeks"
                    />
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name="Emergency"
                        description="Print In Days"
                    />
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name="Emergency"
                        description="Round Years Up on 6 Months Partition"
                    />
                </div>
            </div>
        </div>
        <div className='col-4'>
            <div className="row">
                <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                    Age Calculation Test
                </div>
            </div>
            <div className='row'>
                <div className='col-9'>
                    <div className="row">
                        <div className='col-4'>
                            B. Date
                        </div>
                        <div className='col-8'>
                            <DateTimePickerComp
                                selected={""}
                                onDateTimeChange={e => null}
                                name="birthDate"
                                // className={state[`${"Till/" + row.original.rowid}NotValid`] || state[`${"Till/" + row.original.rowid}Mandatory`] ? "alert-danger" : ""}
                                placeholder="--/--/----"
                                dateSlash
                                disabled={false}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className='col-4'>
                            Age
                        </div>
                        <div className='col-8'>
                            <InputNumericComp
                                value={0}
                                name="Sys_LeftMargin"
                                maxLength={20}
                                onBlur={e => null}
                                handleChange={e => null}
                                disabled={false}
                                removeSpaces
                            />
                        </div>
                    </div>
                </div>
                <div className='col-3' style={{ display: "flex", alignItems: "center" }}>
                    <button type="button" className="btn btn-secondary">Test</button>
                </div>
            </div>
            <div className="mt-4">
                <CheckBoxComp
                    checked={false}
                    onCheckChange={e => null}
                    name="Emergency"
                    description="Rounding Applicable on Admission Status"
                />
            </div>
        </div>
    </div>
}
