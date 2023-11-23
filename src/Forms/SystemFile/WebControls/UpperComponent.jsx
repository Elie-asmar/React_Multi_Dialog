import React from 'react'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'
import { MnuBkGImgComp } from '../../MenuBackground/MnuBkGImgComp'


const radios = [
    { name: "I - Results Related to Internal Admissions Only", value: "I" },
    { name: "E - Results Related to External Admisstion Only", value: "E" },
    { name: "B - Results Related to Both Admissions", value: "B" },
]

export default function UpperComponent({ state }) {
    return <div className='col-12'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Login Info</div>
        </div>
        <div className='row'>
            <div className="col-3 row mt-1">
                <div className="row col-12">
                    <div className="col-6">Show Logo On Login Screen</div>
                    <div className="col-6">
                        <RadioGroupComp
                            name="status"
                            value={"N"}
                            radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                            onClick={e => null}
                            increaseArea
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <MnuBkGImgComp
                        moduleName="Web Short Logo"
                        modulePrfix=" Logo"
                        base64img={""}
                        name="doctorsPhoto"
                        handleChange={e => null}
                        skipstyle
                    />
                </div>
            </div>
            <div className="col-1" />
            <div className="col-3 row mt-1">
                <div className="row col-12">
                    <div className="col-6">Show Short Logo</div>
                    <div className="col-6">
                        <RadioGroupComp
                            name="status"
                            value={"N"}
                            radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                            onClick={e => null}
                            increaseArea
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <MnuBkGImgComp
                        moduleName="Web Logo"
                        modulePrfix=" Logo"
                        base64img={""}
                        name="doctorsPhoto"
                        handleChange={e => null}
                        skipstyle
                    />
                </div>
            </div>
            <div className='col-1' />
            <div className="col-4 mt-4">
                <div className='mt-4' />
                <div className="row">
                    <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Patients Results Display</div>
                </div>
                <div>
                    <RadioGroupComp
                        name="status"
                        value={"I"}
                        radios={radios}
                        onClick={e => null}
                        increaseArea
                    />
                </div>
            </div>
        </div>
    </div>
}
