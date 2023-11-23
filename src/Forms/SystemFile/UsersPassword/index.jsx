import React from 'react'
import { useSystemFileStateMutater } from '../../../CustomHooks/useSystemFileStateMutater'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import { sysFileMemoCb } from '../helpers'
import { RowContainer } from '../RowContainer';
import { PasswordAlert } from './PasswordAlert';
import { PasswordComplexity } from './PasswordComplexity';

export default React.memo(function UsersPassword({ changeState, state }) {

    const { handleChange, handleDateTimeChange, handleBlur } = useSystemFileStateMutater(changeState, "U_P");

    const { } = state ?? {};

    return (
        <div className="animated fadeIn activeComponent col-12 mt-4">
            <div>
                <CheckBoxComp
                    checked={false}
                    onCheckChange={e => null}
                    name="Emergency"
                    description="Password Complexity & Alert Purchased"
                />
            </div>
            <RowContainer>
                <PasswordAlert />
                <PasswordComplexity />
            </RowContainer>
        </div>
    )
}, sysFileMemoCb)
