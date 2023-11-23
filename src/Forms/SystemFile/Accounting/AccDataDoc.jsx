import React from 'react'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'

export function AccDataDoc() {
    return <div className='col-12'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Accounting Data for Doctors</div>
        </div>
        <div className='col-12'>
            <div className='row mb-4'>G/L No. For : </div>
            <div className="row">
                <div className="col-2"> Doctor A/C to Collect </div>
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
                <div className="col-2"> Doctor A/C to Pay </div>
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
                <div className="col-2"> Checks Generation </div>
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
