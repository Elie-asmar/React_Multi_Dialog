import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../ContextProvider/AuthContext';
import { ErrorContext } from '../../ContextProvider/ErrorContext';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import { useFetchData } from '../../CustomHooks/APIs/useFetchData';
import AdvancedTable from '../../ReusableComponents/Other/AdvancedTable/AdvancedTable';
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import RoundedIcon from '../../ReusableComponents/Other/RoundedIcon/RoundedIcon';
import { CalculateTitleHeight, ColoringStatusLikeLegends } from '../../utils/functions';
import { isEqual, isEmpty, mapKeys, values, map, cloneDeep, forEach } from "lodash";
import CheckBoxComp from '../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import { Table } from 'reactstrap';
export function UserGroupsList({ uuid, ...props }) {

    const STATE = {
        GroupsList: [],
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

    const [data, error] = useFetchData('DataFiles/Forms/GroupsDefinition.json', 'get');
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

        if (data) {

            setState(prv => {
                return { ...prv, GroupsList: data.map((e) => { return { ...e, Status: 'Active' } }) }
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

    const editUserGroup = useCallback((id) => {
        navigate('/UserGroupsDef/edit', { state: { editid: id, uuid } })
    }, []);

    const addUserGroup = useCallback(() => {
        navigate('/UserGroupsDef/add', { state: { uuid } })
    }, [])

    const getWindowWidth = useCallback(() => {
        setState(prv => {
            return {
                ...prv, screenWidth: window.innerWidth
            }
        })
    }, []);

    const renderSubComponent = useCallback((row) => {
        let subComp = []
        let arr = ["Main", "Admission", "Residence", "Laboratory", "Radiology", "General_Exams",
            "Operations", "Doctors", "Pharmacy", "Externals", "Invoicing", "Collection",
            "Accounting", "Cashiers", "Statistics", "Floor_Request", "Medical_Committee",
            "Export_Data", "Lab_Results", "Rad_Results", "Med_Records",
            "Blood_Bank", "ORM", "Workflow", "OR", "Ext_Clinics",
            "Oncology", "Diet", "Special"]

        subComp.push(arr.map((elem, key) => {
            return (<>
                <tr key={key}>
                    <td className='text-center'>
                        <CheckBoxComp
                            checked={row[`${elem}`].toLowerCase() === 'y'}
                            increaseArea
                            name="isChecked"
                            disabled={true}
                        />
                    </td>
                    <td>{elem}</td>
                </tr>
            </>)

        }))

        return (
            <Table bordered
                responsive={true}
                size="sm"
                className="subTable"
                style={{ width: "77%" }}
            >
                <thead>
                    <tr>
                        <th width="40"></th>

                        <th width="500"> Export to Excel Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {subComp}
                </tbody>
            </Table>
        )









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
                Header: 'Permissions',
                accessor: 'Expander',
                expander: true,
                Expander: (
                    { isExpanded, ...rest }) => {
                    return <div className="text-center" style={{ width: '80%' }}><i className={`fa ${isExpanded ? "fa-minus" : "fa-plus"}${0 > 0 ? " text-warning" : ""}`}></i></div>
                }
                ,
                width: screenWidth * 0.06,
                fixed: "left"

            },

            {
                Header: 'Code',
                accessor: 'Grp_Code',
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
                accessor: 'Grp_Name',
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
                        console.log('here')
                        HTML.push(
                            <RoundedIcon
                                key={`btnEdit-${row.index}`}
                                backgroundColor="#40C2CD" /* This is for the circle background color */
                                iconColor="#fff" /* This is for the icon color */
                                iconClass="fa-pencil" /* This is the icon font awesome class */
                                position="right" /* Other options are left and center  */
                                onClick={() => {
                                    editUserGroup(row.original.Grp_Code)
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
                    User Groups Definition
                    {
                        drawTopActions()
                    }
                </div>
            </div>


            <AdvancedTable
                dataArray={state.privileges.View === 1 || state.privileges.Modify === 1 ? state.GroupsList : []}
                columns={columns}
                SubComponent={(row) => renderSubComponent(row.original)}
                AdvancedTableHeight={CalculateTitleHeight("NationalityListContainer")}
                enableSearch
                defaultSorted={[{ id: "Grp_Code", desc: true }]}
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
