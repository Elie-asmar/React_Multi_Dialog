import React, { useState } from 'react'
import { SystemFileNav } from './SystemFileNav'
import { HOSPITAL_INFO_LAZY_LOADED, HOSPITAL_CONTROLS_LAZY_LOADED, LAB_CONTROLS_LAZY_LOADED, RADIO_CONTROLS_LAZY_LOADED, EXAMS_SELECTION_CONTROLS_LAZY_LOADED, REQUEST_CONTROLS_LAZY_LOADED, HOSPITAL_REMARKS_LAZY_LOADED, ACCOUNTING_LAZY_LOADED, REPORTS_SIGNATURE_LAZY_LOADED, WEB_CONTROLS_LAZY_LOADED, LAB_WEB_REMARKS_LAZY_LOADED, RAD_WEB_REMARKS_LAZY_LOADED, USERS_PASSWORD_LAZY_LOADED, CASH_CONTROLS_LAZY_LOADED, ADMISSION_CONTROLS_LAZY_LOADED, SMS_ADMISSION_CONTROLS_LAZY_LOADED, WORK_FLOW_CONTROLS_LAZY_LOADED } from './LazyLoadedExports';
import { SystemFileContent } from './SystemFileContent';
import { NAV_DATA } from './data';
import "./index.css"

export function SystemFileContainer() {

    const [activeNavItem, setActiveNavItem] = useState(0);

    const toggle = (index) => {
        return () => {
            setActiveNavItem(index);
        }
    }

    return <div className='row mt-2'>
        <SystemFileNav data={NAV_DATA} handleNavItemClick={toggle} active={activeNavItem} />
        <SystemFileContent active={activeNavItem}>
            <HOSPITAL_INFO_LAZY_LOADED />
            <HOSPITAL_CONTROLS_LAZY_LOADED />
            <LAB_CONTROLS_LAZY_LOADED />
            <RADIO_CONTROLS_LAZY_LOADED />
            <EXAMS_SELECTION_CONTROLS_LAZY_LOADED />
            <REQUEST_CONTROLS_LAZY_LOADED />
            <HOSPITAL_REMARKS_LAZY_LOADED />
            <ACCOUNTING_LAZY_LOADED />
            <REPORTS_SIGNATURE_LAZY_LOADED />
            <WEB_CONTROLS_LAZY_LOADED />
            <LAB_WEB_REMARKS_LAZY_LOADED />
            <RAD_WEB_REMARKS_LAZY_LOADED />
            <USERS_PASSWORD_LAZY_LOADED />
            <CASH_CONTROLS_LAZY_LOADED />
            <ADMISSION_CONTROLS_LAZY_LOADED />
            <SMS_ADMISSION_CONTROLS_LAZY_LOADED />
            <WORK_FLOW_CONTROLS_LAZY_LOADED />
        </SystemFileContent>
    </div>
}
