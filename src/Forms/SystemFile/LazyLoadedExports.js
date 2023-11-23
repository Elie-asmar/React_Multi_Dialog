import React from "react";
import { withSuspense } from "../../ReusableComponents/Other/withSuspense/withSuspense";

const HOSPITAL_INFO = React.lazy(() => /* webpackChunkName: "HospitalInfo" */ import("./HospitalInfo"));
const HOSPITAL_CONTROLS = React.lazy(() => /* webpackChunkName: "HospitalControls" */ import("./HospitalControls"));
const LAB_CONTROLS = React.lazy(() => /* webpackChunkName: "LabControls" */ import("./LabControls"));
const RADIO_CONTROLS = React.lazy(() => /* webpackChunkName: "RadioControls" */ import("./RadioControls"));
const EXAMS_SELECTION_CONTROLS = React.lazy(() => /* webpackChunkName: "ExamsSelectionControls" */ import("./ExamsSelection"));
const REQUEST_CONTROLS = React.lazy(() => /* webpackChunkName: "RequestControls" */ import("./RequestControls"));
const HOSPITAL_REMARKS = React.lazy(() => /* webpackChunkName: "HospitalRemarks" */ import("./HospitalRemarks"));
const ACCOUNTING = React.lazy(() => /* webpackChunkName: "Accounting" */ import("./Accounting"));
const REPORTS_SIGNATURE = React.lazy(() => /* webpackChunkName: "ReportsSignature" */ import("./ReportsSignature"));
const WEB_CONTROLS = React.lazy(() => /* webpackChunkName: "WebControls" */ import("./WebControls"));
const LAB_WEB_REMARKS = React.lazy(() => /* webpackChunkName: "LabWebRemarks" */ import("./LabWebRemarks"));
const RAD_WEB_REMARKS = React.lazy(() => /* webpackChunkName: "RadWebRemarks" */ import("./RadWebRemarks"));
const USERS_PASSWORD = React.lazy(() => /* webpackChunkName: "UsersPassword" */ import("./UsersPassword"));
const CASH_CONTROLS = React.lazy(() => /* webpackChunkName: "CashControls" */ import("./UsersPassword"));
const ADMISSION_CONTROLS = React.lazy(() => /* webpackChunkName: "AdmissionControls" */ import("./UsersPassword"));
const SMS_ADMISSION_CONTROLS = React.lazy(() => /* webpackChunkName: "SMSAdmissionControls" */ import("./UsersPassword"));
const WORK_FLOW_CONTROLS = React.lazy(() => /* webpackChunkName: "WorkFlowControls" */ import("./WorkFlowControls"));


export const HOSPITAL_INFO_LAZY_LOADED = withSuspense(HOSPITAL_INFO);
export const HOSPITAL_CONTROLS_LAZY_LOADED = withSuspense(HOSPITAL_CONTROLS);
export const LAB_CONTROLS_LAZY_LOADED = withSuspense(LAB_CONTROLS);
export const RADIO_CONTROLS_LAZY_LOADED = withSuspense(RADIO_CONTROLS);
export const EXAMS_SELECTION_CONTROLS_LAZY_LOADED = withSuspense(EXAMS_SELECTION_CONTROLS);
export const REQUEST_CONTROLS_LAZY_LOADED = withSuspense(REQUEST_CONTROLS);
export const HOSPITAL_REMARKS_LAZY_LOADED = withSuspense(HOSPITAL_REMARKS);
export const ACCOUNTING_LAZY_LOADED = withSuspense(ACCOUNTING);
export const REPORTS_SIGNATURE_LAZY_LOADED = withSuspense(REPORTS_SIGNATURE);
export const WEB_CONTROLS_LAZY_LOADED = withSuspense(WEB_CONTROLS);
export const LAB_WEB_REMARKS_LAZY_LOADED = withSuspense(LAB_WEB_REMARKS);
export const RAD_WEB_REMARKS_LAZY_LOADED = withSuspense(RAD_WEB_REMARKS);
export const USERS_PASSWORD_LAZY_LOADED = withSuspense(USERS_PASSWORD);
export const CASH_CONTROLS_LAZY_LOADED = withSuspense(CASH_CONTROLS);
export const ADMISSION_CONTROLS_LAZY_LOADED = withSuspense(ADMISSION_CONTROLS);
export const SMS_ADMISSION_CONTROLS_LAZY_LOADED = withSuspense(SMS_ADMISSION_CONTROLS);
export const WORK_FLOW_CONTROLS_LAZY_LOADED = withSuspense(WORK_FLOW_CONTROLS);

