import React from 'react'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'

const RATES = [
    { label: "Rate to Use in HIS - Pricing/Invoicing", name: "" },
    { label: "Rate to Use in Purchase", name: "" },
    { label: "Rate to Use in Cashiers / Collection", name: "" },
]

export function CRUM() {
    return <div className='col-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Currency Rates to Use in Modules</div>
        </div>
        <div className='row'>
            {RATES.map((item, index) => {
                return <div key={index} className='row col-12 mb-3'>
                    <div className="col-6">
                        {item.label} (1,2,3)
                    </div>
                    <div className="col-6">
                        <InputNumericComp
                            value={1}
                            name={item.name}
                            maxLength={2}
                            handleChange={e => null}
                            disabled={false}
                            removeSpaces
                        />
                    </div>
                </div>
            })}
        </div>
    </div>
}
