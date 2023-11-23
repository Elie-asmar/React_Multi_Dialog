import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'

const RADIOS = [{ value: "EtoA", name: "English to Arabic" }, { value: "AtoE", name: "Arabic to English " }];
const RADIO_NAMES = [
    { value: "Y", name: "Yes to All Users" }
    , { value: "N", name: "No to All Users " }
    , { value: "A", name: "Authorized Users " }
];

export function Dictionary({ handleChange, ...restProps }) {

    const { Sys_ActDict, Sys_AcceptNames } = restProps;

    // #region Rendering
    return <div className="col-6 mt-3 mb-3">
        <div className="row">
            <div id="DictionaryContainer" className="col-md-12 title mb-4 p-0">Dictionary</div>
        </div>
        <div className='col-12'>
            <div className='row mb-4'>
                <div className="col-3">
                    <CheckBoxComp
                        checked={Sys_ActDict}
                        onCheckChange={handleChange}
                        increaseArea
                        name={"Sys_ActDict"}
                        disabled={false}
                        description={"Activate Dictionary"}
                    />
                </div>
                <div className="col-6">
                    <RadioGroupComp
                        name="type"
                        value={"EtoA"}
                        radios={RADIOS}
                        onClick={handleChange}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-3 ">Dictionary Source</div>
                <div className="col-3">
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={handleChange}
                        increaseArea
                        name={"name"}
                        disabled={false}
                        description={"Medical File"}
                    />
                </div>
                <div className="col-3">
                    <CheckBoxComp
                        checked={false}
                        onCheckChange={handleChange}
                        increaseArea
                        name={"name"}
                        disabled={false}
                        description={"Dictionary Table"}
                        className="p-0 m-0"
                    />
                </div>
            </div>
            <div className='row mb-4'>
                <div className="col-sm-3 col-lg-3 col-xl-3">Accept New Names</div>
                {/* TODO: -> Turn this into a RADIO Group Comp */}
                <div className="col-6">
                    <RadioGroupComp
                        name="Sys_AcceptNames"
                        value={Sys_AcceptNames}
                        radios={RADIO_NAMES}
                        onClick={handleChange}
                        increaseArea
                        disabled={false}
                    />
                </div>
            </div>
        </div>
    </div>
}
