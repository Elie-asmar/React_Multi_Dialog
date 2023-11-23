import React, { useCallback, useContext, useEffect, useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import { buildTypeFromBase64, FetchData, FetchDataMultiple, getBase64, isRequiredDataEmpty, saveFinished, SetMandatoryFields } from '../../utils/functions';
import { urlPath } from '../../globals';
import Notification from '../../ReusableComponents/Other/Notification/Notification'
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import TextAreaComp from '../../ReusableComponents/Other/TextAreaComp/TextAreaComp';
import RadioGroupComp from '../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import { cloneDeep, isEmpty, set } from 'lodash';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import scrollIntoView from 'scroll-into-view';

import { LoadingContext } from '../../ContextProvider/LoadingContext';
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent';
import RTable from '../../ReusableComponents/Other/AdvancedTable/RTable';
import DateTimePickerComp from '../../ReusableComponents/Other/DateTimePickerComp/DateTimePickerComp';
import moment, { isMoment } from 'moment';
import { MnuBkGImgComp } from '../MenuBackground/MnuBkGImgComp';
import UploadFiles from '../../ReusableComponents/Other/UploadFiles/UploadFiles';
import InputNumericComp from '../../ReusableComponents/Other/InputNumericComponent/InputNumericComp';
export function DoctorsDefinition({ uuid, useInModal, routing, ...props }) {

    const { location, params } = routing;

    const personelInfo = useRef(null)
    const medicalInfo = useRef(null)
    const extraInfo = useRef(null)

    const STATE = {
        mode: '',
        // Personal Information: 
        // Doctors Information
        doctorsCode: '',
        missingdoctorsCode: false,
        doctorsName: '',
        status: 'A',
        printedName: '',
        sex: '',
        collectionGrp: '',
        collectionGrpDropdown: [],
        birthDate: '',
        missingbirthDate: false,

        // Folio Information
        folioCode: '',
        missingfolioCode: false,
        folioDropdown: [],
        folioPhones: '',
        folioName: '',
        folioFax: '',
        folioAddress: '',
        folioEmail: '',
        folioRemarks: '',
        folioVatRegNo: '',
        folioMofRegNo: '',
        folioComReg: '',

        // Hopital Informaion
        clinicNo: '',
        homeNo: '',
        othersNo: '',
        smsText: '',
        doctorAdress: '',
        hosFaxNo: '',
        hosEmail: '',
        hosRemarks: '',
        hosIDCardNo: '',
        hosSyndicateNo: '',
        hosSource: '',
        hosSourceDropdown: [
            { value: 'U', label: 'User Defined' },
            { value: 'C', label: 'Clipper' },
        ],
        hosAuxACNo: '',
        hosVatAccNo: '',

        // Medical Information: 

        inOutHosp: '',
        inOutHospDropdown: [
            { value: 'I', label: 'Internal From Hospital Doctors' },
            { value: 'G', label: 'General Doctor Outside Hospital' },
        ],
        doctorType: '',
        doctorTypeDropdown: [
            { value: 'G', label: 'General Medecin' },
            { value: 'S', label: 'Specialist' },
            { value: 'D', label: 'Departmental' },
        ],
        residentPermanent: '',
        residentPermanentDropdown: [
            { value: 'R', label: 'Resident' },
            { value: 'P', label: 'Permanent' },
        ],
        workField: '',
        workFieldDropdown: [
            { value: 'C', label: 'Consultation Only' },
            { value: 'K', label: 'Surgeon' },
            { value: 'A', label: 'Anesthesia' },
        ],

        // Hospital Department
        departmentCode: '',
        departmentDropdown: [],

        // Medical Service
        medicalCode: '',
        medicalServicesDropdown: [],

        // Doctors Speciality
        specialityCode: '',
        specialtyDropdown: [],

        // Login User 
        loginCode: '',
        usersDropdown: [],

        loginPassword: '',
        internalResults: '',
        externalResults: '',
        defaultLanguage: '',
        defaultLanguageDropdown: [
            { value: 'E', label: 'English' },
            { value: 'F', label: 'French' },
            { value: 'S', label: 'Follow Center System File' },
        ],


        doctorsPhoto: '',
        doctorFingerPrint: [],
        arDocName: '',
        nfssNo: '',
        docRegNo: '',
        docSignature: [],


        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['doctorsCode', 'birthDate', 'folioCode'],
        tabid: 1,

        codeAvailable: true,
        notifType: "",
        notifTitle: "",
        notifMessage: "",
        notifTime: 2500,
        notifDisplay: '',
        statusDisabeld: true,
        modified: [], //This state is Just to check if the value changed or not 
        shouldBlockNavigation: false,
        privileges: {}
    }
    const [state, setState] = useStateWithCallback(STATE);
    const [initialState, setInitialState] = useState(STATE);
    const { userData, getUserPrivs } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);
    const navigate = useNavigate();


    //useInModal, state: editid, mode,

    //#region Side Effects
    useEffect(() => {
        if (!userData) {
            return
        }
        if (!useInModal) {
            let priv = getUserPrivs(uuid);
            if (location.pathname.toLocaleLowerCase().includes("/edit")) {
                if (priv?.Modify === 0) {
                    navigate('/DoctorsDefinition', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit' } })
                    setInitialState(prv => { return { ...prv, mode: 'Edit' } })
                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/DoctorsDefinition', { replace: true })
                }
                else {
                    setState(prv => { return { ...prv, mode: 'Add New' } })
                    setInitialState(prv => { return { ...prv, mode: 'Add New' } })

                }
            }

        }
    }, [userData])

    useEffect(async () => {
        let apis = [
            { url: `${urlPath}/Departments/getAllDepartment`, Type: 'get', params: '', datafilterfunction: null },
            { url: `${urlPath}/DoctorsSpeciality/getDoctorsSpeciality`, Type: 'get', params: '', datafilterfunction: null },
            { url: `${urlPath}/MedServices/getMedicalServices`, Type: 'get', params: '', datafilterfunction: null },
            { url: `${urlPath}/Doctors/getUsersUnrelated`, Type: 'get', params: '', datafilterfunction: null },
            { url: `${urlPath}/DoctorsCollectionGroup/getAllDoctorsCollectionGroup`, Type: 'get', params: '', datafilterfunction: null },
            { url: `${urlPath}/MedServices/getFolio`, Type: 'get', params: '', datafilterfunction: null },
        ]

        setisLoading(prv => prv + 1)
        let response = await FetchDataMultiple(apis);

        const departmentDropdown = response[0].data
        const specialtyDropdown = response[1].data
        const medicalServicesDropdown = response[2].data
        const usersDropdown = response[3].data
        const collectionGrpDropdown = response[4].data
        const folioDropdown = response[5].data

        setState(prv => {
            return {
                ...prv,
                departmentDropdown: cloneDeep(departmentDropdown),
                specialtyDropdown: cloneDeep(specialtyDropdown),
                medicalServicesDropdown: cloneDeep(medicalServicesDropdown),
                collectionGrpDropdown: cloneDeep(collectionGrpDropdown),
                usersDropdown: cloneDeep(usersDropdown),
                folioDropdown: cloneDeep(folioDropdown),
            }
        })
        setisLoading(prv => prv - 1)


    }, [])


    const departmentFormatedDropdown = useMemo(() => {
        let departmentDropdown = cloneDeep(state.departmentDropdown)
        let newDepFormat = []
        departmentDropdown.forEach(element => {
            newDepFormat.push({ value: element.dep_Code, label: element.dep_Name })
        })

        return newDepFormat;

    }, [state.departmentDropdown])

    const specialtyFormatedDropdown = useMemo(() => {
        let specialtyDropdown = cloneDeep(state.specialtyDropdown)
        let newSpecFormat = []
        specialtyDropdown.forEach(element => {
            newSpecFormat.push({ value: element.dos_Code, label: element.dos_Desc })
        })

        return newSpecFormat;

    }, [state.specialtyDropdown])

    const medicalServicesFormatedDropdown = useMemo(() => {
        let medicalServDropdown = cloneDeep(state.medicalServicesDropdown)
        let newMedServFormat = []
        medicalServDropdown.forEach(element => {
            newMedServFormat.push({ value: element.mes_code, label: element.mes_name })
        })

        return newMedServFormat;

    }, [state.medicalServicesDropdown])

    const collectionGrpFormatedDropdown = useMemo(() => {
        let collectionGrpDropdown = cloneDeep(state.collectionGrpDropdown)
        let collectionDropdownFormat = []
        collectionGrpDropdown.forEach(element => {
            collectionDropdownFormat.push({ value: element.dcg_Code, label: element.dcg_Desc })
        })

        return collectionDropdownFormat;

    }, [state.collectionGrpDropdown])

    const usersFormatedDropdown = useMemo(() => {
        let usersDropdown = cloneDeep(state.usersDropdown)
        let usersDropdownFormat = []
        usersDropdown.forEach(element => {
            usersDropdownFormat.push({ value: element.usr_Code, label: element.user_Name })
        })

        return usersDropdownFormat;

    }, [state.usersDropdown])

    const folioFormatedDropdown = useMemo(() => {
        let folioDropdown = cloneDeep(state.folioDropdown)
        let folioDropdownFormat = []
        folioDropdown.forEach(element => {
            folioDropdownFormat.push({ value: element.fo_subno + '/' + element.fo_serno, label: element.fo_name + '/' + element.fo_addres })
        })

        return folioDropdownFormat;

    }, [state.folioDropdown])



    //#region Memoized Callbacks
    const FillData = useCallback(async (id) => {


        if (id) {
            setisLoading(prv => prv + 1)
            const _data = {
                DocCode: id
            }
            let data = await FetchData(`${urlPath}/Doctors/getDoctorByCode`, 'get', _data);
            setisLoading(prv => prv - 1)
            if (data && data.data.length > 0) {
                let base64img = buildTypeFromBase64(data.data[0].doc_Photo)
                let fingerPrintData = buildTypeFromBase64(data.data[0].doc_FingerData)
                let signatureData = buildTypeFromBase64(data.data[0].doc_Signature)

                let o = {
                    doctorsCode: data.data[0].doc_Code ? data.data[0].doc_Code : '',
                    doctorsName: data.data[0].doc_Name,
                    status: data.data[0].doc_Status,
                    printedName: data.data[0].doc_PrtChk ? data.data[0].doc_PrtChk : '',
                    sex: data.data[0].doc_Sex ? data.data[0].doc_Sex : '',
                    collectionGrp: data.data[0].doc_ColGrps ? data.data[0].doc_ColGrps : '',
                    birthDate: data.data[0].doc_BirthDate ? data.data[0].doc_BirthDate : '',

                    folioCode: `${data.data[0].doc_FolioSub}/${data.data[0].doc_FolioNo}`,
                    folioPhones: data.data[0].fo_phone1 ? data.data[0].fo_phone1 : '',
                    folioName: data.data[0].fo_name ? data.data[0].fo_name : '',
                    folioFax: data.data[0].fo_fax ? data.data[0].fo_fax : '',
                    folioAddress: data.data[0].fo_addres ? data.data[0].fo_addres : '',
                    folioEmail: data.data[0].fo_Email ? data.data[0].fo_Email : '',
                    folioRemarks: data.data[0].fo_remark ? data.data[0].fo_remark : '',
                    folioVatRegNo: data.data[0].fo_vatreg ? data.data[0].fo_vatreg : '',
                    folioMofRegNo: data.data[0].fo_MOF ? data.data[0].fo_MOF : '',
                    folioComReg: data.data[0].fo_reg ? data.data[0].fo_reg : '',

                    clinicNo: data.data[0].doc_TelClinique1 ? data.data[0].doc_TelClinique1 : '', // there is doc_TelClinique1 and 2
                    homeNo: data.data[0].doc_TelHome1 ? data.data[0].doc_TelHome1 : '', // there is doc_TelHome1 and 2
                    othersNo: data.data[0].doc_TelAutres ? data.data[0].doc_TelAutres : '',
                    smsText: data.data[0].doc_SMSPhoneNo ? data.data[0].doc_SMSPhoneNo : '',
                    doctorAdress: data.data[0].doc_DoctorAddress ? data.data[0].doc_DoctorAddress : '',
                    hosFaxNo: data.data[0].doc_Fax ? data.data[0].doc_Fax : '',
                    hosEmail: data.data[0].doc_EMail ? data.data[0].doc_EMail : '',
                    hosRemarks: data.data[0].doc_Remarks ? data.data[0].doc_Remarks : '',
                    hosIDCardNo: data.data[0].doc_IDCardNo ? data.data[0].doc_IDCardNo : '',
                    hosSyndicateNo: data.data[0].doc_SyndicatNo ? data.data[0].doc_SyndicatNo : '',
                    hosSource: data.data[0].doc_Source ? data.data[0].doc_Source : '',
                    hosAuxACNo: data.data[0].doc_AuxAccNo ? data.data[0].doc_AuxAccNo : '',
                    hosVatAccNo: data.data[0].doc_VATAccNo ? data.data[0].doc_VATAccNo : '',

                    inOutHosp: data.data[0].doc_IntExt ? data.data[0].doc_IntExt : '',
                    doctorType: data.data[0].doc_Type ? data.data[0].doc_Type : '',
                    residentPermanent: data.data[0].doc_ResPer ? data.data[0].doc_ResPer : '',
                    workField: data.data[0].doc_Work ? data.data[0].doc_Work : '',

                    departmentCode: data.data[0].doc_DepCode ? data.data[0].doc_DepCode : '',

                    medicalCode: data.data[0].doc_MSCode ? data.data[0].doc_MSCode : '',

                    specialityCode: data.data[0].doc_Speciality ? data.data[0].doc_Speciality : '',

                    loginCode: data.data[0].doc_LogUserId ? data.data[0].doc_LogUserId : '',

                    loginPassword: data.data[0].doc_LogPwd ? data.data[0].doc_LogPwd : '',
                    internalResults: data.data[0].doc_ViewResIntPat ? data.data[0].doc_ViewResIntPat : '',
                    externalResults: data.data[0].doc_ViewResExtPat ? data.data[0].doc_ViewResExtPat : '',
                    defaultLanguage: data.data[0].doc_DefLang ? data.data[0].doc_DefLang : '',

                    doctorsPhoto: base64img?.data,
                    doctorFingerPrint: fingerPrintData,  // to fix
                    arDocName: data.data[0].doc_ArDocName,
                    nfssNo: data.data[0].doc_NoNfss,
                    docRegNo: data.data[0].doc_RegNo,
                    docSignature: signatureData,

                    createdBy: '',
                    creationDate: '',
                    modifiedBy: '',
                    modifiedDate: '',
                    needresdata: '',
                }
                setState(prv => {
                    return { ...prv, ...o }
                })
                setInitialState(prv => {
                    return { ...prv, ...o }
                })




            }
        }
    }, [])



    //#endRegion


    const isCodeAvailable = useCallback(async (id) => {
        if (id) {
            try {
                const _data = {
                    DocCode: id
                }
                let data = await FetchData(`${urlPath}/Doctors/getDoctorByCode`, 'get', _data);
                if (data.success && data.data.length > 0) return false;
                if (data.status == 313 && !data.success ) {
                    return true
                }
            } catch (error) {
                console.dir(error);
            }
        } else {
            return true
        }

    }, [])



    const handleBlur = useCallback(async (value, key) => {
        let isAvailable = await isCodeAvailable(value);
        setState(prv => {
            return { ...prv, codeAvailable: isAvailable }

        })



    }, [])





    const folioHandleChange = useCallback((data) => {
        let folioOptions = cloneDeep(state.folioDropdown)
        let dataArray = data.split('/')
        let fo_serno = dataArray[1]
        let fo_subno = dataArray[0]

        const neededFo = folioOptions.find(element => {
            if (element.fo_subno == fo_subno && element.fo_serno == fo_serno) return true;
            return false;
        });
        return neededFo;
    }, [state.folioDropdown]);

    const handleDateChange = useCallback(async (key, value) => {
        setState(prv => {
            if (prv.hasOwnProperty(`missing${key}`)) {
                return { ...prv, [key]: value, [`missing${key}`]: false }
            }
            else {
                return { ...prv, [key]: moment(value).format() }
            }
        })
    }, [])

    const handleChange = useCallback(async (value, key) => {
        if (key === "folioCode") {
            const data = folioHandleChange(value);
            setState(prv => {
                if (prv.hasOwnProperty(`missing${key}`)) {
                        return {
                            ...prv,
                            folioCode: value,
                            [`missing${key}`]: false,
                            folioName: data.fo_name,
                            folioPhones: data.fo_phone1,
                            folioFax: data.fo_fax,
                            folioAddress: data.fo_addres,
                            folioEmail: data.fo_email,
                            folioRemarks: data.fo_remark,
                        }
                }
                else {
                    return {
                        ...prv,
                        folioCode: value,
                        folioName: data.fo_name,
                        folioPhones: data.fo_phone1,
                        folioFax: data.fo_fax,
                        folioAddress: data.fo_addres,
                        folioEmail: data.fo_email,
                        folioRemarks: data.fo_remark,
                    }
                }
            })
            return;
        }
        setState(prv => {
            if (prv.hasOwnProperty(`missing${key}`)) {
                return { ...prv, [key]: value, [`missing${key}`]: false }
            }
            else {
                return { ...prv, [key]: value }
            }
        })
    }, [folioHandleChange])

    const handleSave = useCallback(async () => {
        let missing = isRequiredDataEmpty(state);
        if (!isEmpty(missing)) {
            setState({ ...state, ...missing },
                (nextState, nextSetState) => {
                    saveFinished(nextState, nextSetState, "error", "Some required fields can't be left empty", "", false)
                })
            return
        }
        else if (!state.codeAvailable) {
            return

        }
        else {
            let imageDataConverted = state.doctorsPhoto ? state.doctorsPhoto.split(",") : ''
            let folio_Array_slpitted = state.folioCode.split('/')
            let folio_SubNo = folio_Array_slpitted[0]
            let folio_SerNo = folio_Array_slpitted[1]
            let isoDate = isMoment(state.birthDate) ? state.birthDate.toISOString() : state.birthDate || "";

            const allFilePromises = [];
            state.doctorFingerPrint.forEach((item, res) => {
                if (!item.deleted) return allFilePromises.push(getBase64(item));
            });
            const allFilesBase64 = await Promise.all(allFilePromises);

            const allFilePromisesSignature = [];
            state.docSignature.forEach((item, res) => {
                if (!item.deleted) return allFilePromisesSignature.push(getBase64(item));
            });
            const allFilesSignatureBase64 = await Promise.all(allFilePromisesSignature);

            let objToSave = {
                // Doc_Code: 'CRB',
                Doc_Code: state.doctorsCode,
                Doc_Name: state.doctorsName,
                Doc_ResPer: state.residentPermanent,
                Doc_IntExt: state.inOutHosp,
                Doc_Type: state.doctorType,
                Doc_Work: state.workField,
                Doc_Remarks: state.hosRemarks,
                Doc_TelClinique1: state.clinicNo,
                Doc_TelClinique2: state.clinicNo,
                Doc_TelHome1: state.homeNo,
                Doc_TelHome2: state.homeNo,
                Doc_TelAutres: state.othersNo,
                Doc_DoctorAddress: state.doctorAdress,
                Doc_Fax: state.hosFaxNo,
                Doc_EMail: state.hosEmail,
                Doc_Photo: imageDataConverted ? imageDataConverted[1] : '',
                Doc_FingerData: allFilesBase64[0].file,
                Doc_IDCardNo: state.hosIDCardNo,
                Doc_BirthDate: isoDate,
                Doc_Sex: state.sex,
                Doc_DepCode: state.departmentCode,
                Doc_MSCode: state.medicalCode,
                Doc_AuxAccNo: state.hosAuxACNo,
                Doc_Speciality: state.specialityCode,
                Doc_Status: state.status,
                Doc_SyndicatNo: state.hosSyndicateNo,
                Doc_FolioNo: folio_SerNo,
                Doc_FolioSub: folio_SubNo,
                Doc_Source: state.hosSource,
                // Doc_LogUserId: 'CRB',
                Doc_LogUserId: state.loginCode,
                Doc_LogPwd: state.loginPassword,
                Doc_ViewResIntPat: state.internalResults,
                Doc_ViewResExtPat: state.externalResults,
                Doc_ArDocName: state.arDocName,
                Doc_NoNfss: state.nfssNo,
                Doc_PrtChk: state.printedName,
                Doc_SMSPhoneNo: state.smsText,
                Doc_DefLang: state.defaultLanguage,
                // Doc_Signature: null,
                Doc_Signature: allFilesSignatureBase64[0].file,
                Doc_VATAccNo: state.hosVatAccNo,
                Doc_ColGrps: state.collectionGrp,
                Doc_RegNo: state.docRegNo,
                Doc_InfectiousDisease: 'N', // to ask about it
                Doc_AuthToPrAntNoApp: 'N' // to ask about it

            }
            const response = await FetchData(`${urlPath}/Doctors/upsertDoctors`, 'post', objToSave).
                catch(err => {
                    throw err
                })
            if (response.success) {
                saveFinished(state, setState, "success", "", "", true, navigate)
            }
            else {
                let errs = response.data[0];
                let errmsg = ''
                for (let o of Object.keys(errs)) {
                    errmsg += errs[o] + ' ; '
                }
                saveFinished(state, setState, "error", "Saving Failed", errmsg, false)
            }
        }
    }, [state])

    const ButtonClick = useCallback((id) => {
        switch (id) {
            case 'clear':
                setState({ ...initialState })
                break;
            case 'save':
                handleSave();
                break;
            case 'close':
                navigate(-1);
                break;

        }
    }, [handleSave])
    //#endRegion 


    const returnUploadedFiles = useCallback((data, name) => {
        setState(prv => {
            return { ...prv, [name]: data }
        })
    }, [])

    const toggle = useCallback((tabid) => (e) => {
        if (tabid === 1) {
            setTimeout(() => {
                scrollIntoView(personelInfo.current)
            }, (0));
        }
        else if (tabid === 2) {
            setTimeout(() => {
                scrollIntoView(medicalInfo.current)
            }, (0));
        }
        else if (tabid === 3) {
            setTimeout(() => {
                scrollIntoView(extraInfo.current)
            }, (0));
        }
        setState(prv => { return { ...prv, tabid: tabid } })
    }, [])


    return (
        <>
            {!useInModal
                &&
                <ButtonsContainer
                    handleButtonClick={ButtonClick}
                    createdBy={state.createdBy}
                    creationDate={state.creationDate}
                    modifiedBy={state.modifiedBy}
                    modifiedDate={state.modifiedDate}
                    hideSaveAsDraft={true}
                />
            }
            <div className="animated fadeIn activeComponent" >
                <Notification
                    type={state.notifType}
                    title={state.notifTitle}
                    message={state.notifMessage}
                    display={state.notifDisplay}
                />
                <div className="row">
                    <div className="col-md-12 title">Doctor Definition  - {state.mode} </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-12'>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={state.tabid === 1 ? 'active' : ''} onClick={toggle(1)}>
                                    <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                                        Personal Information
                                    </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={state.tabid === 2 ? 'active' : ''} onClick={toggle(2)}>
                                    <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                                        Medical Information
                                    </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={state.tabid === 3 ? 'active' : ''} onClick={toggle(3)}>
                                    <span className="callout m-0 py-h text-muted text-center bg-faded text-uppercase">
                                        Doctor's Photo & Finger Prints/ Arabic Data
                                    </span>
                                </NavLink>
                            </NavItem>
                        </Nav>


                        <TabContent activeTab={state.tabid}>
                            <TabPane tabId={1}>
                                <div className='row mt-2'>
                                    <div className='col-12'>

                                        {/* Doctors Information */}
                                        <div className='row mb-2'>
                                            <div className=" col-lg-3 col-xl-2  ">Doctors Code</div>
                                            <div className=" col-lg-2 col-xl-2">
                                                <InputTextComp
                                                    value={state.doctorsCode}
                                                    name="doctorsCode"
                                                    handleChange={handleChange}
                                                    maxLength={4}
                                                    handleOnblur={handleBlur}
                                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                                    removeSpaces
                                                    disabled={state.mode == "Edit"}
                                                />
                                                {!state.codeAvailable &&
                                                    <label className="errorLabel"> Code Already Exists </label>
                                                }
                                            </div>
                                        </div>
                                        <div className='row mb-2'>

                                            <div className=" col-lg-3 col-xl-2">Doctors Name</div>
                                            <div className=" col-lg-3 col-xl-4">
                                                <InputTextComp
                                                    value={state.doctorsName}
                                                    name="doctorsName"
                                                    handleChange={handleChange}
                                                    maxLength={100}
                                                    className=""
                                                />
                                            </div>
                                            <div className="col-lg-3 col-xl-2  ">Status</div>
                                            <div className="col-lg-3 col-xl-4">

                                                <RadioGroupComp
                                                    name="status"
                                                    value={state.status}
                                                    radios={[{ value: "A", name: "Active" }, { value: "I", name: "Inactive" }]}
                                                    onClick={handleChange}
                                                    increaseArea
                                                    className={`${state.missingstatus ? "alert-danger" : ""}`}
                                                    disabled={state.mode !== "Edit"}
                                                />
                                            </div>

                                        </div>

                                        <div className='row mb-2'>
                                            <div className="col-lg-3 col-xl-2   ">Printed Name On Checks</div>
                                            <div className="col-lg-3 col-xl-4">
                                                <InputTextComp
                                                    value={state.printedName}
                                                    name="printedName"
                                                    handleChange={handleChange}
                                                    className=""

                                                />
                                            </div>

                                            <div className="col-lg-3 col-xl-2  ">Sex (M/F)</div>
                                            <div className="col-lg-3 col-xl-4">

                                                <RadioGroupComp
                                                    name="sex"
                                                    value={state.sex}
                                                    radios={[{ value: "M", name: "Male" }, { value: "F", name: "Female" }]}
                                                    onClick={handleChange}
                                                    increaseArea
                                                    className={`${state.missingstatus ? "alert-danger" : ""}`}
                                                // disabled={state.statusDisabeld || state.savedSuccessfully}
                                                />
                                            </div>

                                        </div>
                                        <div className='row mb-1'>
                                            <div className="col-lg-3 col-xl-2   ">Collection Group</div>
                                            <div className="col-lg-3 col-xl-4">
                                                <SelectComp
                                                    value={state.collectionGrp}
                                                    onChange={handleChange}
                                                    name="collectionGrp"
                                                    options={collectionGrpFormatedDropdown}
                                                    className=""
                                                    clearable
                                                    disabled={false}
                                                />
                                            </div>

                                            <div className="col-lg-3 col-xl-2  ">Birth Date</div>
                                            <div className="col-lg-3 col-xl-4">
                                                <DateTimePickerComp
                                                    selected={state.birthDate}
                                                    onDateTimeChange={handleDateChange}
                                                    name="birthDate"
                                                    // className={state[`${"Till/" + row.original.rowid}NotValid`] || state[`${"Till/" + row.original.rowid}Mandatory`] ? "alert-danger" : ""}
                                                    placeholder="--/--/----"
                                                    dateSlash
                                                    disabled={false}
                                                />
                                            </div>

                                        </div>


                                        {/* Folio Information */}
                                        <div className='row mb-2'>
                                            <div className="col-lg-3 col-xl-2  mb-3 title">Folio Information</div>
                                            <div className='row mb-2'>
                                                <div className='col-6'>
                                                    <div className='row'>
                                                        <div className=" col-lg-4 col-xl-4  ">Folio</div>
                                                        <div className=" col-lg-6 col-xl-6">
                                                            <SelectComp
                                                                value={state.folioCode}
                                                                onChange={handleChange}
                                                                name="folioCode"
                                                                options={folioFormatedDropdown}
                                                                className={`${state.missingfolioCode ? "alert-danger" : ""}`}
                                                                clearable
                                                                disabled={false}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <div className='row'>
                                                        <div className=" col-lg-4 col-xl-4  ">Phones</div>
                                                        <div className=" col-lg-6 col-xl-6">
                                                            <InputTextComp
                                                                value={state.folioPhones}
                                                                name="folioPhones"
                                                                handleChange={handleChange}
                                                                className=""
                                                                disabled={true}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row mb-2'>

                                                <div className=" col-lg-3 col-xl-2">Name</div>
                                                <div className=" col-lg-3 col-xl-4">
                                                    <InputTextComp
                                                        value={state.folioName}
                                                        name="folioName"
                                                        handleChange={handleChange}
                                                        className=""
                                                        disabled={true}

                                                    />
                                                </div>
                                                <div className="col-lg-3 col-xl-2  ">Fax</div>
                                                <div className="col-lg-3 col-xl-4">
                                                    <InputTextComp
                                                        value={state.folioFax}
                                                        name="folioFax"
                                                        handleChange={handleChange}
                                                        className=""
                                                        disabled={true}

                                                    />
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className="col-lg-3 col-xl-2   ">Address</div>
                                                <div className="col-lg-3 col-xl-4">
                                                    <InputTextComp
                                                        value={state.folioAddress}
                                                        name="folioAddress"
                                                        handleChange={handleChange}
                                                        className=""
                                                        disabled={true}

                                                    />
                                                </div>
                                                <div className="col-lg-3 col-xl-2  ">E-mail</div>
                                                <div className="col-lg-3 col-xl-4">
                                                    <InputTextComp
                                                        value={state.folioEmail}
                                                        name="folioEmail"
                                                        handleChange={handleChange}
                                                        className=""
                                                        disabled={true}

                                                    />
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className="col-lg-3 col-xl-2   ">Remarks</div>
                                                <div className="col-lg-9 col-xl-10">
                                                    <TextAreaComp
                                                        value={state.folioRemarks}
                                                        name="folioRemarks"
                                                        onChange={handleChange}
                                                        maxLength={1000}
                                                        style={{ minHeight: "50px" }}
                                                        className={`${state.missingservername ? "alert-danger" : ""}`}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className="col-lg-2 col-xl-2  ">VAT Registration No</div>
                                                <div className="col-lg-2 col-xl-2">
                                                    <InputTextComp
                                                        value={state.folioVatRegNo}
                                                        name="folioVatRegNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        disabled={true}

                                                    />
                                                </div>
                                                <div className="col-lg-2 col-xl-2  ">MOF Registration No</div>
                                                <div className="col-lg-2 col-xl-2">
                                                    <InputTextComp
                                                        value={state.folioMofRegNo}
                                                        name="folioMofRegNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        disabled={true}

                                                    />
                                                </div>
                                                <div className="col-lg-2 col-xl-2  ">Commercial Register</div>
                                                <div className="col-lg-2 col-xl-2">
                                                    <InputTextComp
                                                        value={state.folioComReg}
                                                        name="folioComReg"
                                                        handleChange={handleChange}
                                                        className=""
                                                        disabled={true}

                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hospital Information */}
                                        <div className='row mb-2'>
                                            <div className="col-lg-3 col-xl-2  mb-3 title">Hospital Information</div>
                                            <div className='row mb-3'>
                                                <div className="col-lg-2 col-xl-2  ">Phones</div>
                                                <div className="col-lg-1 col-xl-1  ">Clinic No</div>
                                                <div className="col-lg-1 col-xl-1">
                                                    <InputTextComp
                                                        value={state.clinicNo}
                                                        name="clinicNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        maxLength={9}

                                                    />
                                                </div>
                                                <div className="col-lg-1 col-xl-1  ">Home No</div>
                                                <div className="col-lg-1 col-xl-1">
                                                    <InputTextComp
                                                        value={state.homeNo}
                                                        name="homeNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        maxLength={9}

                                                    />
                                                </div>
                                                <div className="col-lg-1 col-xl-1  ">Others</div>
                                                <div className="col-lg-1 col-xl-1">
                                                    <InputTextComp
                                                        value={state.othersNo}
                                                        name="othersNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        maxLength={9}

                                                    />
                                                </div>
                                                <div className="col-lg-1 col-xl-1  ">SMS </div>
                                                <div className="col-lg-2 col-xl-2">
                                                    <InputTextComp
                                                        value={state.smsText}
                                                        name="smsText"
                                                        handleChange={handleChange}
                                                        className=""

                                                    />
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className=" col-lg-3 col-xl-2">Doctor Address</div>
                                                <div className=" col-lg-9 col-xl-10">
                                                    <TextAreaComp
                                                        value={state.doctorAdress}
                                                        name="doctorAdress"
                                                        onChange={handleChange}
                                                        maxLength={1000}
                                                        style={{ minHeight: "50px" }}
                                                        className={`${state.missingservername ? "alert-danger" : ""}`}
                                                        disabled={false}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className=" col-lg-3 col-xl-2">Fax No</div>
                                                <div className=" col-lg-3 col-xl-4">
                                                    <InputTextComp
                                                        value={state.hosFaxNo}
                                                        name="hosFaxNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        maxLength={60}

                                                    />
                                                </div>
                                                <div className="col-lg-3 col-xl-2  ">E-Mail</div>
                                                <div className="col-lg-3 col-xl-4">
                                                    <InputTextComp
                                                        value={state.hosEmail}
                                                        name="hosEmail"
                                                        handleChange={handleChange}
                                                        className=""
                                                        maxLength={300}

                                                    />
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className=" col-lg-3 col-xl-2">Remarks</div>
                                                <div className=" col-lg-9 col-xl-10">
                                                    <TextAreaComp
                                                        value={state.hosRemarks}
                                                        name="hosRemarks"
                                                        onChange={handleChange}
                                                        maxLength={1000}
                                                        style={{ minHeight: "50px" }}
                                                        className={`${state.missingservername ? "alert-danger" : ""}`}
                                                        disabled={false}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className="col-lg-2 col-xl-2  ">ID Card No</div>
                                                <div className="col-lg-2 col-xl-2">
                                                    <InputTextComp
                                                        value={state.hosIDCardNo}
                                                        name="hosIDCardNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        maxLength={13}

                                                    />
                                                </div>
                                                <div className="col-lg-2 col-xl-2  ">Syndicate No</div>
                                                <div className="col-lg-2 col-xl-2">
                                                    <InputTextComp
                                                        value={state.hosSyndicateNo}
                                                        name="hosSyndicateNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        maxLength={100}

                                                    />
                                                </div>
                                                <div className="col-lg-2 col-xl-2  ">Source</div>
                                                <div className="col-lg-2 col-xl-2">
                                                    <SelectComp
                                                        value={state.hosSource}
                                                        onChange={handleChange}
                                                        name="hosSource"
                                                        options={state.hosSourceDropdown}
                                                        className=""
                                                        clearable
                                                        disabled={false}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row mb-3'>
                                                <div className="col-lg-3 col-xl-2   ">Auxiliary A/C No</div>
                                                <div className="col-lg-3 col-xl-4">
                                                    <InputTextComp
                                                        value={state.hosAuxACNo}
                                                        name="hosAuxACNo"
                                                        handleChange={handleChange}
                                                        className=""
                                                        maxLength={4}

                                                    />
                                                </div>
                                                <div className="col-lg-3 col-xl-2  ">VAT Account No</div>
                                                <div className="col-lg-3 col-xl-4">
                                                    <InputTextComp
                                                        value={state.hosVatAccNo}
                                                        name="hosVatAccNo"
                                                        handleChange={handleChange}
                                                        className=""

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId={2}>
                                <div className="row mt-2" ref={medicalInfo}>
                                    <div className='col-12'>

                                        {/* Medical Information */}
                                        <div className='row mb-1 mt-1'>
                                            <div className=" col-lg-3 col-xl-2  ">In-Hosp/Gen Outside (I/G)</div>
                                            <div className=" col-lg-2 col-xl-2">
                                                <SelectComp
                                                    value={state.inOutHosp}
                                                    onChange={handleChange}
                                                    name="inOutHosp"
                                                    options={state.inOutHospDropdown}
                                                    className=""
                                                    clearable
                                                    disabled={false}
                                                />
                                            </div>
                                            <div className='col-2'></div>

                                            <div className=" col-lg-3 col-xl-2  ">Doctor Type</div>
                                            <div className=" col-lg-2 col-xl-2">
                                                <SelectComp
                                                    value={state.doctorType}
                                                    onChange={handleChange}
                                                    name="doctorType"
                                                    options={state.doctorTypeDropdown}
                                                    className=""
                                                    clearable
                                                    disabled={false}
                                                />
                                            </div>

                                        </div>
                                        <div className='row mb-1'>

                                            <div className=" col-lg-3 col-xl-2">Resident - Permanent (R/P)</div>
                                            <div className=" col-lg-3 col-xl-2">
                                                <SelectComp
                                                    value={state.residentPermanent}
                                                    onChange={handleChange}
                                                    name="residentPermanent"
                                                    options={state.residentPermanentDropdown}
                                                    className=""
                                                    clearable
                                                    disabled={false}
                                                />
                                            </div>
                                            <div className='col-2'></div>
                                            <div className="col-lg-3 col-xl-2  ">Work Field</div>
                                            <div className="col-lg-3 col-xl-2">

                                                <SelectComp
                                                    value={state.workField}
                                                    onChange={handleChange}
                                                    name="workField"
                                                    options={state.workFieldDropdown}
                                                    className=""
                                                    clearable
                                                    disabled={false}
                                                />
                                            </div>
                                        </div>

                                        {/* Hospital Department */}
                                        <div className='row mb-1'>
                                            <div className="col-lg-3 col-xl-2  mb-3 title">Hospital Department</div>
                                            <div className='row mb-2'>
                                                <div className=" col-lg-2 col-xl-2  ">Department Code</div>
                                                <div className=" col-lg-2 col-xl-2">
                                                    <SelectComp
                                                        value={state.departmentCode}
                                                        onChange={handleChange}
                                                        name="departmentCode"
                                                        options={departmentFormatedDropdown}
                                                        className=""
                                                        clearable
                                                        disabled={false}
                                                    />
                                                </div>
                                                <div className='col-2'></div>
                                            </div>
                                        </div>

                                        {/* Medical Service */}
                                        <div className='row mb-1'>
                                            <div className="col-lg-3 col-xl-2  mb-3 title">Medical Service</div>
                                            <div className='row mb-2'>
                                                <div className=" col-lg-2 col-xl-2  ">Code</div>
                                                <div className=" col-lg-2 col-xl-2">
                                                    <SelectComp
                                                        value={state.medicalCode}
                                                        onChange={handleChange}
                                                        name="medicalCode"
                                                        options={medicalServicesFormatedDropdown}
                                                        className=""
                                                        clearable
                                                        disabled={false}
                                                    />
                                                </div>
                                                <div className='col-2'></div>
                                            </div>
                                        </div>

                                        {/* Doctors Speciality */}
                                        <div className='row mb-1'>
                                            <div className="col-lg-3 col-xl-2  mb-3 title">Doctors Speciality</div>
                                            <div className='row mb-2'>
                                                <div className=" col-lg-2 col-xl-2  ">Code</div>
                                                <div className=" col-lg-3 col-xl-2">
                                                    <SelectComp
                                                        value={state.specialityCode}
                                                        onChange={handleChange}
                                                        name="specialityCode"
                                                        options={specialtyFormatedDropdown}
                                                        className=""
                                                        clearable
                                                        disabled={false}
                                                    />
                                                </div>
                                                <div className='col-2'></div>
                                            </div>
                                        </div>

                                        {/* Login User */}
                                        <div className='row mb-2'>
                                            <div className="col-lg-3 col-xl-2  mb-3 title">Login User</div>
                                            <div className='row mb-2'>
                                                <div className=" col-lg-2 col-xl-2  ">Code</div>
                                                <div className=" col-lg-3 col-xl-4">
                                                    <SelectComp
                                                        value={state.loginCode}
                                                        onChange={handleChange}
                                                        name="loginCode"
                                                        options={usersFormatedDropdown}
                                                        className=""
                                                        clearable
                                                        disabled={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-1' style={{ "marginLeft": "20%" }}>
                                            <div className='row mt-1'>
                                                <div className=" col-lg-3 col-xl-3">Login Password</div>
                                                <div className=" col-lg-4 col-xl-6">
                                                    <InputTextComp
                                                        value={state.loginPassword}
                                                        name="loginPassword"
                                                        handleChange={handleChange}
                                                        className=""

                                                    />
                                                </div>
                                            </div>
                                            <div className='row mt-1'>
                                                <div className=" col-lg-3 col-xl-3">View Results - Internal Patients - Day</div>
                                                <div className=" col-lg-4 col-xl-6">
                                                    <InputNumericComp
                                                        value={state.internalResults}
                                                        name="internalResults"
                                                        maxLength={2}
                                                        // onBlur={e => null}
                                                        handleChange={handleChange}
                                                        disabled={false}
                                                        removeSpaces
                                                    />
                                                </div>
                                            </div>
                                            <div className='row mt-1'>
                                                <div className=" col-lg-3 col-xl-3">View Results - External Patients - Day</div>
                                                <div className=" col-lg-4 col-xl-6">
                                                    <InputNumericComp
                                                        value={state.externalResults}
                                                        name="externalResults"
                                                        maxLength={2}
                                                        // onBlur={e => null}
                                                        handleChange={handleChange}
                                                        disabled={false}
                                                        removeSpaces
                                                    />
                                                </div>
                                            </div>
                                            <div className='row mt-1'>
                                                <div className=" col-lg-3 col-xl-3">Default Language Center Res</div>
                                                <div className=" col-lg-4 col-xl-6">
                                                    <SelectComp
                                                        value={state.defaultLanguage}
                                                        onChange={handleChange}
                                                        name="defaultLanguage"
                                                        options={state.defaultLanguageDropdown}
                                                        className=""
                                                        clearable
                                                        disabled={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId={3}>
                                <div className="row mt-1" ref={extraInfo}>
                                    <div className="row mt-1 mb-2">
                                        <div className='col-5'>
                                            {/* <TextAreaComp
                                                value={state.doctorsPhoto}
                                                name="doctorsPhoto"
                                                onChange={handleChange}
                                                maxLength={1000}
                                                style={{ minHeight: "200px" }}
                                                className={`${state.missingservername ? "alert-danger" : ""}`}
                                                disabled={false}
                                            /> */}
                                            <MnuBkGImgComp
                                                moduleName="Doctor's Photo"
                                                modulePrfix=" Logo"
                                                base64img={state.doctorsPhoto}
                                                name="doctorsPhoto"
                                                handleChange={handleChange}
                                                skipstyle
                                            />
                                        </div>
                                        <div className='col-1'></div>
                                        <div className='col-5'>
                                            <div className="row mt-1 mb-2">
                                                Doctor's Finger Print Data
                                            </div>
                                            <UploadFiles
                                                data={state.doctorFingerPrint}
                                                name="doctorFingerPrint"
                                                readOnly={false}
                                                onUploadUpdateData={returnUploadedFiles}
                                                classRow="col-12 col-lg-3"
                                            />
                                        </div>

                                    </div>

                                    <div className="row mt-4 mb-2">
                                        <div className='col-5'>

                                            <div className='row mt-2'>
                                                <div className='col-9'>
                                                    <InputTextComp
                                                        dir="rtl"
                                                        value={state.arDocName}
                                                        name="arDocName"
                                                        handleChange={handleChange}
                                                    // readOnly
                                                    // className=""

                                                    />
                                                </div>
                                                <div className='col-3' style={{ "direction": "rtl" }}>
                                                    اسم الطبيب :
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-9'>
                                                    <InputTextComp
                                                        dir="rtl"
                                                        value={state.nfssNo}
                                                        name="nfssNo"
                                                        handleChange={handleChange}
                                                    // readOnly
                                                    // className=""

                                                    />
                                                </div>
                                                <div className='col-3' style={{ "direction": "rtl" }}>
                                                    رقم الضمان :
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-9'>
                                                    <InputTextComp
                                                        dir="rtl"
                                                        value={state.docRegNo}
                                                        name="docRegNo"
                                                        handleChange={handleChange}
                                                        maxLength={100}
                                                    // readOnly
                                                    // className=""

                                                    />
                                                </div>
                                                <div className='col-3' style={{ "direction": "rtl" }}>
                                                    رقم تعاقد الضمان :
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-1'></div>
                                        <div className='col-5'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    Doctor's Signature
                                                </div>
                                            </div>
                                            <div className='row mt-1'>
                                                <div className='col-12'>
                                                    <UploadFiles
                                                        data={state.docSignature}
                                                        name="docSignature"
                                                        readOnly={false}
                                                        onUploadUpdateData={returnUploadedFiles}
                                                        classRow="col-12 col-lg-3"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>

                    </div>
                </div>
            </div>
        </>
    )
}
