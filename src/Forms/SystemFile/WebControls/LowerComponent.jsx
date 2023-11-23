import React from 'react'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'
import TextAreaComp from '../../../ReusableComponents/Other/TextAreaComp/TextAreaComp'


const TEXT_AREA_NOTES = [
    { label: "Lab Notes", name: "" },
    { label: "Radio Notes", name: "" },
    { label: "Discharge Summary Notes", name: "" },
]

export function LowerComponent() {
    return <div className='col-12 mt-3'>
        <div className="row col-12">
            <div className="row col-4 mb-2">
                <div className="col-6">Show Hospital Name</div>
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
            <div className="row col-4 mb-2">
                <div className="col-6">Web Hospital Name</div>
                <div className="col-6">
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                    />
                </div>
            </div>
            <div className="row col-4 mb-2">
                <div className="col-6">Allow Requesting doctor to view Results</div>
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
            {TEXT_AREA_NOTES.map((item, index) => {
                return <div key={index} className="row col-12 mb-2">
                    <div className="col-2">{item.label}</div>
                    <div className="col-10">
                        <TextAreaComp
                            value={""}
                            name="servername"
                            onChange={e => null}
                            maxLength={1000}
                            style={{ minHeight: "100px" }}
                        />
                    </div>
                </div>
            })}
            <div className='mb-4' />
        </div>
    </div>
}
