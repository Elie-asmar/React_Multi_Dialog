import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'

export function BloodGroupControls() {
    return (
        <div className='col-3'>
            <div className="row">
                <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0"> Blood Group Controls</div>
            </div>
            <div>
                <CheckBoxComp
                    checked={false}
                    onCheckChange={e => console.log(null)}
                    increaseArea
                    name={"name"}
                    disabled={false}
                    description={"Using HIS and/or Blood Bank Module"}
                />
            </div>
            <div className='mt-2'>
                <CheckBoxComp
                    checked={false}
                    onCheckChange={e => console.log(null)}
                    increaseArea
                    name={"name"}
                    disabled={false}
                    description={"Using Blood Module only"}
                />
            </div>
        </div>
    )
}
