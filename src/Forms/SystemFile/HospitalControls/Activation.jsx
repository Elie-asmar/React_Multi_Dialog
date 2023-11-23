import React from 'react'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'

export function Activation() {
    return <div className='col-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                Diagnosis Trauma Activation
            </div>
        </div>
        <div>
            <div className='row'>
                <div className="col-6">Diagnosis Trauma Alert Active</div>
                <div className="col-6">
                    <RadioGroupComp
                        name="status"
                        value={""}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
            <div className='row mt-2'>
                <div className="col-6" style={{ display: 'flex', alignItems: "center" }}>Timer Alert Every...</div>
                <div className="col-6">
                    <InputNumericComp
                        value={0}
                        name="Sys_LeftMargin"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                        suffix=" in minutes"
                    />
                </div>
            </div>
            <div className='row mt-2'>
                <div className="col-6">Trauma Sound Active</div>
                <div className="col-6">
                    <RadioGroupComp
                        name="status"
                        value={""}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
        </div>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                Emergency Rate Activation
            </div>
        </div>
        <div>
            <div className='row'>
                <div className="col-6">NEW ER Rate Procedure Active</div>
                <div className="col-6">
                    <RadioGroupComp
                        name="status"
                        value={""}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <div className='row mt-2'>
                <div className="col-7">Operating Room Code Mandatory for All Operation</div>
                <div className="col-5">
                    <RadioGroupComp
                        name="status"
                        value={""}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
            <div className='row mt-2'>
                <div className="col-7">Stop Operation Transactions when LAPA not invoiced</div>
                <div className="col-5">
                    <RadioGroupComp
                        name="status"
                        value={""}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
        </div>
    </div>
}
