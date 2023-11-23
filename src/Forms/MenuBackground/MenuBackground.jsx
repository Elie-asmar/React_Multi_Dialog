import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'reactstrap'
import { AuthContext } from '../../ContextProvider/AuthContext'
import { LoadingContext } from '../../ContextProvider/LoadingContext'
import { useFetchData } from '../../CustomHooks/APIs/useFetchData'
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback'
import { ButtonsContainer } from '../../ReusableComponents/Other/ButtonsContainer/ButtonsContainer'
import { MnuBkGImgComp } from './MnuBkGImgComp'

export function MenuBackground({ useInModal }) {
    const STATE = {
        menus: []

    }

    const [state, setState] = useStateWithCallback(STATE)
    const [initialState, setInitialState] = useState(STATE);
    const { userData, getUserPrivs } = useContext(AuthContext);
    const { setisLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    const [data, error] = useFetchData('DataFiles/Forms/MenuBackGround.json', 'get')

    useEffect(() => {
        if (data?.length > 0) {
            setState(prv => { return { ...prv, menus: [...data] } })
        }
    }, [data])





    const handleSave = useCallback(async () => {

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

    const updateBackground = useCallback((id, img) => {
        if (state.menus.length > 0) {
            let arr = [...state.menus]
            let mnu = arr.at(id);
            mnu.ModuleBackground = img;
            setState(prv => { return { ...prv, menus: [...arr] } });
        }


    }, [state])

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
            <div className="animated fadeIn activeComponent">
                {/* xs (for phones - screens less than 768px wide)
                sm (for tablets - screens equal to or greater than 768px wide)
                md (for small laptops - screens equal to or greater than 992px wide)
                lg (for laptops and desktops - screens equal to or greater than 1200px wide)
                d-none d-sm-block is equivalent to hide on xs and show on >=sm
             */}

                <div id="MenuBackGroundContainer" >
                    <div className="flex title pt-2">
                        Menu Background
                    </div>
                    <div className="row mt-2" style={{ marginBottom: '4rem' }}>
                        <div className="col-md-12">
                            <div className="row">
                                {
                                    state.menus?.map((menu, key) => {
                                        return <MnuBkGImgComp key={key}
                                            id={key}
                                            moduleName={menu.ModuleTitle}
                                            modulePrfix={menu.ModulePrefix}
                                            base64img={menu.ModuleBackground}
                                            onImageChange={updateBackground}
                                        />
                                        // base64img={menu.ModuleBackground} 
                                    })

                                }




                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
