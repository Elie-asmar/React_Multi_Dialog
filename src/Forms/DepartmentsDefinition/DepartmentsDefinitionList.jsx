import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ErrorContext } from '../../ContextProvider/ErrorContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import AdvancedTable from '../../ReusableComponents/Other/AdvancedTable/AdvancedTable';
import RoundedIcon from '../../ReusableComponents/Other/RoundedIcon/RoundedIcon';
import { useFetchDataMultiple } from '../../CustomHooks/APIs/useFetchMultiple';
import { SubGridComp } from '../../ReusableComponents/Other/SubGridComp/SubGridComp';

import { CalculateTitleHeight, ColoringStatusLikeLegends } from '../../utils/functions';
export function DepartmentsDefinitionList({ uuid, ...props }) {
    // debugger

    const STATE = {
        DepartmentsList: [],
        LinkedGroups: [],
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

    const APICalls = useRef([
        {
            url: 'DataFiles/Forms/DepartmentsDefinition.json', Type: 'get'
        }
    ])

    const [data, error] = useFetchDataMultiple(APICalls.current);




    //#region "Side Effects"
    useEffect(() => {
        setisLoading(prv => prv + 1);
        window.addEventListener('resize', getWindowWidth);

        return () => {
            window.removeEventListener('resize', getWindowWidth)
        }


    }, []);

    useEffect(() => {
        if (data?.length > 0) {

            // console.log('data', data)
            // console.log('error', error)
            setisLoading(prv => prv - 1)
        }

        if (data[0]) {
            setState(prv => {
                return {
                    ...prv,
                    DepartmentsList: data[0].map((e) => { return { ...e, Status: e.Usr_Sts === 'A' ? 'Active' : 'Inactive' } })
                }
            })
        }
        else if (error) {

        }
    }, [data, error]);

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

    const editDepartment = useCallback((id) => {
        navigate('/DepartmentsDefinition/edit', { state: { editid: id, uuid } })
    }, []);

    const addDepartment = useCallback(() => {
        navigate('/DepartmentsDefinition/add', { state: { uuid } })
    }, [])

    const getWindowWidth = useCallback(() => {
        setState(prv => {
            return {
                ...prv, screenWidth: window.innerWidth
            }
        })
    }, []);

    const renderSubComponent = useCallback((row) => {
        return (<>
            <SubGridComp stepname="DepartmentsDefinitionList" row={row} />


        </>)







    }, []);

    const drawTopActions = useCallback(() => {
        let HTML = [];

        if (state.privileges.Add === 1) {
            HTML.push(<RoundedIcon
                key={"btnAdd"}
                iconClass="fa-plus"
                iconColor="#fff"
                backgroundColor="#00C20C"
                onClick={addDepartment}
                position="left"
                tooltip={"Add Department"}
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
                accessor: 'Dep_Code',
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
                Header: 'Name',
                accessor: 'Dep_Name',
                Cell: row => {
                    return (
                        <div>
                            <span className="mobile-label">Name</span>
                            <span className="cell-value">{row.value}</span>
                        </div>
                    )
                },
                width: screenWidth * 0.1

            },
            {
                Header: 'Head Name',
                accessor: 'Dep_HeadName',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Head Name</span>
                        <span className="cell-value">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.1,
            },
            {
                Header: 'Emergency Name',
                accessor: 'Dep_EmergName',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Emergency Name</span>
                        <span className="cell-value">{row.value}</span>
                    </div>
                ),
                width: screenWidth * 0.1,
            },
            {
                Header: 'Auxiliary Status',
                accessor: 'Dep_Status',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Auxiliary Status</span>
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
                                onClick={() => {
                                    editDepartment(row.original.Dep_Code)
                                }} /* This is the onClick function */
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
            <div id="DepartmentsListContainer" >
                <div className="flex title pt-2">
                    Departments Definition
                    {
                        drawTopActions()
                    }
                </div>
            </div>


            <AdvancedTable
                dataArray={state.privileges.View === 1 || state.privileges.Modify === 1 ? state.DepartmentsList : []}
                columns={columns}
                AdvancedTableHeight={CalculateTitleHeight("DepartmentsListContainer")}
                enableSearch
                defaultSorted={[{ id: "Dep_Code", desc: true }]}
                singleFilter
                showPagination={false}
            />
        </div>
    )
}
