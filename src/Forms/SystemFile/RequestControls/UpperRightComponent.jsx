import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'

// ? Abbrevations of the titles 
const SRAHWN = [
    { label: "Labo", name: "" },
    { label: "G.Exams", name: "" },
    { label: "Radio", name: "" },
    { label: "O.R", name: "" },
    { label: "Stock", name: "" },
    { label: "Dr. Visit", name: "" },
]

const PPD = [
    { label: "Labo", name: "" },
    { label: "G.Exams", name: "" },
    { label: "Radio", name: "" },
    { label: "O.R", name: "" },
    { label: "Stock", name: "" },
]

export function UpperRightComponent() {
    return <div className='col-6'>
        <CheckBoxComp
            checked={false}
            onCheckChange={e => null}
            name="Emergency"
            description="Send Floor Visit SMS to Doctor (Y/N)"
        />
        <div className='row mt-3'>
            <div className='col-6'>
                External to Internal Non Invoiced Request Control
            </div>
            <div className='col-6'>
                <RadioGroupComp
                    name="needresdata"
                    value={"Y"}
                    radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                    onClick={e => null}
                    increaseArea
                    className={""}
                    disabled={false}
                />
            </div>
        </div>
        <div className="row mt-3">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Stop Requests when Allergy Height of Weight are NULL on</div>
        </div>
        <div className='row'>
            {SRAHWN.map((item, index) => {
                const { length } = SRAHWN;
                const classNameColValue = Math.floor(12 / length);
                return <div className={`col-${classNameColValue} p-0`} key={item.label}>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name={item.name}
                        description={item.label}
                    />
                </div>
            })}
        </div>
        <div className="row mt-3">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Print Patient Diagnosis on</div>
        </div>
        <div className='row'>
            {PPD.map((item, index) => {
                const { length } = SRAHWN;
                const classNameColValue = Math.floor(12 / length);
                return <div className={`col-${classNameColValue} p-0`} key={item.label}>
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
}
