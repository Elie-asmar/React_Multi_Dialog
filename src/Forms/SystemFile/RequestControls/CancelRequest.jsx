import React from 'react'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'

export function CancelRequest() {
    return <div className='col-3'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Cancel Request</div>
        </div>
        <div className='row'>
            <div className='col-6'>
                Re-Initialize Request
            </div>
            <div className='col-6'>
                <RadioGroupComp
                    name="status"
                    value={""}
                    radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                    onClick={e => null}
                    increaseArea
                />
            </div>
        </div>
        <div className='mt-4'>
            <div className='row mb-2'>
                <div className='col-6'>
                    Create Requests From RIS
                </div>
                <div className='col-6'>
                    <RadioGroupComp
                        name="status"
                        value={""}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-6'>
                    Login User On Step Active
                </div>
                <div className='col-6'>
                    <RadioGroupComp
                        name="status"
                        value={""}
                        radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                        onClick={e => null}
                        increaseArea
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    Beds Plan View
                </div>
                <div className='col-6'>
                    <RadioGroupComp
                        name="status"
                        value={""}
                        radios={[{ value: "G", name: "Grid View" }, { value: "P", name: "Pictures View" }]}
                        onClick={e => null}
                        increaseArea
                    />
                </div>
            </div>
        </div>
    </div>
}
