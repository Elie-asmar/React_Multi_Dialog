import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp';


const DFR = [
    { label: "Laboratory", name: "" },
    { label: "Radiology", name: "" },
    { label: "General Exams", name: "" },
]

const DFR_OPTIONS = [
    { label: "Walking", value: "W" },
    { label: "Bed", value: "B" },
    { label: "Portable", value: "P" },
    { label: "Chair", value: "C" },
    { label: "Stretcher", value: "S" },
];

const NEAH = [
    { label: "Laboratory", name: "" },
    { label: "Operations", name: "" },
    { label: "Radiology", name: "" },
    { label: "Stock", name: "" },
    { label: "General Exams", name: "" },
]


export function LowerRightComponent() {
    return <div className='col-6'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">To Exam By</div>
        </div>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Default Values on Request</div>
        </div>
        <div className='row'>
            {DFR.map((item, index) => {
                return <div key={index} className='row'>
                    <p className='col-2 p-0'>{item.label}</p>
                    {DFR_OPTIONS.map((option, optionIndex) => {
                        return <div key={optionIndex} className="col-2 p-0">
                            <CheckBoxComp
                                checked={false}
                                onCheckChange={e => null}
                                name={""}
                                description={option.label}
                            />
                        </div>
                    })}
                </div>
            })}
        </div>
        <div className="row mt-4">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Approval Alert</div>
        </div>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Notify if Exams was Approved in the last n Hours</div>
        </div>
        <div className="row mb-4">
            {NEAH.map((item, index) => {
                return <div key={item.label} className="col-6 row mt-2">
                    <div className="col-6">{item.label}</div>
                    <div className="col-6">
                        <InputNumericComp
                            value={""}
                            name={item.name}
                            maxLength={2}
                            // onBlur={e => null}
                            handleChange={e => null}
                            disabled={false}
                            removeSpaces
                            suffix=" Hrs"
                        />
                    </div>
                </div>
            })}
        </div>
    </div>
}
