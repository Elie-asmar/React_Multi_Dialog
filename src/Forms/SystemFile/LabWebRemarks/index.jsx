import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import TextAreaComp from '../../../ReusableComponents/Other/TextAreaComp/TextAreaComp'
import { sysFileMemoCb } from '../helpers'

export default React.memo(function LabWebRemarks({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "L_W_R");

    const { } = state ?? {};

    return (
        <div className="animated fadeIn activeComponent col-12 mt-4">
            <div className="row">
                <div className="col-3">LAB Web Remarks English</div>
                <div className="col-9">
                    <TextAreaComp
                        value={""}
                        name="activityDesc"
                        onChange={e => null}
                        maxLength={50}
                        style={{ minHeight: "100px" }}
                        disabled={false}

                    />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-3">LAB Web Remarks Arabic</div>
                <div className="col-9">
                    <TextAreaComp
                        value={""}
                        name="activityDesc"
                        onChange={e => null}
                        maxLength={50}
                        style={{ minHeight: "100px" }}
                        disabled={false}

                    />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-3">Lab Results Web URL Address</div>
                <div className="col-9">
                    <InputTextComp
                        value={""}
                        name="activityCode"
                        maxLength={4}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                    />
                </div>
            </div>
        </div>
    )
}, sysFileMemoCb)
