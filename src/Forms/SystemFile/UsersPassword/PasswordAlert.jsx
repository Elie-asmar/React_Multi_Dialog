import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'

export function PasswordAlert() {
    return <div className='col-6'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Password Alert</div>
        </div>
        <div>
            <CheckBoxComp
                checked={false}
                onCheckChange={e => null}
                name="Emergency"
                description="Force to change user's password"
            />
        </div>
        <div className='row mt-4'>
            <div className='col-4'>
                Password Alert Every
            </div>
            <div className='col-4'>
                <InputNumericComp
                    value={0}
                    name="externalResults"
                    maxLength={2}
                    // onBlur={e => null}
                    handleChange={e => null}
                    disabled={false}
                    suffix=" In Days"
                    removeSpaces
                />
            </div>

        </div>
    </div>
}
