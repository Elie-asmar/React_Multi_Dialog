import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'

export function SameNameAlert({ handleChange }) {
    return <div className='col-2'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Same Name Alert</div>
        </div>
        <div className="row">
            <CheckBoxComp
                checked={false}
                onCheckChange={handleChange}
                name="Thursday"
                description="Same Name Alert Active"
            />
        </div>
        <div className="row mt-2">
            <RadioGroupComp
                name="Sys_LbERApp"
                value={"N"}
                radios={[{ value: "Y", name: "Include Father's Name" }, { value: "N", name: "Exclude Father's Name" }]}
                onClick={handleChange}
                increaseArea
                disabled={false}
            />
        </div>
    </div>

}
