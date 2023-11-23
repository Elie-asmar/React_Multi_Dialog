import React from 'react'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'

export function DTTFR() {
    return <div className='col-3'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0"># Days To Tolerate Future Requests</div>
        </div>
        <div className='row mb-3'>
            <div className="col-6 row">
                <div className="col-6">Labo</div>
                <div className="col-6">
                    <InputNumericComp
                        value={0}
                        name="Sys_LeftMargin"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className="col-6 row">
                <div className="col-6">
                    O.R
                </div>
                <div className="col-6">
                    <InputNumericComp
                        value={0}
                        name="Sys_LeftMargin"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
        </div>
        <div className='row mb-3'>
            <div className="col-6 row">
                <div className="col-6">
                    Radio
                </div>
                <div className="col-6">
                    <InputNumericComp
                        value={0}
                        name="Sys_LeftMargin"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className="col-6 row">
                <div className="col-6"> Stock</div>
                <div className="col-6">
                    <InputNumericComp
                        value={0}
                        name="Sys_LeftMargin"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
        </div>
        <div className='row'>
            <div className="col-6 row">
                <div className="col-6 p-0">G. Exams</div>
                <div className="col-6">
                    <InputNumericComp
                        value={0}
                        name="Sys_LeftMargin"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className="col-6 row">
                <div className="col-6">Dr. Visit</div>
                <div className="col-6">
                    <InputNumericComp
                        value={0}
                        name="Sys_LeftMargin"
                        maxLength={20}
                        onBlur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
        </div>
    </div>
}
