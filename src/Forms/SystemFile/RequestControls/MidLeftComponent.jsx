import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';

// ? Abbrevation of titles
const RRPSSO = [
    { label: "Labo", name: "" },
    { label: "G.Exams", name: "" },
    { label: "Radio", name: "" },
    { label: "O.R", name: "" },
]

const RRM = [
    { label: "Labo", name: "" },
    { label: "G.Exams", name: "" },
    { label: "Radio", name: "" },
    { label: "O.R", name: "" },
    { label: "Stock", name: "" },
    { label: "Dr. Visit", name: "" },
]

export function MidLeftComponent() {
    return <div className='col-6'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Request Remarks Printed on Separated Section on</div>
        </div>
        <div className="row">
            {RRPSSO.map((item, index) => {
                return <div className="col-2 p-0" key={item.label}>
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
            <div className='col-6'>
                <div className="row">
                    <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Patient Based Access</div>
                </div>
                <div>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name={""}
                        description="Active in Floor Request Module"
                    />
                </div>
                <div>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name={""}
                        description="Active in External Module"
                    />
                </div>
            </div>
            <div className='col-6'>
                <div className="row">
                    <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Request Remark is Mandatory on</div>
                </div>
                <div className='row'>
                    {RRM.map((item, index) => {
                        return <div key={item.label} className='col-6 mb-2'>
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
    </div>
}
