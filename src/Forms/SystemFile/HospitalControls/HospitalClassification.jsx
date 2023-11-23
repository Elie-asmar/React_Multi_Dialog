import React from 'react'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'


export function HospitalClassification({ handleBlur, handleChange }) {

    return <div className='col-5'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0"> Hospital Classification</div>
        </div>
        <div className='row'>
            <div className="col-xl-3 col-sm-4 required">Class Code </div>
            <div className="col-xl-5 col-sm-8">
                <InputTextComp
                    value={""}
                    name="Sys_LbStTime"
                    maxLength={20}
                    handleOnblur={handleBlur}
                    handleChange={handleChange}
                    disabled={false}
                    removeSpaces
                />
            </div>
        </div>
        <div className='row mt-2'>
            <div className="col-xl-3 col-sm-4 required">Description </div>
            <div className="col-xl-8 col-sm-8">
                <InputTextComp
                    value={""}
                    name="Sys_LbStTime"
                    maxLength={20}
                    handleOnblur={handleBlur}
                    handleChange={handleChange}
                    disabled={false}
                    removeSpaces
                />
            </div>
        </div>
    </div>
}
