import React from 'react'
import InputNumericComp from '../../../ReusableComponents/Other/InputNumericComponent/InputNumericComp'

export function Printing({ handleChange, handleBlur, ...restProps }) {



    const { Sys_LeftMargin, Sys_TopMargin } = restProps;

    return <div className="col-6 mt-3 mb-3">
        <div className="row">
            <div id="PrintingContainer" className="col-md-12 title mb-4 p-0">Printing Checks Paper Margins</div>
        </div>
        <div className='col-12'>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-3">Top Margin</div>
                <div className="col-sm-4 col-lg-4 col-xl-6">
                    <InputNumericComp
                        value={Sys_TopMargin}
                        name="Sys_TopMargin"
                        maxLength={20}
                        onBlur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                        suffix="mm"
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-3">Left Margin</div>
                <div className="col-sm-4 col-lg-4 col-xl-6">
                    <InputNumericComp
                        value={Sys_LeftMargin}
                        name="Sys_LeftMargin"
                        maxLength={20}
                        onBlur={handleBlur}
                        handleChange={handleChange}
                        disabled={false}
                        removeSpaces
                        suffix="mm"
                    />
                </div>
            </div>
        </div>
    </div>
}
