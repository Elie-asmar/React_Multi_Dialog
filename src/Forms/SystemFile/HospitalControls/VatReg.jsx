import React from 'react'
import DateTimePickerComp from '../../../ReusableComponents/Other/DateTimePickerComp/DateTimePickerComp'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'

export function VatReg() {
    return <div className='col-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                VAT & Registration Info
            </div>
        </div>
        <div>
            <div className='row mb-2'>
                <div className="col-4">VAT Applicable</div>
                <div className="col-4">
                    <InputTextComp
                        value={""}
                        name="sales"
                        maxLength={20}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-4">VAT No.</div>
                <div className="col-8">
                    <InputTextComp
                        value={""}
                        name="sales"
                        maxLength={20}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-4">VAT %</div>
                <div className="col-8">
                    <InputTextComp
                        value={""}
                        name="sales"
                        maxLength={20}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-4">VAT Start Date</div>
                <div className="col-8">
                    <DateTimePickerComp
                        selected={""}
                        onDateTimeChange={e => null}
                        name="birthDate"
                        // className={state[`${"Till/" + row.original.rowid}NotValid`] || state[`${"Till/" + row.original.rowid}Mandatory`] ? "alert-danger" : ""}
                        placeholder="--/--/----"
                        dateSlash
                        disabled={false}
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-4">VAT Control Date</div>
                <div className="col-8">
                    <DateTimePickerComp
                        selected={""}
                        onDateTimeChange={e => null}
                        name="birthDate"
                        // className={state[`${"Till/" + row.original.rowid}NotValid`] || state[`${"Till/" + row.original.rowid}Mandatory`] ? "alert-danger" : ""}
                        placeholder="--/--/----"
                        dateSlash
                        disabled={false}
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-4">MOF#</div>
                <div className="col-8">
                    <InputTextComp
                        value={""}
                        name="sales"
                        maxLength={20}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-4">RCB#</div>
                <div className="col-8">
                    <InputTextComp
                        value={""}
                        name="sales"
                        maxLength={20}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        disabled={false}
                        removeSpaces
                    />
                </div>
            </div>
        </div>
    </div>
}
