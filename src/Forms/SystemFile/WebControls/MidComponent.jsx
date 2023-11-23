import React from 'react'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp'
import TextAreaComp from '../../../ReusableComponents/Other/TextAreaComp/TextAreaComp'
import { MnuBkGImgComp } from '../../MenuBackground/MnuBkGImgComp'

export function MidComponent() {
    return <div className='col-12 mt-3'>
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
            <div className="col-4 row">
                <div className="col-12 mb-2" style={{ display: "flex", alignItems: "end" }}>Signature Stamp Text</div>
                <div className="col-12">
                    <TextAreaComp
                        value={""}
                        name="servername"
                        onChange={e => null}
                        maxLength={1000}
                        style={{ minHeight: "150px" }}
                    />
                </div>
                <div className="row col-12">
                    <div className="col-8">Show Watermarks on results</div>
                    <div className="col-4">
                        <RadioGroupComp
                            name="status"
                            value={"N"}
                            radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                            onClick={e => null}
                            increaseArea
                        />
                    </div>
                </div>
                <div className="row col-12">
                    <div className="col-4">Watermarks Test</div>
                    <div className="col-8">
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
            </div>
        </div>
    </div>
}
