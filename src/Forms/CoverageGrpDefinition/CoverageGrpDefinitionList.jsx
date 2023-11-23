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

// still need to call the right api and fill the columns data
export function CoverageGrpDefinitionList({ uuid, ...props }) {

    const STATE = {
        CoverageGrpList: [],
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

    const [data, error] = useFetchData(`${urlPath}/CoverageGroup/getAllCoverageGroup`, 'get');
    //#CovGrp "Side Effects"
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
                return { ...prv, CoverageGrpList: data.map((e) => { return { ...e, 'Status': e.cog_Status.toLowerCase() === 'a' ? 'Active' : 'Inactive' } }) }
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
    //#endCovGrp

    //#CovGrp Memoized CallBacks
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

    const editCoverageGrp = useCallback((id) => {
        navigate('/CovGroupDefinition/edit', { state: { editid: id, uuid } })
    }, []);

    const addCoverageGrp = useCallback(() => {
        navigate('/CovGroupDefinition/add', { state: { uuid } })
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
                onClick={addCoverageGrp}
                position="left"
                tooltip={"Add Coverage Group"}
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
    //#endCovGrp

    const columns = useMemo(() => {
        const screenWidth = state.screenWidth
        return [
            {
                Header: 'Group Code',
                accessor: 'cog_Code',
                fixed: "left",

                Cell: row => (
                    <div>
                        <span className="mobile-label">Group Code</span>
                        <span className="cell-value hidden-mobile text-center">{row.value}</span>
                        <span className="cell-value hidden-pc">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.1,

            },
            {
                Header: 'Group Name',
                accessor: 'cog_Name',
                Cell: row => {
                    return (
                        <div>
                            <span className="mobile-label"> Group Name</span>
                            <span className="cell-value">{row.value}</span>
                        </div>
                    )
                },
                width: screenWidth * 0.2

            },
            {
                Header: 'Type',
                accessor: 'cog_Type',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Type</span>
                        <span className="cell-value">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.1,
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
                Header: 'Sales A/C No',
                accessor: 'cog_SalesAcc',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Sales A/C No</span>
                        <span className="cell-value">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.1

            },
            {
                Header: 'Max Concurrent No Of Beds',
                accessor: 'cog_MaxBedsNo',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Max Concurrent No Of Beds</span>
                        <span className="cell-value">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.1

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
                                onClick={() => { editCoverageGrp(row.original.cog_Code) }} /* This is the onClick function */
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
            <div id="CoverageGrpListContainer" >
                {/* <Notification
                    type={state.notifType}
                    title={state.notifTitle}
                    message={state.notifMessage}
                    display={state.notifDisplay}
                /> */}
                <div className="flex title pt-2">
                Coverage Groups
                    {
                        drawTopActions()
                    }
                </div>
            </div>


            <AdvancedTable
                dataArray={state.privileges.View === 1 || state.privileges.Modify === 1 ? state.CoverageGrpList : []}
                columns={columns}
                AdvancedTableHeight={CalculateTitleHeight("CoverageGrpListContainer")}
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
