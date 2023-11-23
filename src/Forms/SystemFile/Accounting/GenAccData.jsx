import React from 'react'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'

export function GenAccData() {
    return <div className='col-12 mt-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">General Accounting Data</div>
        </div>
        <div className="col-12">
            <div className="row">
                <div className="col-2">General Discount </div>
                <div className="col-8">
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
            </div>
            <div className="row mt-2">
                <div className="col-2"> Invoice Diff. Of Exchange </div>
                <div className="col-8">
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
            </div>
            <div className="row mt-2">
                <div className="col-2"> Collection Diff. Of Exchange </div>
                <div className="col-8">
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
            </div>
            <div className="row mt-2">
                <div className="col-2"> V.A.T </div>
                <div className="col-8">
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
            </div>
            <div className="row mt-2">
                <div className="col-2"> Purchase V.A.T </div>
                <div className="col-8">
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
            </div>
        </div>
    </div>
}
