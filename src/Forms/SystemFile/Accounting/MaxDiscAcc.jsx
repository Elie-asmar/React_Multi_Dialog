import React from 'react'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'

export function MaxDiscAcc() {
    return <div className='col-12 mt-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Maximum Discounted Amounts (to consider an invoice as totally cashed)</div>
        </div>
        <div className="row">
            <div className="col-6 row">
                <div className="col-2">LL Limit </div>
                <div className="col-5">
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                        disabled
                    />
                </div>
                <div className='text-danger col-5'>
                    Maximum: 99999 LL
                </div>
            </div>
            <div className="col-6 row">
                <div className="col-2">$ Limit </div>
                <div className="col-5">
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                        disabled
                    />
                </div>
                <div className='text-danger col-5'>
                    Maximum: 99.99 $
                </div>
            </div>
        </div>
    </div>
}
