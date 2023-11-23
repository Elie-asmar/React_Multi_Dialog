import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'

export function GeneralCounters({ handleChange, handleBlur }) {
    return (
        <div className="col-6 mt-3 mb-3">
            <div className="row">
                <div id="GeneralCountersContainer" className="col-md-12 title mb-4 p-0">General Counters</div>
            </div>
            <div className='col-12'>
                <div className='row mb-4'>
                    <div className="col-3">
                        <CheckBoxComp
                            checked={false}
                            onCheckChange={handleChange}
                            increaseArea
                            name={"name"}
                            disabled={false}
                            description={"Activate Dictionary"}
                        />
                    </div>
                    <div className="col-9 row">
                        <div className="col-sm-3 col-lg-3 col-xl-4">Admission Last Case No.</div>
                        <div className="col-sm-4 col-lg-4 col-xl-5">
                            <InputTextComp
                                value={""}
                                name="code"
                                maxLength={20}
                                handleOnblur={handleBlur}
                                handleChange={handleChange}
                                disabled={false}
                                removeSpaces
                            />
                        </div>
                    </div>
                </div>
                <div className='row mb-4'>
                    <div className="col-sm-3 col-lg-3 col-xl-3">Last External Counter</div>
                    <div className="col-sm-4 col-lg-4 col-xl-6">
                        <InputTextComp
                            value={""}
                            name="code"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            disabled={false}
                            removeSpaces
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
