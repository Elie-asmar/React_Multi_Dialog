import React from 'react'
import SelectComp from '../../../ReusableComponents/Other/SelectComponent/SelectComponent';

const LABELS = [
    {
        name: "sys_PatLblFormat",
        optionsName: "sys_PatLblFormat",
        label: "Patient's Label",
    },
    {
        name: "sys_MFLblFormat",
        optionsName: "sys_MFLblFormat",
        label: "Medical File Label"
    },
    {
        name: "sys_KitLblFormat",
        optionsName: "sys_KitLblFormat",
        label: "Kitchen's Label"
    },
    {
        name: "Sys_BraLblFormat",
        optionsName: "Sys_BraLblFormat",
        label: "Bracelete Label"
    },
    {
        name: "Sys_MedLabelFormat",
        optionsName: "Sys_MedLabelFormat",
        label: "Medication Label"
    },
]

export function Labels() {
    return <div className='col-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                Labels Format Settings
            </div>
        </div>
        {LABELS.map((item, index) => {
            return <div className='row mt-2' key={index}>
                <div className='col-5'>
                    {item.label}
                </div>
                <div className='col-7'>
                    <SelectComp
                        value={"item"}
                        onChange={e => null}
                        name={item.name}
                        options={[]}
                        clearable
                        disabled={false}
                    />
                </div>
            </div>
        })}
    </div>
}
