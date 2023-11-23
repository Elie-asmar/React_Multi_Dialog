import React from 'react'
import SelectComp from '../../../ReusableComponents/Other/SelectComponent/SelectComponent'

export function GeneralExams() {
    return <div className='col-6 mt-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                General Exams
            </div>
        </div>
        <div className="row mb-4">
            <div className='col-12 row'>
                <div className="col-6">
                    G.Exam Exam Selection in Request
                </div>
                <div className="col-6">
                    <SelectComp
                        value={""}
                        onChange={e => null}
                        name="dbcode"
                        options={[]}
                        clearable
                        disabled={false}
                    />
                </div>
            </div>
        </div>
        <div className="row">
            <div className='col-12 row'>
                <div className="col-6">
                    G.Exam Exam Selection in Transaction
                </div>
                <div className="col-6">
                    <SelectComp
                        value={""}
                        onChange={e => null}
                        name="dbcode"
                        options={[]}
                        clearable
                        disabled={false}
                    />
                </div>
            </div>
        </div>
    </div>
}
