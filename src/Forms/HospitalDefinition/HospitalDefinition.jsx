import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer';
import { FetchData, isRequiredDataEmpty, saveFinished, SetMandatoryFields } from '../../utils/functions';
import { urlPath } from '../../globals';
import Notification from '../../ReusableComponents/Other/Notification/Notification'
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import TextAreaComp from '../../ReusableComponents/Other/TextAreaComp/TextAreaComp';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import { find, isEmpty, map, split } from 'lodash';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import SelectComp from '../../ReusableComponents/Other/SelectComponent/SelectComponent';
import { useFetchData } from '../../CustomHooks/APIs/useFetchData';
import { MnuBkGImgComp } from '../MenuBackground/MnuBkGImgComp';


export function HospitalDefinition({ uuid, useInModal, routing, ...props }) {


    const { location, params } = routing;


    const STATE = {
        mode: '',
        recId: '',

        // inputs State: 
        code: "",
        missingcode: false,
        hosName: '',
        missinghosName: false,
        contactName: '',
        Remarks: '',
        regionCode: '',
        missingregionCode: false,
        hospitalLogo: "",
        folioCode: '',
        phone: '',
        folioName: '',
        fax: '',
        address: '',
        email: '',
        folioRemarks: '',


        createdBy: "",
        creationDate: "",
        modifiedBy: "",
        modifiedDate: "",
        mandatory: ['code', 'hosName', 'regionCode'],

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


    const [regionOptions, regionOptionsError] = useFetchData(`${urlPath}/Region/getRegions`, 'get');
    const [folioOptions, folioOptionsError] = useFetchData(`${urlPath}/MedServices/getFolio`, 'get');


    const regionDropdown = useMemo(() => {
        let regionOptionsArray = []
        regionOptions.forEach(element => {
            // regionOptionsArray.push({ label: element.reg_Description, value: element.reg_RegCode })
            regionOptionsArray.push({ label: element.reg_Description, value: element.reg_RecId })
        });
        return regionOptionsArray
    }, [regionOptions])


    // merge of fo_name and fo_addres will be done by backend
    const folioDropdown = useMemo(() => {
        let folioOptionsArray = []
        folioOptions.forEach(Eachel => {
            folioOptionsArray.push({ label: Eachel.fo_name + '/' + Eachel.fo_addres, value: Eachel.fo_subno + '/' + Eachel.fo_serno })
        });
        return folioOptionsArray
    }, [folioOptions])
    //useInModal, state: editid, mode,

    //#hospital Side Effects
    useEffect(() => {
        if (!userData) {
            return
        }
        if (!useInModal) {
            let priv = getUserPrivs(uuid);
            if (location.pathname.toLocaleLowerCase().includes("/edit")) {
                if (priv?.Modify === 0) {
                    navigate('/HospitalDef', { replace: true })
                }
                else {
                    FillData(params?.editid)
                    setState(prv => { return { ...prv, mode: 'Edit', recId: params?.editid } })
                    setInitialState(prv => { return { ...prv, mode: 'Edit' } })
                }
            }
            else if (location.pathname.toLocaleLowerCase().includes("/add")) {
                if (priv?.Add === 0) {
                    navigate('/HospitalDef', { replace: true })
                }
                else {
                    setState(prv => { return { ...prv, mode: 'Add New' } })
                    setInitialState(prv => { return { ...prv, mode: 'Add New' } })

                }
            }

        }
    }, [userData])

    //#endhospital

    //#hospital Memoized Callbacks
    const FillData = useCallback(async (id) => {

        if (id) {
            setisLoading(prv => prv + 1)
            const _data = {
                Hop_Code: id
            }

            let data = await FetchData(`${urlPath}/Hospitals/getHospitalByCode`, 'get', _data);
            setisLoading(prv => prv - 1)
            if (data && data.data.length > 0) {
                let base64img = data.data[0].hos_Logo
                if (!isEmpty(base64img)) {
                    let imgType = ''
                    switch (base64img.charAt(0)) {
                        case '/':
                            imgType = 'jpeg'
                            break;
                        case 'i':
                            imgType = 'png'
                            break;

                        case 'R':
                            imgType = 'gif'
                            break;
                        case 'U':
                            imgType = 'webp'
                            break;
                        default:
                            break;

                    }

                    //image/jpeg;base64,
                    if (imgType) {
                        base64img = { data: `data:image/${imgType};base64,${base64img}` }
                    }



                }
                let o = {
                    code: data.data[0].hos_HospCode ? data.data[0].hos_HospCode : '',
                    hosName: data.data[0].hos_HospName ? data.data[0].hos_HospName : '',
                    contactName: data.data[0].hos_ContName,
                    Remarks: data.data[0].hos_Remark,
                    hospitalLogo: base64img?.data,
                    regionCode: data.data[0].hos_RegRecId,
                    folioCode: data.data[0].hos_FolioSub + "/" + data.data[0].hos_FolioNo, // to be changed when data gets concatinatet from backend
                    phone: data.data[0].fo_phone1,
                    folioName: data.data[0].fo_name,
                    fax: data.data[0].fo_fax,
                    address: data.data[0].fo_addres,
                    email: data.data[0].fo_Email,
                    folioRemarks: data.data[0].fo_remark,

                    createdBy: '',
                    creationDate: '',
                    modifiedBy: data.data[0].hos_Ustmp,
                    modifiedDate: data.data[0].hos_Dstmp,
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

    const folioHandleChange = useCallback((data) => {

        let dataArray = data.split('/')
        let fo_serno = dataArray[1]
        let fo_subno = dataArray[0]

        const neededFo = folioOptions.find(element => {
            if (element.fo_subno == fo_subno && element.fo_serno == fo_serno) return true;
            return false;
        });
        return neededFo;
    }, [folioOptions]);

    const isCodeAvailable = useCallback(async (id) => {
        let data = await FetchData(`${urlPath}/Hospitals/getAllHospitals`, 'get', null,
            id ? (e) => { return e.hos_HospCode.toString() === id } : () => false);

        return data.data.length === 0
    }, [])



    const handleBlur = useCallback(async (value, key) => {
        let isAvailable = await isCodeAvailable(value);
        setState(prv => {
            return { ...prv, codeAvailable: isAvailable }

        })



    }, [])

    const handleChange = useCallback(async (value, key) => {

        if (key === "folioCode") {
            const data = folioHandleChange(value);
            setState(prv => {
                if (prv.hasOwnProperty(`missing${key}`)) {
                    return { ...prv, folioCode: value, [`missing${key}`]: false }
                }
                else {
                    return {
                        ...prv,
                        folioCode: value,
                        folioName: data.fo_name,
                        phone: data.fo_phone1,
                        fax: data.fo_fax,
                        address: data.fo_addres,
                        email: data.fo_email,
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


    const updateBackground = useCallback((id, img) => {
        setState(prv => {
            return {
                ...prv,
                hospitalLogo: img

            }
        })
        // if (state.menus.length > 0) {
        //     let arr = [...state.menus]
        //     let mnu = arr.at(id);
        //     mnu.ModuleBackground = img;
        //     setState(prv => { return { ...prv, menus: [...arr] } });
        // }

    }, [state])

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
        let imageDataConverted = state.hospitalLogo ? state.hospitalLogo.split(",") : ''
        let folio_Array_slpitted = state.folioCode.split('/')
        let folio_SubNo = folio_Array_slpitted[0]
        let folio_SerNo = folio_Array_slpitted[1]
        let objToSave = {
            hos_RecId: 0,
            hos_Hospcode: state.code ? state.code : '',
            hos_HospName: state.hosName ? state.hosName : '',
            hos_ContName: state.contactName,
            hos_RegRecId: state.regionCode,
            hos_FolioNo: folio_SerNo,
            hos_FolioSub: folio_SubNo,
            hos_Remark: state.Remarks,
            // hos_Logo: state.hospitalLogo,
            hos_Logo: imageDataConverted[1],
            modifiedBy: null,
            modifiedDate: null,

            // <==> Not in the Save object <==>

            // phone: state.fo_phone1,
            // folioName: state.fo_name,
            // fax: state.fo_fax,
            // address: state.fo_addres,
            // email: state.fo_Email,
            // folioRemarks: state.fo_remark,

            // createdBy: '',
            // creationDate: '',
        }
        const response = await FetchData(`${urlPath}/Hospitals/upsertHospitals`, 'post', objToSave).
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
    //#endHospital
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
                    <div className="col-md-12 title">Hospital Definition  - {state.mode} </div>
                </div>
                <div className="row mt-2 ">
                    <div className="col-md-12">

                        <div className='row'>
                            <div className='col-8'>
                                <div className="row">
                                    <div className="col-xl-3 col-sm-4 required">Hospital Code</div>
                                    <div className="col-xl-4 col-sm-6">
                                        <InputTextComp
                                            value={state.code}
                                            name="code"
                                            maxLength={20}
                                            handleOnblur={handleBlur}
                                            handleChange={handleChange}
                                            disabled={state.mode === "Edit" ? true : false}
                                            className={`${state.missingcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                            removeSpaces
                                        />

                                        {!state.codeAvailable &&
                                            <label className="errorLabel"> Code Already Exists </label>
                                        }
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-xl-3 col-sm-3 required">Hospital Name</div>
                                    <div className="col-xl-4 col-sm-7">
                                        <TextAreaComp
                                            value={state.hosName}
                                            name="hosName"
                                            onChange={handleChange}
                                            maxLength={1000}
                                            style={{ minHeight: "100px", width: "600px" }}
                                            className={`${state.missinghosName ? "alert-danger" : ""}`}
                                            disabled={state.mode === "Edit" ? true : false}

                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-xl-3 col-sm-3">Contact Name(s)</div>
                                    <div className="col-xl-6 col-sm-9">
                                        <TextAreaComp
                                            value={state.contactName}
                                            name="contactName"
                                            onChange={handleChange}
                                            maxLength={1000}
                                            style={{ minHeight: "100px", width: "600px" }}
                                            disabled={false}

                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-xl-3 col-sm-3">Remarks</div>
                                    <div className="col-xl-6 col-sm-9">
                                        <TextAreaComp
                                            value={state.Remarks}
                                            name="Remarks"
                                            onChange={handleChange}
                                            maxLength={1000}
                                            style={{ minHeight: "100px", width: "600px" }}
                                            disabled={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='row mt-2' >
                                    <div className="col-md-12" style={{ "width": "100%" }}>
                                        <MnuBkGImgComp
                                            moduleName="Logo"
                                            modulePrfix=" Logo"
                                            base64img={state.hospitalLogo}
                                            name="hospitalLogo"
                                            handleChange={handleChange}
                                            skipstyle
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-4">
                                <div className="col-xl-2 col-sm-2 required">Mouhafaza/Region Code</div>
                                <div className="col-xl-4 col-sm-9">

                                    <SelectComp
                                        value={state.regionCode}
                                        onChange={handleChange}
                                        name="regionCode"
                                        options={regionDropdown}
                                        className={`${state.missingregionCode || !state.codeAvailable ? "alert-danger" : ""}`}
                                        clearable
                                        disabled={state.mode === "Edit" ? true : false}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-xl-2 col-sm-1">Folio</div>
                                <div className="col-xl-4 col-sm-4">

                                    <SelectComp
                                        value={state.folioCode}
                                        onChange={handleChange}
                                        name="folioCode"
                                        options={folioDropdown}
                                        style={{ width: "95%" }}
                                        className={`${state.missingdbcode || !state.codeAvailable ? "alert-danger" : ""}`}
                                        clearable
                                    // disabled={state.mode === "Edit" ? true : false}
                                    />
                                </div>

                                <div className="col-xl-1 col-sm-3 ml-3">Phones</div>
                                <div className="col-xl-3 col-sm-9">

                                    <InputTextComp
                                        value={state.phone}
                                        name="phone"
                                        maxLength={20}
                                        handleOnblur={handleBlur}
                                        handleChange={handleChange}
                                        disabled={false}
                                        className={`${!state.codeAvailable ? "alert-danger" : ""}`}
                                        removeSpaces
                                    />
                                </div>

                            </div>
                            <div className="row mt-2">
                                {/* <div className="col-xl-2 col-sm-3">Name</div>
                            <div className="col-xl-4 col-sm-9">
                                <InputTextComp
                                    value={state.folioName}
                                    name="folioName"
                                    maxLength={20}
                                    handleOnblur={handleBlur}
                                    handleChange={handleChange}
                                    disabled={false}
                                    className={`${!state.codeAvailable ? "alert-danger" : ""}`}
                                    removeSpaces
                                />
                            </div> */}
                                <div className="row mt-1">
                                    <div className="col-xl-2 col-sm-3">Name</div>
                                    <div className="col-xl-4 col-sm-9">
                                        <InputTextComp
                                            value={state.folioName}
                                            name="folioName"
                                            maxLength={20}
                                            handleOnblur={handleBlur}
                                            handleChange={handleChange}
                                            disabled={false}
                                            className={`${!state.codeAvailable ? "alert-danger" : ""}`}
                                            removeSpaces
                                        />
                                    </div>

                                    <div className="col-xl-1 col-sm-3 ml-3">Fax</div>
                                    <div className="col-xl-3 col-sm-9">
                                        <InputTextComp
                                            value={state.fax}
                                            name="fax"
                                            maxLength={20}
                                            handleOnblur={handleBlur}
                                            handleChange={handleChange}
                                            disabled={false}
                                            className={`${!state.codeAvailable ? "alert-danger" : ""}`}
                                            removeSpaces
                                        />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-xl-2 col-sm-3">Address</div>
                                    <div className="col-xl-4 col-sm-9">
                                        <InputTextComp
                                            value={state.address}
                                            name="address"
                                            maxLength={20}
                                            handleOnblur={handleBlur}
                                            handleChange={handleChange}
                                            disabled={false}
                                            className={`${!state.codeAvailable ? "alert-danger" : ""}`}
                                            removeSpaces
                                        />
                                    </div>


                                    <div className="col-xl-1 col-sm-3 ml-3">Email</div>
                                    <div className="col-xl-3 col-sm-9">
                                        <InputTextComp
                                            value={state.email}
                                            name="email"
                                            maxLength={20}
                                            handleOnblur={handleBlur}
                                            handleChange={handleChange}
                                            disabled={false}
                                            className={`${!state.codeAvailable ? "alert-danger" : ""}`}
                                            removeSpaces
                                        />
                                    </div>
                                </div>

                                <div className='row mt-2'>
                                    <div className="col-xl-2 col-sm-3">Remarks</div>
                                    <div className="col-xl-6 col-sm-9">
                                        <TextAreaComp
                                            value={state.folioRemarks}
                                            name="folioRemarks"
                                            onChange={handleChange}
                                            maxLength={1000}
                                            style={{ minHeight: "100px" }}
                                            disabled={false}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
