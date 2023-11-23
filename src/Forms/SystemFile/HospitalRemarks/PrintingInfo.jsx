import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'

// ? Abbreviations
const PI = [
    { label: "Print Hospital Name On Invoice", name: "" },
    { label: "Print Hospital Logo On Invoice", name: "" },
    { label: "Print PL# On Invoice", name: "" },
    { label: "Print Hospital Name On Receipts", name: "" },
    { label: "Print Hospital Logo On Receipts", name: "" },
]

const CHECKBOX_VALUES = [
    { label: "Print Portrait Format w/o Lines", name: "" },
    { label: "Always Print Stamps on Invoice", name: "" },
    { label: "Print Referring Doctor on Invoice", name: "" }
];

export function PrintingInfo() {
    return <div className='col-8'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Printing Info</div>
        </div>
        <div className="row mb-4">
            <div className='col-6'>
                {PI.map((item, index) => {
                    return <div className='row mb-2' key={index}>
                        <div className='col-6'>
                            {item.label}
                        </div>
                        <div className='col-6'>
                            <RadioGroupComp
                                name="status"
                                value={"N"}
                                radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                                onClick={e => null}
                                increaseArea
                            />
                        </div>
                    </div>
                })}
            </div>
            <div className="col-6">
                {CHECKBOX_VALUES.map((item, index) => {
                    return <div key={index} className="mb-2">
                        <CheckBoxComp
                            checked={false}
                            onCheckChange={e => null}
                            name={item.name}
                            description={item.label}
                        />
                    </div>
                })}
                <div className="row">
                    <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Printing User Info On Invoice</div>
                </div>
                <RadioGroupComp
                    name="status"
                    value={"N"}
                    radios={[{ value: "N", name: "User Name" }, { value: "C", name: "User Code" }]}
                    onClick={e => null}
                    increaseArea
                />
            </div>
        </div>
    </div>
}
