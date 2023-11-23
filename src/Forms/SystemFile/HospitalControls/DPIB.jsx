import React from 'react'
import DateTimePickerComp from '../../../ReusableComponents/Other/DateTimePickerComp/DateTimePickerComp'


export function DPIB() {
    return <div className='col-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                Deny Print Invoices Back to this Date
            </div>
        </div>
        <div className="row">
            <div className="col-5 required ">Invoice Control Date</div>
            <div className="col-7">
                <DateTimePickerComp
                    selected={""}
                    onDateTimeChange={e => null}
                    name="Sys_InstDate"
                    className={`form-contro`}
                    placeholder="--/--/----"
                    dateSlash
                />
            </div>
        </div>
    </div>
}
