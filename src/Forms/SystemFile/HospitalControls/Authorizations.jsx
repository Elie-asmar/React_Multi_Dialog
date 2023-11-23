import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';

const OPTIONS = ["Lab", "Rad", "Gex", "Opr", "Stk", "Doc", "Res"];

export function Authorizations({ handleChange }) {
    return <div className='col-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Authorization to Modify Prices per Exam
            </div>
        </div>
        <div className='row'>
            {OPTIONS.map((item, index) => {
                return <div key={index} className='col-1'>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={handleChange}
                        name="Thursday"
                        description={item}
                    />
                </div>
            })}
        </div>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Authorization to Modify Prices per Exam - Private
            </div>
            <div className="row">
                {OPTIONS.map((item, index) => {
                    return <div key={index} className="col-1">
                        <CheckBoxComp
                            checked={false}
                            onCheckChange={handleChange}
                            name="Thursday"
                            description={item}
                        />
                    </div>
                })}
            </div>
        </div>
    </div>
}
