import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { Tooltip } from 'reactstrap'
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback'
import { readfileasync } from '../../utils/functions'

export function MnuBkGImgComp({ moduleName = '', modulePrfix = '', base64img = '../img/no-image.png', handleChange, name, skipstyle = false }) {
    const STATE = {
        modulePrfix,
        base64img,
        tooltip: {
            upload: false,
            cancel: false
        },

    }
    const [state, setState] = useStateWithCallback(STATE);
    const uploadInputId = useRef(`id_${Math.random().toString().replace('.', '')}`);
    const imageDivid = useRef(`id_${Math.random().toString().replace('.', '')}`);
    const clearID = useRef(`id_${Math.random().toString().replace('.', '')}`);
    const uploadid = useRef(`id_${Math.random().toString().replace('.', '')}`);

    useEffect(() => {
        if (state.base64img !== null && state.base64img !== base64img && base64img !== "") {
            handleChange(state.base64img, name)
        }

    }, [state.base64img])

    useEffect(() => {

        if (base64img === state.base64img || base64img === "") return;
        setState(prevState => {
            return {
                ...prevState,
                base64img
            }
        })

    }, [base64img]);




    const toggleTooltip = useCallback((name) => (event) => {
        setState(prv => {
            return {
                ...prv, tooltip: { ...prv.tooltip, [name]: !prv.tooltip[name] }

            }
        })
    }, [])

    const handleTextChange = useCallback((value, name) => {
        if (name === 'prefix') {
            setState(prv => {
                return { ...prv, modulePrfix: value }
            })
        }


    }, [])
    const handleSelectedFiles = useCallback(async (event) => {
        let files = [...event.target.files]
        if (files.length > 0) {
            let data = await readfileasync(files[0])

            setState(prv => {
                return { ...prv, base64img: data }
            })
        }
    }, [])

    const onUpload = useCallback(() => {
        document.getElementById(uploadInputId.current).click();
    }, [])

    const onClear = useCallback(() => {
        setState(prv => {
            return { ...prv, base64img: "" }
        })

    }, [])

    useEffect(() => {
        setState({ ...state, modulePrfix: modulePrfix, base64img: base64img ? `${base64img}` : '../img/no-image.png' })
    }, [])

    useEffect(() => {
        // Side effect when the component local state is being changed or on mount
        if (state.base64img !== null && state.base64img !== base64img) {
            handleChange(state.base64img, name)
        }
    }, [state.base64img]);

    useEffect(() => {
        // Side effect when the component base64 prop changes which is a primitive value due to being a string
        if (base64img === state.base64img) return;
        setState(prevState => {
            return {
                ...prevState,
                base64img
            }
        });
    }, [base64img]);


    return (
        <div className={`${skipstyle ? "" : "col-12 col-sm-5 col-md-3   ml-1"}`}  >

            <div className='row mb-1' >
                <div className='col-6' style={{ 'display': 'flex', 'flexDirection': 'row', justifyContent: 'center' }}>
                    <button id={uploadid.current} className="topIcons" type="button" onClick={onUpload}>
                        <i className="fa fa-upload"></i>
                        <span>Upload</span>
                        <Tooltip placement="bottom" isOpen={state.tooltip.upload}
                            target={`${uploadid.current}`} toggle={toggleTooltip('upload')}>Upload An Image</Tooltip>
                    </button>
                </div>
                <div className='col-6' style={{ 'display': 'flex', 'flexDirection': 'row', justifyContent: 'center' }} >

                    <button id={clearID.current} className="topIcons" type="button" onClick={onClear}>
                        <i className="fa fa-times"></i>
                        <span>Clear</span>
                        <Tooltip placement="bottom" isOpen={state.tooltip.cancel} target={`${clearID.current}`} toggle={toggleTooltip('cancel')}>Clear</Tooltip>
                    </button>
                </div>


                <input type="file" id={uploadInputId.current} accept="image/png, image/gif, image/jpeg" multiple={false} style={{ 'display': 'none' }} onChange={handleSelectedFiles} />
            </div >
            <div className='row'>
                <div className='col-12 mnubkg_imageContainer' style={skipstyle ? { borderTopStyle: 'solid' } : null}      >
                    <div className='row'>
                        <div className='col-12  title text-center'>
                            {`${moduleName}`}
                        </div>
                    </div>
                    <div className='mnubkg_image' id={`${imageDivid.current}`}
                        style={state.base64img ? { backgroundImage: `url(${state.base64img})` } : null} />
                </div>
            </div>



        </div >
    )
}
