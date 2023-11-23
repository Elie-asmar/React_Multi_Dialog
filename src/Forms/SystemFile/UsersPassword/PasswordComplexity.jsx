import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'

const CATEGORIES = [
    { label: "Latin uppercase letters (A through Z)", name: "" },
    { label: "Latin lowercase letters (a through z)", name: "" },
    { label: "Base 10 digits (0 through 9)", name: "" },
    { label: "Non-alphanumeric characters (!,$,#,%)", name: "" },
]

export function PasswordComplexity() {
    return <div className='col-6'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Password Complexity</div>
        </div>
        <div>
            <CheckBoxComp
                checked={false}
                onCheckChange={e => null}
                name="Emergency"
                description="Control number of characters"
            />
        </div>
        <div className='row mt-4'>
            <div className='col-4'>
                Number of Characters Long (1 - 10)
            </div>
            <div className='col-4'>
                <InputNumericComp
                    value={0}
                    name="externalResults"
                    maxLength={2}
                    handleChange={e => null}
                    disabled={false}
                    suffix=" In Days"
                    removeSpaces
                />
            </div>
        </div>
        <div className='mt-4 mb-2'>
            The password must contain characters from the following four categories:
        </div>
        {CATEGORIES.map((item, index) => {
            return <div key={index} className='mb-2'>
                <CheckBoxComp
                    checked={false}
                    onCheckChange={e => null}
                    name={item.name}
                    description={item.label}
                />
            </div>
        })}

    </div>
}
