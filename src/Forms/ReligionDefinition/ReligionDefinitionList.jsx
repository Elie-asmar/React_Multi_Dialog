import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ErrorContext } from '../../ContextProvider/ErrorContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import { useFetchData } from '../../CustomHooks/APIs/useFetchData';
import { urlPath } from '../../globals';
import AdvancedTable from '../../ReusableComponents/Other/AdvancedTable/AdvancedTable';
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import RoundedIcon from '../../ReusableComponents/Other/RoundedIcon/RoundedIcon';
import { CalculateTitleHeight, ColoringStatusLikeLegends } from '../../utils/functions';

export function ReligionDefinitionList({ uuid, ...props }) {

    const STATE = {
        ReligionList: [],
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

    const [data, error] = useFetchData(`${urlPath}/Religion/getReligion`, 'get');
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

            setState(prv => {
                return { ...prv, ReligionList: data.map((e) => { return { ...e, 'Status': e.rel_Status.toLowerCase() === 'a' ? 'Active' : 'Inactive' } }) }
            })


        }
        else if (error) {
            alert('an error occured')

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

    const editReligion = useCallback((data) => {
        navigate('/ReligionDef/edit', { state: { editid: data, uuid } })
    }, []);

    const addReligion = useCallback(() => {
        navigate('/ReligionDef/add', { state: { uuid } })
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
                onClick={addReligion}
                position="left"
                tooltip={"Add Religion"}
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
                accessor: 'rel_Code',
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
                Header: 'Description',
                accessor: 'rel_Desc',
                Cell: row => {
                    return (
                        <div>
                            <span className="mobile-label">Description</span>
                            <span className="cell-value">{row.value}</span>
                        </div>
                    )
                },
                width: screenWidth * 0.4

            },
            {
                Header: 'Section',
                accessor: 'rel_Section',
                Cell: row => (
                    <div>
                        {console.log('ROWWWWW',row.original)}
                        <span className="mobile-label">Section</span>
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
                                onClick={() => { editReligion({ relCode: row.original.rel_Code, secCode: row.original.rel_Section, recId: row.original.rel_RecId }) }} /* This is the onClick function */
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
            <div id="ReligionListContainer" >
                {/* <Notification
                    type={state.notifType}
                    title={state.notifTitle}
                    message={state.notifMessage}
                    display={state.notifDisplay}
                /> */}
                <div className="flex title pt-2">
                    Religions
                    {
                        drawTopActions()
                    }
                </div>
            </div>


            <AdvancedTable
                dataArray={state.privileges.View === 1 || state.privileges.Modify === 1 ? state.ReligionList : []}
                columns={columns}
                AdvancedTableHeight={CalculateTitleHeight("ReligionListContainer")}
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
