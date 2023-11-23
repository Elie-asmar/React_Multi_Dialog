import React from 'react'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'

export function Controls() {
    return <div className='col-4'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">
                Controls
            </div>
        </div>
        <div className="row mb-2">
            <div className="col-6 required">Modify Doctors Partitioning By Coverage </div>
            <div className="col-6">
                <RadioGroupComp
                    name="Sys_LbERApp"
                    value={"N"}
                    radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                    onClick={e => null}
                    increaseArea
                    disabled={false}
                />
            </div>
        </div>
        <div className="row mb-2">
            <div className="col-6 required">Access Serial No on Patient Labels</div>
            <div className="col-6">
                <RadioGroupComp
                    name="Sys_LbERApp"
                    value={"N"}
                    radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                    onClick={e => null}
                    increaseArea
                    disabled={false}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-6 required">Print Serial No on Patient Labels</div>
            <div className="col-6">
                <RadioGroupComp
                    name="Sys_LbERApp"
                    value={"N"}
                    radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                    onClick={e => null}
                    increaseArea
                    disabled={false}
                />
            </div>
        </div>
    </div>
}
