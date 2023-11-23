import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ErrorContext } from '../../ContextProvider/ErrorContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import { useFetchData } from '../../CustomHooks/APIs/useFetchData';
import AdvancedTable from '../../ReusableComponents/Other/AdvancedTable/AdvancedTable';
import { urlPath } from '../../globals';
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import RoundedIcon from '../../ReusableComponents/Other/RoundedIcon/RoundedIcon';
import { CalculateTitleHeight, ColoringStatusLikeLegends } from '../../utils/functions';

export function DoctorsDefinitionList({ uuid, ...props }) {

    const STATE = {
        DoctorsList: [],
        modal: false,
        privileges: {},
        screenWidth: window.innerWidth,
        subject: ''
    }
    const { isLoading, setisLoading } = useContext(LoadingContext);
    const { setErrorMessage } = useContext(ErrorContext)
    const { userData, getUserPrivs } = useContext(AuthContext);

    const [state, setState] = useState(STATE)

    const navigate = useNavigate();

    const [data, error] = useFetchData(`${urlPath}/Doctors/getAllDoctors`, 'get');

    //#region "Side Effects"
    useEffect(() => {
        setisLoading(prv => prv + 1);
        window.addEventListener('resize', getWindowWidth);
        return () => {
            window.removeEventListener('resize', getWindowWidth)
        }

    }, []);
    useEffect(() => {
        'list here'
    })

    useEffect(() => {


        if (data?.length > 0) {
            setisLoading(prv => prv - 1)
        }

        if (data) {

            // this variable is for development purposes
            let devData = data.slice(-100)
            console.log('devData',devData)

            setState(prv => {
                return { ...prv, DoctorsList: devData.map((e) => { return { ...e, 'Status': e.doc_Status.toLowerCase() === 'active' ? 'Active' : 'Inactive' } }) }
            })


        }
        else if (error) {

        }


    }, [data, error])

    useEffect(() => {
        if (userData) {
            setState(prv => {
                return {
                    ...prv, privileges: getUserPrivs(uuid)
                }
            })
        }
    }, [userData])
    //#endregion

    //#region Memoized CallBacks
    const toggleModal = useCallback(() => {
        setState(prv => {
            return {
                ...prv, modal: !prv.modal
            }
        })
    }, []);

    const handleFilterChange = useCallback(() => {


    }, [state.subject])

    const handleExportClick = useCallback(() => {

    }, [])

    const editDoctor = useCallback((id) => {
        navigate('/DoctorsDefinition/edit', { state: { editid: id, uuid } })
    }, []);

    const addDoctor = useCallback(() => {
        navigate('/DoctorsDefinition/add', { state: { uuid } })
    }, [])

    const getWindowWidth = useCallback(() => {
        setState(prv => {
            return {
                ...prv, screenWidth: window.innerWidth
            }
        })
    }, []);

    const drawTopActions = useCallback(() => {
        let HTML = [];

        if (state.privileges.Add === 1) {
            HTML.push(<RoundedIcon
                key={"btnAdd"}
                iconClass="fa-plus"
                iconColor="#fff"
                backgroundColor="#00C20C"
                onClick={addDoctor}
                position="left"
                tooltip={"Add Doctor"}
                id={"add"}
            />);
        }

        if (state.privileges.View === 1 || state.privileges.Print === 1) {
            HTML.push(<RoundedIcon
                key={`btnExcel`}
                backgroundColor="#40C2CD"
                iconColor="#fff"
                iconClass="fa-table"
                position="right"
                onClick={handleExportClick}
                tooltip={"Export to Excel"}
                id={`btnPrint`}
            />)
        }

        return HTML;
    }, [state]);
    //#endregion

    const columns = useMemo(() => {
        const screenWidth = state.screenWidth
        return [
            {
                Header: 'Code',
                accessor: 'doc_Code',
                fixed: "left",

                Cell: row => (
                    <div>
                        <span className="mobile-label">Code</span>
                        <span className="cell-value hidden-mobile text-center">{row.value}</span>
                        <span className="cell-value hidden-pc">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.1,

            },
            {
                Header: 'Doctor Name',
                accessor: 'doc_Name',
                Cell: row => {
                    return (
                        <div>
                            <span className="mobile-label">Doctor Name</span>
                            <span className="cell-value">{row.value}</span>
                        </div>
                    )
                },
                width: screenWidth * 0.2

            },
            {
                Header: 'Doctor Type',
                accessor: 'doc_Type',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Doctor Type</span>
                        <span className="cell-value">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.2

            },
            {
                Header: 'Doctor Work',
                accessor: 'doc_Work',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Doctor Work</span>
                        <span className="cell-value">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.2

            },

            {
                Header: 'Status',
                accessor: 'Status',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Status</span>
                        <span className="cell-value">{ColoringStatusLikeLegends(row.value)}</span>
                    </div>
                ),
                width: screenWidth * 0.1,
            },
            {
                Header: '',
                accessor: 'edit',
                className: "contextmenu",
                fixed: "right",
                width: screenWidth * 0.1,
                Cell: row => {
                    let HTML = [];
                    if (state.privileges.Modify === 1) {
                        HTML.push(
                            <RoundedIcon
                                key={`btnEdit-${row.index}`}
                                backgroundColor="#40C2CD" /* This is for the circle background color */
                                iconColor="#fff" /* This is for the icon color */
                                iconClass="fa-pencil" /* This is the icon font awesome class */
                                position="right" /* Other options are left and center  */
                                onClick={() => { editDoctor(row.original.doc_Code) }} /* This is the onClick function */
                                tooltip={"Edit"}
                                id={`btnEdit-${row.index}`}
                            />
                        );
                    }
                    return HTML;

                }
            },
        ]
    }
        , [state])


    return (
        <div className="animated fadeIn">
            <div id="DoctorsListContainer" >
                {/* <Notification
                    type={state.notifType}
                    title={state.notifTitle}
                    message={state.notifMessage}
                    display={state.notifDisplay}
                /> */}
                <div className="flex title pt-2">
                    Doctor Definition
                    {
                        drawTopActions()
                    }
                </div>
            </div>


            <AdvancedTable
                dataArray={state.privileges.View === 1 || state.privileges.Modify === 1 ? state.DoctorsList : []}
                columns={columns}
                AdvancedTableHeight={CalculateTitleHeight("DoctorsListContainer")}
                enableSearch
                defaultSorted={[{ id: "code", desc: true }]}
                // filterOptions={this.filter}
                singleFilter
                showPagination={false}
            // disabledButton={this.state.disabledButton}
            // nbrOfPage={this.state.nbrOfPage}
            // pageNbr={this.state.pageNbr}
            // pageInputSelector={this.state.pageInputSelector}
            // gotoPage={this.gotoPage}
            // nextPage={this.nextPage}
            // previousPage={this.previousPage}
            // handlePaginationChange={this.handlePaginationChange}
            />
            {/* <a id="lnk_hidden" href={state.excelpath} download ref={node => { this.hyperlinkref = node }}>
            </a> */}
        </div>
    )
}
