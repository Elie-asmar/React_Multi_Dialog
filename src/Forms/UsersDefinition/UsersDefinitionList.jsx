import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ErrorContext } from '../../ContextProvider/ErrorContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import { useFetchData } from '../../CustomHooks/APIs/useFetchData';
import AdvancedTable from '../../ReusableComponents/Other/AdvancedTable/AdvancedTable';
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import RoundedIcon from '../../ReusableComponents/Other/RoundedIcon/RoundedIcon';
import { CalculateTitleHeight, ColoringStatusLikeLegends, FetchData } from '../../utils/functions';
import { isEqual, isEmpty, mapKeys, values, map, cloneDeep, forEach, filter } from "lodash";


import { SubGridComp } from '../../ReusableComponents/Other/SubGridComp/SubGridComp';
import { withPaging } from '../../ReusableComponents/Other/withPaging/withPaging';
import { urlPath } from '../../globals';
export function UsersDefinitionList({ uuid, ...props }) {
    // debugger
    const STATE = {
        UsersList: [],
        LinkedGroups: [],
        modal: false,
        privileges: {},
        screenWidth: window.innerWidth - 60,
        subject: ''
    }

    const { isLoading, setisLoading } = useContext(LoadingContext);
    const { setErrorMessage } = useContext(ErrorContext)
    const { userData, getUserPrivs } = useContext(AuthContext);
    const [state, setState] = useState(STATE)

    const navigate = useNavigate();



    const AdvancedTableWithPaging = useRef(withPaging(AdvancedTable));
    const AllUsers = useRef([]);
    const SearchParameters = useRef([]);

    const getUsersList = useCallback(async (filtervalue, filteroptions, searchOptions, pageNumber = 0) => {
        try {
            console.log('filtervalue', filtervalue, 'filterOptions', filteroptions, 'searchoptions', searchOptions)
            setisLoading(prv => prv + 1);


            if (!searchOptions) {
                let searchparams = await FetchData(urlPath + '/Users/GetUsersDefaultFiltration', 'get', null,
                    () => true)
                SearchParameters.current = cloneDeep(searchparams.data)
            }


            let params = {
                Filtration: filteroptions ? filteroptions.filter(e => e.isSelected).map(e => { return { columnName: e.columnName, filterValue: filtervalue } }) : [],
                searchOptions: searchOptions ? searchOptions : SearchParameters.current,
                pageNumber: pageNumber
            }




            let data = await FetchData(urlPath + '/Users/GetUsers', 'post', params,
                () => true)


            AllUsers.current = cloneDeep(data.data);
            setisLoading(prv => prv - 1);
        }
        catch (e) {
            console.log(e)
        }

    }, [])

    useEffect(() => {
        getUsersList();
    }, []);



    //#region "Side Effects"
    useEffect(() => {
        setisLoading(prv => prv + 1);
        window.addEventListener('resize', getWindowWidth);

        return () => {
            window.removeEventListener('resize', getWindowWidth)
        }

    }, []);

    useEffect(() => {
        setState(prv => {
            return {
                ...prv,
                UsersList: AllUsers.current.map((e) => { return { ...e } }),
                SearchParameters: SearchParameters.current.map(e => { return { ...e } })
            }
        })

    }, [AllUsers.current]);

    useEffect(() => {
        if (userData) {
            setisLoading(prv => prv - 1);
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

    const editUserGroup = useCallback((id) => {
        navigate('/UsersDefinition/edit', { state: { editid: id, uuid } })
    }, []);

    const addUserGroup = useCallback(() => {
        navigate('/UsersDefinition/add', { state: { uuid } })
    }, [])

    const getWindowWidth = useCallback(() => {
        setState(prv => {
            return {
                ...prv, screenWidth: window.innerWidth - 60
            }
        })
    }, []);

    const renderSubComponent = useCallback((row) => {
        return (<>
            <SubGridComp stepname="UsersDefinitionList" row={row} />


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
                onClick={addUserGroup}
                position="left"
                tooltip={"Add Nationality"}
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
                Header: 'Linked Groups',
                expander: true,
                Expander: (
                    { isExpanded, ...row }) => {
                    return <div className="text-center" style={{ width: '80%' }}><i className={`fa ${isExpanded ? "fa-minus" : "fa-plus"}${0 > 0 ? " text-warning" : ""}`}></i></div>
                }
                ,
                width: screenWidth * 0.06,
                fixed: "left"

            },

            {
                Header: 'Code',
                accessor: 'user_code',
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
                accessor: 'user_name',
                Cell: row => {
                    // console.log('row.original', row.original)
                    // console.log('row.value', row.value)
                    return (
                        <div>
                            <span className="mobile-label">Description</span>
                            <span className="cell-value">{row.value}</span>
                        </div>
                    )
                },
                width: screenWidth * 0.59

            },
            {
                Header: 'Status',
                accessor: 'Usr_Sts',
                Cell: row => (
                    <div>
                        <span className="mobile-label">Status</span>
                        <span className="cell-value">{ColoringStatusLikeLegends(row.value === 'A' ? 'Active' : 'Inactive')}</span>
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
                                    editUserGroup(row.original.user_code)
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
            <div id="NationalityListContainer" >
                {/* <Notification
                    type={state.notifType}
                    title={state.notifTitle}
                    message={state.notifMessage}
                    display={state.notifDisplay}
                /> */}
                <div className="flex title pt-2">
                    Users Definition
                    {
                        drawTopActions()
                    }
                </div>
            </div>


            <AdvancedTableWithPaging.current
                dataArray={state.privileges.View === 1 || state.privileges.Modify === 1 ? state.UsersList : []}
                columns={columns}
                SubComponent={(row) => renderSubComponent(row)}
                AdvancedTableHeight={CalculateTitleHeight("NationalityListContainer")}
                enableSearch
                defaultSorted={[{ id: "user_code", desc: true }]}
                singleFilter
                showPagination={false}
                fetchApiFunction={getUsersList}
                SearchParameters={state.SearchParameters}


            />

        </div>
    )
}
