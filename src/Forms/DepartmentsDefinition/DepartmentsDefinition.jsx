import { cloneDeep, isEmpty } from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import CheckBoxComp from '../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import Notification from '../../ReusableComponents/Other/Notification/Notification';
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent';
import { FetchData, isRequiredDataEmpty, saveFinished } from '../../utils/functions';
import RadioGroupComp from '../../ReusableComponents/Other/RadioGroupComp/RadioGroupComp';




export function DepartmentsDefinition({ uuid, useInModal, routing, ...props }) {


    const { location, params } = routing;

    const STATE = {
        mode: '',

        depCode: "",
        //missingcode: false, if mandatory
        emergencyCheck: false,
        depName: "",
        invoicing: "",
        invoicingPrefix: "",
        lastInvoiceNo: "",
        primeInvoicing: "",
        primeInvoicingPrefix: "",
        lastPrimeInvoiceNo: "",
        auxiliaryNo: "",
        auxStatus: "",
        includeBeds: "",
        followEr: "",

        workWeekDays: {
            monCheck: false,
            tueCheck: false,
            wedCheck: false,
            thuCheck: false,
            friCheck: false,
            satCheck: false,
            sunCheck: false,
        },

        headName: "",
        headFolio: "",
        folioOptions: [],
        headFolioName: "",
        headEmail: "",
        headPhones1: "",
        headPhones2: "",
        headPhones3: "",
        headFax: "",
        headAddress: "",


        emerName: "",
        emerFolio: "",
        emerFolioName: "",
        emerEmail: "",
        emerPhones1: "",
        emerPhones2: "",
        emerPhones3: "",
        emerFax: "",
        emerAddress: "",


        folioDropdown: [],
        folioData: [],

        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: [],

        codeAvailable: true,
        notifType: "",
        notifTitle: "",
        notifMessage: "",
        notifTime: 2500,
        notifDisplay: '',
        statusDisabeld: true,
        modified: [], //This state is Just to check if the value changed or not 
        shouldBlockNavigation: false,
        privileges: {},
        allchecked: false
    }
    const [state, setState] = useStateWithCallback(STATE);
    const [initialState, setInitialState] = useState(STATE);
    const { userData, getUserPrivs } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    //#region "Side Effects"
    useEffect(() => {
        if (!userData) {
            return
        }
        if (!useInModal) {

            let priv = getUserPrivs(uuid);
            if (location.pathname.toLocaleLowerCase().includes("/edit")) {
                if (priv?.Modify === 0) {
                    navigate('/DepartmentsDefinition', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit', privileges: priv } })
                    setInitialState(prv => {
                        return { ...prv, mode: 'Edit', privileges: priv }
                    })

                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/DepartmentsDefinition', { replace: true })
                }
                else {

                    setState(prv => { return { ...prv, mode: 'Add New', privileges: priv } })
                    setInitialState(prv => { return { ...prv, mode: 'Add New', privileges: priv } })
                    FillData()
                }
            }

        }
    }, [userData])
    useEffect(() => {
        window.addEventListener('resize', getWindowWidth);
        return () => {
            window.removeEventListener('resize', getWindowWidth)
        }

    }, []);
    //#endRegion

    useEffect(() => {
        debugger
        let dropDownOptions = [];
        let folioD = [];
        FetchData('DataFiles/Forms/FolioData.json', 'get', null,
            (e) => { return e }).then((res) => {
                debugger
                res.map((value, idx) => {
                    dropDownOptions.push({ value: value.Fo_serno, label: value.Fo_name });
                    folioD.push(value);
                })
                debugger
                setState(prv => {
                    return { ...prv, folioData: folioD, folioOptions: dropDownOptions }
                })
            });



    }, [])

    //#region Memoized Callbacks
    const FillData = useCallback(async (id) => {
        debugger
        if (id) {
            setisLoading(prv => prv + 1)
            let data = await FetchData('DataFiles/Forms/DepartmentsDefinition.json', 'get', null,
                (e) => { return e.Dep_Code.toString() === id.toString() });
            debugger
            let folioData = await FetchData('DataFiles/Forms/FolioData.json', 'get', null,
                (e) => { return e });
            setisLoading(prv => prv - 1)
            if (data && data.length > 0) {
                let folioObj = getFolioObj(data[0].Dep_HeadFolioNo, data[0].Dep_EmergFoliono, folioData);
                let o = {
                    depCode: data[0].Dep_Code ? data[0].Dep_Code.toString() : '',
                    depName: data[0].Dep_Name ? data[0].Dep_Name : '',
                    emergencyCheck: data[0].Dep_ER?.toLowerCase() === 'y' ? true : false,
                    invoicing: data[0].Dep_AllowInvoicing ? data[0].Dep_AllowInvoicing : "",
                    invoicingPrefix: data[0].Dep_InvoicingPrefix ? data[0].Dep_InvoicingPrefix : "",
                    lastInvoiceNo: data[0].Dep_LastInvNo ? data[0].Dep_LastInvNo : "",

                    primeInvoicing: data[0].Dep_Allow01Inv ? data[0].Dep_Allow01Inv : "",
                    primeInvoicingPrefix: data[0].Dep_01InvPrf ? data[0].Dep_01InvPrf : "",
                    lastPrimeInvoiceNo: data[0].Dep_01LastInvNo ? data[0].Dep_01LastInvNo : "",
                    auxiliaryNo: data[0].Dep_CCAuxNo ? data[0].Dep_CCAuxNo : "",
                    auxStatus: data[0].Dep_Status,
                    includeBeds: data[0].Dep_IncludeBeds,
                    followEr: data[0].Dep_FollowERRate,
                    workWeekDays: data[0].Dep_workWeekDays ? getWorkWeekDays(data[0].Dep_workWeekDays) : {},

                    headName: data[0].Dep_HeadName ? data[0].Dep_HeadName : '',
                    emerName: data[0].Dep_EmergName ? data[0].Dep_EmergName : '',

                }
                setState(prv => {
                    return { ...prv, ...o, ...folioObj }
                })
                setInitialState(prv => {
                    return { ...prv, ...o, ...folioObj }
                })

            }

        }
    }, [])

    const getFolioObj = (headNo, emerNo, folioData) => {
        let folioObj = {};
        let headObj = {};
        let emerObj = {};
        debugger
        if (headNo) {
            folioData.map((folio, idx) => {
                if (folio.Fo_serno.toString() === headNo) {
                    folioObj = cloneDeep(folio);
                }
            })
            headObj.headFolio = folioObj.Fo_serno;
            headObj.headFolioName = folioObj.Fo_name;
            headObj.headEmail = folioObj.Fo_Email;
            headObj.headPhones1 = folioObj.Fo_phones1;
            headObj.headPhones2 = folioObj.Fo_phones2;
            headObj.headPhones3 = folioObj.Fo_phones3;
            headObj.headFax = folioObj.Fo_fax;
            headObj.headAddress = folioObj.Fo_addres;
        }
        if (emerNo) {
            folioData.map((folio, idx) => {
                if (folio.Fo_serno.toString() === emerNo) {
                    folioObj = cloneDeep(folio);
                }
            })
            emerObj.emerFolio = folioObj.Fo_serno;
            emerObj.emerFolioName = folioObj.Fo_name;
            emerObj.emerEmail = folioObj.Fo_Email;
            emerObj.emerPhones1 = folioObj.Fo_phones1;
            emerObj.emerPhones2 = folioObj.Fo_phones2;
            emerObj.emerPhones3 = folioObj.Fo_phones3;
            emerObj.emerFax = folioObj.Fo_fax;
            emerObj.emerAddress = folioObj.Fo_addres;
        }

        return { ...headObj, ...emerObj }

    }

    const getWorkWeekDays = (workWeekDaysStr) => {
        let workWeekDaysObj = {};
        for (let i = 0; i < workWeekDaysStr.length; i++) {
            switch (i) {
                case 0:
                    workWeekDaysObj = { ...workWeekDaysObj, monCheck: (workWeekDaysStr[i] === "1" ? true : false) }
                    break;
                case 1:
                    workWeekDaysObj = { ...workWeekDaysObj, tueCheck: (workWeekDaysStr[i] === "1" ? true : false) }
                    break;
                case 2:
                    workWeekDaysObj = { ...workWeekDaysObj, wedCheck: (workWeekDaysStr[i] === "1" ? true : false) }
                    break;
                case 3:
                    workWeekDaysObj = { ...workWeekDaysObj, thuCheck: (workWeekDaysStr[i] === "1" ? true : false) }
                    break;
                case 4:
                    workWeekDaysObj = { ...workWeekDaysObj, friCheck: (workWeekDaysStr[i] === "1" ? true : false) }
                    break;
                case 5:
                    workWeekDaysObj = { ...workWeekDaysObj, satCheck: (workWeekDaysStr[i] === "1" ? true : false) }
                    break;
                case 6:
                    workWeekDaysObj = { ...workWeekDaysObj, sunCheck: (workWeekDaysStr[i] === "1" ? true : false) }
                    break;
                default:
                    break;
            }
        }
        return workWeekDaysObj;
    }

    const isCodeAvailable = useCallback(async (id) => {

        let data = await FetchData('DataFiles/Forms/DepartmentsDefinition.json', 'get', null,
            id ? (e) => { return e.Dep_Code.toString() === id } : () => false);
        return data.length === 0
    }, [])
    const handleBlur = useCallback(async (value, key) => {
        let isAvailable = await isCodeAvailable(value);
        setState(prv => {
            return { ...prv, codeAvailable: isAvailable }

        })



    }, [])
    const handleChange = useCallback(async (value, key) => {
        debugger
        if (key === "headFolio" || key === "emerFolio") {
            let folioClicked = {};
            state.folioData.map((folioObj, idx) => {
                if (folioObj.Fo_serno === value) {
                    folioClicked = cloneDeep(folioObj);
                }
            })

            if (key === "headFolio") {

                setState(prv => {
                    if (prv.hasOwnProperty(`missing${key}`)) {
                        return {
                            ...prv,
                            [key]: value,
                            [`missing${key}`]: false,
                            headFolioName: folioClicked.Fo_abvname,
                            headEmail: folioClicked.Fo_Email,
                            headPhones1: folioClicked.Fo_phones1,
                            headPhones2: folioClicked.Fo_phones2,
                            headPhones3: folioClicked.Fo_phones3,
                            headFax: folioClicked.Fo_fax,
                            headAddress: folioClicked.Fo_addres
                        }
                    }
                    else {
                        return {
                            ...prv,
                            [key]: value,
                            headFolioName: folioClicked.Fo_abvname,
                            headEmail: folioClicked.Fo_Email,
                            headPhones1: folioClicked.Fo_phones1,
                            headPhones2: folioClicked.Fo_phones2,
                            headPhones3: folioClicked.Fo_phones3,
                            headFax: folioClicked.Fo_fax,
                            headAddress: folioClicked.Fo_addres
                        }
                    }
                })

            } else if (key === "emerFolio") {
                setState(prv => {
                    if (prv.hasOwnProperty(`missing${key}`)) {
                        return {
                            ...prv,
                            [key]: value,
                            [`missing${key}`]: false,
                            emerFolioName: folioClicked.Fo_abvname,
                            emerEmail: folioClicked.Fo_Email,
                            emerPhones1: folioClicked.Fo_phones1,
                            emerPhones2: folioClicked.Fo_phones2,
                            emerPhones3: folioClicked.Fo_phones3,
                            emerFax: folioClicked.Fo_fax,
                            emerAddress: folioClicked.Fo_addres
                        }
                    }
                    else {
                        return {
                            ...prv,
                            [key]: value,
                            emerFolioName: folioClicked.Fo_abvname,
                            emerEmail: folioClicked.Fo_Email,
                            emerPhones1: folioClicked.Fo_phones1,
                            emerPhones2: folioClicked.Fo_phones2,
                            emerPhones3: folioClicked.Fo_phones3,
                            emerFax: folioClicked.Fo_fax,
                            emerAddress: folioClicked.Fo_addres
                        }
                    }
                })

            }
        }
        setState(prv => {
            if (prv.hasOwnProperty(`missing${key}`)) {
                return { ...prv, [key]: value, [`missing${key}`]: false }
            }
            else {
                return { ...prv, [key]: value }
            }
        })
    }, [])

    const handleSave = useCallback(async () => {
        let missing = isRequiredDataEmpty(state);
        // console.log('state', state)

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
            saveFinished(state, setState, "success", "", "", true, navigate)
        }
    }, [state])
    const ButtonClick = useCallback((id) => {
        switch (id) {
            case 'clear':
                // console.log({ initialState });
                setState({ ...initialState })
                break;
            case 'save':
                handleSave();
                break;
            case 'close':
                navigate(-1);
                break;
            default:
                break;

        }
    }, [handleSave, initialState])



    const getWindowWidth = useCallback(() => {
        setState(prv => {
            return {
                ...prv, screenWidth: window.innerWidth
            }
        })
    }, []);
    //#endRegion



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
                    <div id="UserDefinitionContainer" className="col-md-12 title">Departments Definition  - {state.mode} </div>
                </div>

                <div className='row mt-2'>
                    <div className=" col-xl-2 col-sm-3">Departments Code</div>
                    <div className=" col-xl-4 col-sm-9">
                        <InputTextComp
                            value={state.depCode}
                            name="depCode"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            disabled={false}
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                    {!state.codeAvailable &&
                        <label className="errorLabel"> Code Already Exists </label>
                    }

                    <div className=" col-lg-3 col-xl-4">
                        <CheckBoxComp
                            checked={state.emergencyCheck}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="Emergency"
                            description="Emergency"

                        />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className="col-xl-2 col-sm-3">Department Name</div>
                    <div className="col-xl-4 col-sm-9">
                        <InputTextComp
                            value={state.depName}
                            name="depName"
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            maxLength={1000}
                            disabled={false}

                        />
                    </div>

                </div>
                <div className='row mt-4'>
                    <div className="col-lg-1 col-xl-2">Allow Invoicing</div>
                    <div className="col-lg-3 col-xl-3">
                        <RadioGroupComp
                            name="invoicing"
                            value={state.invoicing}
                            radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                            onClick={handleChange}
                            increaseArea
                            className={`${state.missingstatus ? "alert-danger" : ""}`}
                            disabled={false}
                        />
                    </div>

                    <div className="col-lg-3 col-xl-1">Invoicing Prefix</div>
                    <div className=" col-lg-3 col-xl-1">
                        <InputTextComp
                            value={state.invoicingPrefix}
                            name="invoicingPrefix"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            disabled={state.invoicing === "Y" ? false : true}
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                    <div className="col-lg-3 col-xl-1">Last Invoice No.</div>
                    <div className=" col-lg-3 col-xl-1">
                        <InputTextComp
                            value={state.lastInvoiceNo}
                            name="lastInvoiceNo"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            disabled={state.invoicing === "Y" ? false : true}
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>

                </div>
                <div className='row mt-4'>
                    <div className="col-lg-1 col-xl-2 ">Allow Prime Invoicing</div>
                    <div className="col-lg-3 col-xl-3">
                        <RadioGroupComp
                            name="primeInvoicing"
                            value={state.primeInvoicing}
                            radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                            onClick={handleChange}
                            increaseArea
                            className={`${state.missingstatus ? "alert-danger" : ""}`}
                            disabled={false}
                        />
                    </div>
                    <div className="col-lg-3 col-xl-1">Prime Invoicing Prefix</div>
                    <div className=" col-lg-3 col-xl-1">
                        <InputTextComp
                            value={state.primeInvoicingPrefix}
                            name="primeInvoicingPrefix"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            disabled={state.primeInvoicing === "Y" ? false : true}
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                    <div className="col-lg-3 col-xl-1">Prime Last Invoice No.</div>
                    <div className=" col-lg-3 col-xl-1">
                        <InputTextComp
                            value={state.lastPrimeInvoiceNo}
                            name="lastPrimeInvoiceNo"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            disabled={state.primeInvoicing === "Y" ? false : true}
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className=" col-lg-3 col-xl-2  ">C.C Auxiliary A/C No.</div>
                    <div className=" col-lg-3 col-xl-1">
                        <InputTextComp
                            value={state.auxiliaryNo}
                            name="auxiliaryNo"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            disabled={false}
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>





                </div>
                <div className='row mt-4'>
                    <div className="col-lg-1 col-xl-2">Status</div>
                    <div className=" col-lg-3 col-xl-3">

                        <RadioGroupComp
                            name="auxStatus"
                            value={state.auxStatus}
                            radios={[{ value: "A", name: "Active" }, { value: "I", name: "Inactive" }]}
                            onClick={handleChange}
                            increaseArea
                            className={`${state.missingstatus ? "alert-danger" : ""}`}
                        />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className="col-lg-3 col-xl-2">Include Beds</div>
                    <div className=" col-lg-3 col-xl-3">

                        <RadioGroupComp
                            name="includeBeds"
                            value={state.includeBeds}
                            radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                            onClick={handleChange}
                            increaseArea
                            className={`${state.missingstatus ? "alert-danger" : ""}`}
                        />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className="col-lg-3 col-xl-2">Follow ER rates</div>
                    <div className=" col-lg-3 col-xl-3">

                        <RadioGroupComp
                            name="followEr"
                            value={state.followEr}
                            radios={[{ value: "Y", name: "Yes" }, { value: "N", name: "No" }]}
                            onClick={handleChange}
                            increaseArea
                            className={`${state.missingstatus ? "alert-danger" : ""}`}
                        />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className=" col-lg-3 col-xl-2  ">Work Weekdays</div>
                    <div className="col-lg-9">
                        <CheckBoxComp
                            checked={state.workWeekDays.monCheck}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="Monday"
                            description="Monday"

                        />
                        <CheckBoxComp
                            checked={state.workWeekDays.tueCheck}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="Tuesday"
                            description="Tuesday"

                        />
                        <CheckBoxComp
                            checked={state.workWeekDays.wedCheck}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="Wednesday"
                            description="Wednesday"

                        />
                        <CheckBoxComp
                            checked={state.workWeekDays.thuCheck}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="Thursday"
                            description="Thursday"

                        />
                        <CheckBoxComp
                            checked={state.workWeekDays.friCheck}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="Friday"
                            description="Friday"

                        />
                        <CheckBoxComp
                            checked={state.workWeekDays.satCheck}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="Saturday"
                            description="Saturday"

                        />
                        <CheckBoxComp
                            checked={state.workWeekDays.sunCheck}
                            onCheckChange={(checked, key) => handleChange(checked, key)}
                            name="Sunday"
                            description="Sunday"

                        />

                    </div>
                </div>

                <div className='row mt-4'>
                    <div className="row">
                        <div id="UserDefinitionContainer" className="col-md-12 title">Head of Department </div>
                    </div>

                    <div className="col-xl-2 col-sm-3">Name</div>
                    <div className="col-xl-4 col-sm-9">
                        <InputTextComp
                            value={state.headName}
                            name="headName"
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            maxLength={1000}
                            disabled={false}

                        />
                    </div>

                </div>



                {/* Folio */}
                <div className='row mt-2'>
                    <div className=" col-lg-3 col-xl-2  ">Folio</div>
                    <div className=" col-lg-4 col-xl-5">
                        <SelectComp
                            value={state.headFolio}
                            onChange={handleChange}
                            name="headFolio"
                            options={state.folioOptions}
                            className={`${state.missingdbcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            clearable
                            disabled={false}
                        />
                    </div>
                    <div className=" col-lg-2 col-xl-1">Name</div>
                    <div className=" col-lg-3 col-xl-4">
                        <InputTextComp
                            value={state.headFolioName}
                            name="headFolioName"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            readOnly
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className="col-xl-2 col-sm-3">Email</div>
                    <div className="col-xl-4 col-sm-9">
                        <InputTextComp
                            value={state.headEmail}
                            name="headEmail"
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            maxLength={1000}
                            disabled={false}

                        />
                    </div>

                </div>

                <div className='row mt-2'>
                    <div className="col-sm-3 col-lg-3 col-xl-2   ">Phones</div>
                    <div className='col-sm-9 col-lg-9 col-xl-10'>
                        <div className='row'>

                            <div className="col-xl-4 col-sm-9">

                                <InputTextComp
                                    value={state.headPhones1}
                                    name="headPhones1"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    readOnly
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                            </div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.headPhones2}
                                    name="headPhones2"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    readOnly
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                            </div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.headPhones3}
                                    name="headPhones3"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    readOnly
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                            </div>
                        </div>
                    </div>

                </div>


                <div className='row mt-2'>
                    <div className="col-sm-3 col-lg-3 col-xl-2  ">Fax</div>
                    <div className="col-sm-9 col-lg-9 col-xl-10">
                        <InputTextComp
                            value={state.headFax}
                            name="headFax"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            readOnly
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                </div>
                {/* Address */}
                <div className='row mt-2'>
                    <div className="col-sm-3 col-lg-3 col-xl-2  ">Address</div>
                    <div className="col-sm-9 col-lg-9 col-xl-10">
                        <InputTextComp
                            value={state.headAddress}
                            name="headAddress"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            readOnly
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                </div>


                <div className='row mt-4'>
                    <div className="row">
                        <div id="UserDefinitionContainer" className="col-md-12 title">Emergency Contact </div>
                    </div>
                    <div className="col-xl-2 col-sm-3">Name</div>
                    <div className="col-xl-4 col-sm-9">
                        <InputTextComp
                            value={state.emerName}
                            name="emerName"
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            maxLength={1000}
                            disabled={false}

                        />
                    </div>

                </div>

                {/* Folio */}
                <div className='row mt-2'>
                    <div className=" col-lg-3 col-xl-2  ">Folio</div>
                    <div className=" col-lg-4 col-xl-5">
                        <SelectComp
                            value={state.emerFolio}
                            onChange={handleChange}
                            name="emerFolio"
                            options={state.folioOptions}
                            className={`${state.missingdbcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            clearable
                            disabled={false}
                        />
                    </div>
                    <div className=" col-lg-2 col-xl-1">Name</div>
                    <div className=" col-lg-3 col-xl-4">
                        <InputTextComp
                            value={state.emerFolioName}
                            name="emerFolioName"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            readOnly
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className="col-xl-2 col-sm-3">Email</div>
                    <div className="col-xl-4 col-sm-9">
                        <InputTextComp
                            value={state.emerEmail}
                            name="emerEmail"
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            maxLength={1000}
                            disabled={false}

                        />
                    </div>

                </div>

                <div className='row mt-2'>
                    <div className="col-sm-3 col-lg-3 col-xl-2   ">Phones</div>
                    <div className='col-sm-9 col-lg-9 col-xl-10'>
                        <div className='row'>

                            <div className="col-xl-4 col-sm-9">

                                <InputTextComp
                                    value={state.emerPhones1}
                                    name="emerPhones1"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    readOnly
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                            </div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.emerPhones2}
                                    name="emerPhones2"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    readOnly
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                            </div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.emerPhones3}
                                    name="emerPhones3"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    readOnly
                                    className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                            </div>

                        </div>
                    </div>

                </div>

                <div className='row mt-2'>
                    <div className="col-sm-3 col-lg-3 col-xl-2  ">Fax</div>
                    <div className="col-sm-9 col-lg-9 col-xl-10">
                        <InputTextComp
                            value={state.emerFax}
                            name="emerFax"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            readOnly
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                </div>
                {/* Address */}
                <div className='row mt-2'>
                    <div className="col-sm-3 col-lg-3 col-xl-2  ">Address</div>
                    <div className="col-sm-9 col-lg-9 col-xl-10">
                        <InputTextComp
                            value={state.emerAddress}
                            name="emerAddress"
                            maxLength={20}
                            handleOnblur={handleBlur}
                            handleChange={handleChange}
                            readOnly
                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                            removeSpaces
                        />
                    </div>
                </div>


            </div>
        </>
    )
}
