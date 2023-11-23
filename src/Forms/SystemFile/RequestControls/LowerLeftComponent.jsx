import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'

// ? Abbreviations

const NERH = [
    { label: "Laboratory", name: "" },
    { label: "Operations", name: "" },
    { label: "Radiology", name: "" },
    { label: "Stock", name: "" },
    { label: "General Exams", name: "" },
]

const TNAAAC = [
    { label: "Labo", name: "" },
    { label: "Radio", name: "" },
    { label: "G.Exams", name: "" },
    { label: "O.R", name: "" },
    { label: "Stock", name: "" },
];

const PCMRC = [
    { label: "ORM Requests", name: "" },
    { label: "Inv. Requests", name: "" },
]

export function LowerLeftComponent() {
    return <div className='col-6'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Request Alert</div>
        </div>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Notify if Exam was Requested in the last n Hours</div>
        </div>
        <div className="row">
            {NERH.map((item, index) => {
                return <div key={item.label} className="row col-6 mb-2">
                    <div className='col-6'>
                        {item.label}
                    </div>
                    <div className='col-6'>
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
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Turns Need Approval After Alert Confirmation</div>
            <div className="row">
                {TNAAAC.map((item, index) => {
                    return <div key={item.label} className='col-2 p-0'>
                        <CheckBoxComp
                            checked={false}
                            onCheckChange={e => null}
                            name={item.name}
                            description={item.label}
                        />
                    </div>
                })}
            </div>
        </div>
        <div className="row mb-4">
            <div id="HospitalInformationContainer" className="col-md-12 title mt-4 mb-4 p-0">PCM Requests Controls</div>
            <div className="row">
                {PCMRC.map((item, index) => {
                    return <div key={item.label} className='col-3 p-0'>
                        <CheckBoxComp
                            checked={false}
                            onCheckChange={e => null}
                            name={item.name}
                            description={item.label}
                        />
                    </div>
                })}
            </div>
        </div>
    </div>
}
