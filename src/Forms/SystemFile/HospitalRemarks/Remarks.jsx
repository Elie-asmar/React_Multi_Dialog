import React from 'react'
import CheckBoxComp from '../../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent'
import InputTextComp from '../../../ReusableComponents/Other/InputTextComponent/InputTextComp'
import { MnuBkGImgComp } from '../../MenuBackground/MnuBkGImgComp'
import { RowContainer } from '../RowContainer'

export function Remarks() {
    return <div className='col-12'>
        <div className="row">
            <div id="HospitalInformationContainer" className="col-md-12 title mb-4 p-0">Remarks</div>
        </div>
        <div className='row'>
            <div className='col-12 row mb-2'>
                <div className='col-2'>
                    Internal Invoice Header
                </div>
                <div className='col-10'>
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='col-12 row mb-2'>
                <div className='col-2'>
                    Internal Invoice Footer
                </div>
                <div className='col-10'>
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='col-12 row mb-2'>
                <div className='col-2'>
                    External Invoice Header
                </div>
                <div className='col-10'>
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='col-12 row mb-2'>
                <div className='col-2'>
                    EXternal Invoice Footer
                </div>
                <div className='col-10'>
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='col-12 row mb-2'>
                <div className='col-2'>
                    Internal Receipt Footer
                </div>
                <div className='col-10'>
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                    />
                </div>
            </div>
            <div className='col-12 row mb-2'>
                <div className='col-2'>
                    External Receipt Footer
                </div>
                <div className='col-10'>
                    <InputTextComp
                        value={""}
                        name="code"
                        maxLength={3}
                        handleOnblur={e => null}
                        handleChange={e => null}
                        removeSpaces
                    />
                </div>
            </div>
        </div>
        <CheckBoxComp
            checked={false}
            onCheckChange={e => null}
            name="Emergency"
            description="Print Extended"
        />
        <div className='mt-4' />
        <RowContainer>
            <div className='col-4'>
                <p className='text-center'>Hospital Short Logo</p>
                <MnuBkGImgComp
                    moduleName="Hospital Short Logo"
                    modulePrfix=" Logo"
                    base64img={""}
                    name="doctorsPhoto"
                    handleChange={e => null}
                    skipstyle
                />
            </div>
            <div className='col-4'>
                <p className='text-center'>Hospital Long Logo</p>
                <MnuBkGImgComp
                    moduleName="Hospital Long Logo"
                    modulePrfix=" Logo"
                    base64img={""}
                    name="doctorsPhoto"
                    handleChange={e => null}
                    skipstyle
                />
            </div>
            <div className='col-4'>
                <p className='text-center'>Outgoing Server Path</p>
                <MnuBkGImgComp
                    moduleName="Outgoing Server Path"
                    modulePrfix=" Logo"
                    base64img={""}
                    name="doctorsPhoto"
                    handleChange={e => null}
                    skipstyle
                />
            </div>
        </RowContainer>
    </div>
}
