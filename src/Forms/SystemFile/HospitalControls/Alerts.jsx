import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'

const OPTIONS = ["Lab", "Rad", "Gex", "Opr", "Stk", "Doc", "Res"];


export function Alerts() {
    return <div className='col-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                Alerts
            </div>
        </div>
        <div className='row'>
            <div className="col-12">
                <CheckBoxComp
                    checked={false}
                    onCheckChange={(checked, key) => null}
                    name="Emergency"
                    description="Alert on new P.L Creation Active"
                />
            </div>
            <div className="col-12 mt-2">
                <CheckBoxComp
                    checked={false}
                    onCheckChange={(checked, key) => null}
                    name="Emergency"
                    description="Alert on Stock Floor/Dep. Request Creation Active"
                />
            </div>
        </div>
        <p className='mb-0 mt-1'>Alert on New Exams Creation Active</p>
        <div className='row'>
            {OPTIONS.map((item, index) => {
                return <div key={index} className='col-1'>
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={e => null}
                        name="Thursday"
                        description={item}
                    />
                </div>
            })}
        </div>
    </div>
}
