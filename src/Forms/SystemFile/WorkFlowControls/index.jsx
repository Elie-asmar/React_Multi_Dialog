import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater';
import RadioGroupComp from '../../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp';
import { sysFileMemoCb } from '../helpers';

export default React.memo(function WebFlowControls({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "W_F_C");

    const { } = state ?? {};

    return <div className="animated fadeIn activeComponent">
        <div className="row mt-4">
            <div className="col-2">Workflow Notification Active</div>
            <div className="col-5">
                <RadioGroupComp
                    name="status"
                    value={"Y"}
                    radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                    onClick={e => null}
                    increaseArea
                />
            </div>
        </div>
    </div>

}, sysFileMemoCb)