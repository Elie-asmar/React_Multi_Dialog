import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'

// ? Abbreviations
const MHM = [
    { label: "Labo", name: "" },
    { label: "G.Exams", name: "" },
    { label: "Radio", name: "" },
    { label: "O.R", name: "" },
]

const PLEGSGD = [
    { label: "Labo", name: "" },
    { label: "G.Exams", name: "" },
    { label: "Radio", name: "" },
]

export function MidRightComponent() {
    return <div className='col-6'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Medical History Mandatory on</div>
        </div>
        <div className='row'>
            {MHM.map((item, index) => {
                return <div className='col-2 p-0' key={item.label}>
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
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Print Linked Exam To Group/Sub Group Description on</div>
        </div>
        <div className='row'>
            {PLEGSGD.map((item, index) => {
                return <div className='col-2 p-0' key={item.label}>
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
