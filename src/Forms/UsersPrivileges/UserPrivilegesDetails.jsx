import { cloneDeep, isEmpty } from 'lodash';
import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { useMemo } from 'react';
import Moment from 'moment';
import { Button } from 'reactstrap';
import { LoadingContext } from '../../ContextProvider/LoadingContext';
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback';
import CheckBoxComp from '../../ReusableComponents/Other/CheckBoxComponent/CheckBoxComponent';
import DateTimePickerComp from '../../ReusableComponents/Other/DateTimePickerComp/DateTimePickerComp';
import InputTextComp from '../../ReusableComponents/Other/InputTextComponent/InputTextComp';
import Notification from '../../ReusableComponents/Other/Notification/Notification';
import { customTableSearch, FetchDataMultiple, isOnMobile, isOnPC } from '../../utils/functions';
import RTable from '../../ReusableComponents/Other/AdvancedTable/RTable';
import { Column, Table } from 'react-virtualized';
import { mobileDevicesWidth } from '../../globals';
import VirtualTable from '../../ReusableComponents/Other/VirtualTable/VirtualTable';
import UploadFiles from '../../ReusableComponents/Other/UploadFiles/UploadFiles';

export function UserPrivilegesDetails({ data, setusersPrivilegesData, ...props }) {
    const { setisLoading } = useContext(LoadingContext);
    const permissionsData = useRef([]);
    const negationsData = useRef([]);
    const intital_State = useRef({
        filter: '',
        since: '',
        usersPermissions: [],
        filteredUsersPermissions: [],
        usersNegations: [],
        applyOnPrivDisabled: true,
        allApplyOnPriv: false,
        allAdd: false,
        allModify: false,
        allDelete: false,
        allView: false,
        allPrint: false,
        allSendMail: false,
        allException: false,
        missingExpiryDates: true,
        image: [],


        notifType: '',
        notifTitle: '',
        notifMessage: '',
        notifDisplay: '',
        invaliddate: false

    });
    const [state, setState] = useStateWithCallback(intital_State.current);


    useEffect(() => {
        FillData();

    }, [])

    const FillData = useCallback(async () => {
        let apis = [
            { url: 'DataFiles/Forms/UserPrivileges/allpermissions.json', Type: 'get', params: '', datafilterfunction: null },
            { url: 'DataFiles/Forms/UserPrivileges/negations.json', Type: 'get', params: '', datafilterfunction: null },
        ]
        setisLoading(prv => prv + 1)
        let response = await FetchDataMultiple(apis);
        console.log(response[0].data.length)

        permissionsData.current = response[0].data.map((e, k) => {
            return {
                ...e, rowid: k, applyOnPriv: false
            }
        })
        negationsData.current = cloneDeep(response[1].data);

        setState(prv => {
            return {
                ...prv,
                filteredUsersPermissions: cloneDeep(permissionsData.current),
                usersPermissions: cloneDeep(permissionsData.current),
            }
        })
        setisLoading(prv => prv - 1)
    }, [])



    const handleDateTimeChange = useCallback((colName, row) => (key, value, isvalid) => {

        let changed = {}

        switch (colName) {
            case 'since':
                changed['since'] = value
                setState(prv => {
                    return { ...prv, ...changed }

                })
                break;
            case 'Till':
                setState(prv => {


                    changed[`${"Till/" + row.rowid}NotValid`] = !isvalid;

                    let arr = cloneDeep(prv.filteredUsersPermissions)
                    let arr1 = cloneDeep(prv.usersPermissions)
                    arr1.find(e => e.rowid === row.rowid)[colName] = value;
                    arr.find(e => e.rowid === row.rowid)[colName] = value;

                    return { ...prv, ...changed, filteredUsersPermissions: arr1, usersPermissions: arr }

                })
                break;






                break;
            default:
                break;
        }

        if (!isEmpty(changed)) {
            setState(prv => {
                return {
                    ...prv, changed
                }
            })
        }





    }, [])

    const applyOnPrivileges = useCallback(() => { }, [])

    const handleChange = useCallback((value, key) => {
        let changed = {}

        switch (key) {

            case 'filter':
                setState(prv => {
                    if (value) {
                        return {
                            ...prv,
                            filter: value,
                            filteredUsersPermissions: customTableSearch(value, prv.usersPermissions, [{ columnName: 'Steps', isSelected: true }, { columnName: 'Till', isSelected: true }])
                        }
                    }
                    else {
                        return {
                            ...prv, filter: value, filteredUsersPermissions: cloneDeep(prv.usersPermissions)
                        }
                    }
                })
                return;
            default:
                break;
        }

    }, [])

    const onCheckAll = useCallback((checked, key) => {

        switch (key) {

            case 'allAdd':
                key = 'Add';
                break;
            case 'allModify':
                key = 'Modify'
                break;
            case 'allApplyOnPriv':
                key = 'applyOnPriv';
                break;
            case 'allDelete':
                key = 'Delete';
                break;
            case 'allPrint':
                key = 'Print';
                break;
            case 'allSendMail':
                key = 'SendMail';
                break;
            case 'allException':
                key = 'Exception';
                break;
            case 'allView':
                key = 'View';
                break;




            default:
                break;
        }
        setState(prv => {
            let arr = prv.filteredUsersPermissions.map(e => {
                return { ...e, [key]: checked }
            })
            let arr1 = prv.usersPermissions.map(e => {
                let item = arr.find(e1 => e1.rowid === e.rowid)
                return {
                    ...e, [key]: item ? item[key] : e[key]
                }
            })
            return { ...prv, filteredUsersPermissions: arr, usersPermissions: arr1 }

        });

    }, [])
    const onRowCheckChange = useCallback((colName, row) => (checked, key) => {
        setState(prv => {
            prv.filteredUsersPermissions.find(e => {
                return e.rowid === key
            })[colName] = checked
            prv.usersPermissions.find(e => {
                return e.rowid === key
            })[colName] = checked
            return { ...prv, filteredUsersPermissions: cloneDeep(prv.filteredUsersPermissions), usersPermissions: cloneDeep(prv.usersPermissions) }

        });


    })

    const returnUploadedFiles = useCallback((data, name) => {


    }, [])


    const headerRenderer = ({ dataKey, sortBy, sortDirection, label }) => {
        return (
            <h2>
                {label}

            </h2>
        );
    }

    // const columns = useMemo(() => {
    //     return [
    //         {
    //             Header: () => (
    //                 <div className="checkbox-in-table-header ">
    //                     <CheckBoxComp
    //                         checked={state.allApplyOnPriv}
    //                         onCheckChange={onCheckAll}
    //                         name="allApplyOnPriv"
    //                         disabled={false}
    //                     />
    //                 </div>
    //             ),
    //             accessor: 'applyOnPriv',
    //             // fixed: "left",
    //             width: 50,
    //             sortable: false,
    //             Cell: row => {
    //                 return (<>
    //                     <span className="cell-value hidden-mobile text-center ">
    //                         <CheckBoxComp
    //                             checked={row.original.applyOnPriv}
    //                             onCheckChange={onRowCheckChange('applyOnPriv')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>
    //                     <span className="mobile-label">Selected</span>
    //                     <span className="cell-value hidden-pc">
    //                         <CheckBoxComp
    //                             checked={row.original.applyOnPriv}
    //                             onCheckChange={onRowCheckChange('applyOnPriv')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>

    //                 </>)
    //             },

    //         },
    //         {
    //             Header: 'Main Menu',
    //             accessor: 'Menu',
    //             // fixed: "left",
    //             width: 200,
    //             sortable: true,
    //             Cell: row => (
    //                 <>
    //                     <span className="mobile-label">{'Main Menu'}</span>
    //                     <span className="cell-value">{row.value}</span>
    //                 </>
    //             ),

    //         },
    //         {
    //             Header: 'Step Name',
    //             accessor: 'Steps',
    //             // fixed: "left",
    //             width: 200,
    //             sortable: true,
    //             Cell: row => (
    //                 <>
    //                     <span className="mobile-label">{'Step Name'}</span>
    //                     <span className="cell-value">{row.value}</span>
    //                 </>
    //             ),

    //         },
    //         {
    //             Header: () => (
    //                 <div className="checkbox-in-table-header ">
    //                     <CheckBoxComp
    //                         checked={state.allAdd}
    //                         onCheckChange={onCheckAll}
    //                         name="allAdd"
    //                         disabled={false}
    //                         description="Add"
    //                     />
    //                 </div>
    //             ),
    //             accessor: 'Add',
    //             // fixed: "left",
    //             width: 90,
    //             sortable: false,
    //             Cell: row => {
    //                 return (<>
    //                     <span className="cell-value hidden-mobile text-center ">
    //                         <CheckBoxComp
    //                             checked={row.original.Add}
    //                             onCheckChange={onRowCheckChange('Add')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>
    //                     <span className="mobile-label">Add</span>
    //                     <span className="cell-value hidden-pc">
    //                         <CheckBoxComp
    //                             checked={row.original.allAdd}
    //                             onCheckChange={onRowCheckChange('Add')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>

    //                 </>)
    //             },

    //         },
    //         {
    //             Header: () => (
    //                 <div className="checkbox-in-table-header ">
    //                     <CheckBoxComp
    //                         checked={state.allModify}
    //                         onCheckChange={onCheckAll}
    //                         name="allModify"
    //                         disabled={false}
    //                         description="Edit"
    //                     />
    //                 </div>
    //             ),
    //             accessor: 'Edit',
    //             // fixed: "left",
    //             width: 90,
    //             sortable: false,
    //             Cell: row => {
    //                 return (<>
    //                     <span className="cell-value hidden-mobile text-center ">
    //                         <CheckBoxComp
    //                             checked={row.original.Edit}
    //                             onCheckChange={onRowCheckChange('Edit')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>
    //                     <span className="mobile-label">Edit</span>
    //                     <span className="cell-value hidden-pc">
    //                         <CheckBoxComp
    //                             checked={row.original.Edit}
    //                             onCheckChange={onRowCheckChange('Edit')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>

    //                 </>)
    //             },

    //         },
    //         {
    //             Header: () => (
    //                 <div className="checkbox-in-table-header ">
    //                     <CheckBoxComp
    //                         checked={state.allDelete}
    //                         onCheckChange={onCheckAll}
    //                         name="allDelete"
    //                         disabled={false}
    //                         description="Delete"
    //                     />
    //                 </div>
    //             ),
    //             accessor: 'Delete',
    //             // fixed: "left",
    //             width: 110,
    //             sortable: false,
    //             Cell: row => {
    //                 return (<>
    //                     <span className="cell-value hidden-mobile text-center ">
    //                         <CheckBoxComp
    //                             checked={row.original.Delete}
    //                             onCheckChange={onRowCheckChange('Delete')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>
    //                     <span className="mobile-label">Delete</span>
    //                     <span className="cell-value hidden-pc">
    //                         <CheckBoxComp
    //                             checked={row.original.Delete}
    //                             onCheckChange={onRowCheckChange('Delete')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>

    //                 </>)
    //             },

    //         },
    //         {
    //             Header: () => (
    //                 <div className="checkbox-in-table-header ">
    //                     <CheckBoxComp
    //                         checked={state.allView}
    //                         onCheckChange={onCheckAll}
    //                         name="allView"
    //                         disabled={false}
    //                         description="View"
    //                     />
    //                 </div>
    //             ),
    //             accessor: 'View',
    //             // fixed: "left",
    //             width: 100,
    //             sortable: false,
    //             Cell: row => {
    //                 return (<>
    //                     <span className="cell-value hidden-mobile text-center ">
    //                         <CheckBoxComp
    //                             checked={row.original.View}
    //                             onCheckChange={onRowCheckChange('View')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>
    //                     <span className="mobile-label">View</span>
    //                     <span className="cell-value hidden-pc">
    //                         <CheckBoxComp
    //                             checked={row.original.View}
    //                             onCheckChange={onRowCheckChange('View')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>

    //                 </>)
    //             },

    //         },
    //         {
    //             Header: () => (
    //                 <div className="checkbox-in-table-header ">
    //                     <CheckBoxComp
    //                         checked={state.allPrint}
    //                         onCheckChange={onCheckAll}
    //                         name="allPrint"
    //                         disabled={false}
    //                         description="Print"
    //                     />
    //                 </div>
    //             ),
    //             accessor: 'Print',
    //             // fixed: "left",
    //             width: 100,
    //             sortable: false,
    //             Cell: row => {
    //                 return (<>
    //                     <span className="cell-value hidden-mobile text-center ">
    //                         <CheckBoxComp
    //                             checked={row.original.Print}
    //                             onCheckChange={onRowCheckChange('Print')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>
    //                     <span className="mobile-label">Print</span>
    //                     <span className="cell-value hidden-pc">
    //                         <CheckBoxComp
    //                             checked={row.original.Print}
    //                             onCheckChange={onRowCheckChange('Print')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>

    //                 </>)
    //             },

    //         },
    //         {
    //             Header: () => (
    //                 <div className="checkbox-in-table-header ">
    //                     <CheckBoxComp
    //                         checked={state.allSendMail}
    //                         onCheckChange={onCheckAll}
    //                         name="allSendMail"
    //                         disabled={false}
    //                         description="Mail"
    //                     />
    //                 </div>
    //             ),
    //             accessor: 'SendMail',
    //             // fixed: "left",
    //             width: 100,
    //             sortable: false,
    //             Cell: row => {
    //                 return (<>
    //                     <span className="mobile-label">Send Mail</span>
    //                     <span className="cell-value hidden-mobile text-center ">
    //                         <CheckBoxComp
    //                             checked={row.original.SendMail}
    //                             onCheckChange={onRowCheckChange('SendMail')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}

    //                         />
    //                     </span>
    //                     <span className="cell-value hidden-pc">
    //                         <CheckBoxComp
    //                             checked={row.original.SendMail}
    //                             onCheckChange={onRowCheckChange('SendMail')}
    //                             increaseArea
    //                             name={row.original.rowid}
    //                             disabled={false}
    //                         />
    //                     </span>

    //                 </>)
    //             },

    //         },
    //         {
    //             Header: 'Expiry Date',
    //             accessor: 'Till',
    //             //fixed: "left",
    //             width: 150,
    //             sortable: false,
    //             Cell: row => {
    //                 return (<>

    //                     <span className="cell-value hidden-mobile text-center ">
    //                         <DateTimePickerComp
    //                             selected={row.value}
    //                             onDateTimeChange={handleDateTimeChange('Till', row.original)}
    //                             name={row.original.rowid}
    //                             className={state[`${"Till/" + row.original.rowid}NotValid`] || state[`${"Till/" + row.original.rowid}Mandatory`] ? "alert-danger" : ""}
    //                             placeholder="--/--/----"
    //                             dateSlash
    //                             disabled={false}
    //                         />
    //                     </span>
    //                     <span className="mobile-label">Expiry Date</span>
    //                     <span className="cell-value hidden-pc">
    //                         <DateTimePickerComp
    //                             selected={row.value}
    //                             onDateTimeChange={handleDateTimeChange('Till', row.original)}
    //                             name={row.original.rowid}
    //                             className={state[`${"Till/" + row.original.rowid}NotValid`] || state[`${"Till/" + row.original.rowid}Mandatory`] ? "alert-danger" : ""}
    //                             placeholder="--/--/----"
    //                             dateSlash
    //                             disabled={false}
    //                         />
    //                     </span>

    //                 </>)
    //             },

    //         },
    //         {
    //             Header: 'Negation',
    //             expander: true,
    //             Expander: (
    //                 { isExpanded, ...row }) => {
    //                 return <div className="text-center" style={{ width: '80%' }}><i className={`fa ${isExpanded ? "fa-minus" : "fa-plus"}${row.original.Negations > 0 ? " text-warning" : ""}`}></i></div>
    //             }
    //             ,
    //             width: 110,
    //             fixed: "right"

    //         },
    //     ]
    // }, [state])

    const virtualizedColumns = useMemo(() => {
        console.log('isOnPC', isOnPC(), 'inOnMobile', isOnMobile())
        return [
            <Column
                //label="Menu"
                dataKey="applyOnPriv"
                width={50}
                headerRenderer={() => (
                    isOnPC() &&
                    <div className="checkbox-in-table-header ">
                        <CheckBoxComp
                            checked={state.allApplyOnPriv}
                            onCheckChange={onCheckAll}
                            name="allApplyOnPriv"
                            disabled={false}
                        />
                    </div>
                )}
                cellRenderer={({ rowData, ...row }) => {
                    return (<>
                        {
                            isOnPC() && <span className="cell-value hidden-mobile">
                                <CheckBoxComp
                                    checked={rowData.applyOnPriv}
                                    onCheckChange={onRowCheckChange('applyOnPriv')}
                                    increaseArea
                                    name={rowData.rowid}
                                    disabled={false}
                                />
                            </span>
                        }

                        {
                            isOnMobile() && <> <span className="mobile-label">Selected</span>
                                <div className="cell-value hidden-pc">
                                    <CheckBoxComp
                                        checked={rowData.applyOnPriv}
                                        onCheckChange={onRowCheckChange('applyOnPriv')}
                                        increaseArea
                                        name={rowData.rowid}
                                        disabled={false}
                                    />
                                </div> </>
                        }


                    </>)

                }}

            />,
            <Column
                width={300}
                label="Step Name"
                dataKey="Steps"
                cellRenderer={({ rowData, ...row }) => {
                    return (<>
                        {
                            isOnPC() && <span className="cell-value hidden-mobile">
                                {rowData.Steps}
                            </span>
                        }

                        {
                            isOnMobile() && <>
                                <span className="mobile-label">Step Name</span>
                                <div className="cell-value hidden-pc">
                                    {rowData.Steps}
                                </div>
                            </>
                        }


                    </>)

                }}

            />,
            <Column
                //label="Menu"
                dataKey="Add"
                width={40}
                headerRenderer={() => (

                    isOnPC() && <div className="checkbox-in-table-header ">
                        <CheckBoxComp
                            checked={state.allAdd}
                            onCheckChange={onCheckAll}
                            name="allAdd"
                            disabled={false}

                        />
                        <div>Add</div>
                    </div>
                )}
                cellRenderer={({ rowData, ...row }) => {
                    return (<>
                        {
                            isOnPC() && <span className="cell-value hidden-mobile">
                                <CheckBoxComp
                                    checked={rowData.Add}
                                    onCheckChange={onRowCheckChange('Add')}
                                    increaseArea
                                    name={rowData.rowid}
                                    disabled={false}
                                />
                            </span>


                        }
                        {
                            isOnMobile() && <>
                                <div className="row mt-2">
                                    <div className="col-4">
                                        <div className="mobile-label">Add</div>
                                        <div className="cell-value hidden-pc">
                                            <CheckBoxComp
                                                checked={rowData.Add}
                                                onCheckChange={onRowCheckChange('Add')}
                                                increaseArea
                                                name={rowData.rowid}
                                                disabled={false}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mobile-label">Modify</div>
                                        <div className="cell-value hidden-pc">
                                            <CheckBoxComp
                                                checked={rowData.Modify}
                                                onCheckChange={onRowCheckChange('Modify')}
                                                increaseArea
                                                name={rowData.rowid}
                                                disabled={false}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mobile-label">Delete</div>
                                        <div className="cell-value hidden-pc">
                                            <CheckBoxComp
                                                checked={rowData.Delete}
                                                onCheckChange={onRowCheckChange('Delete')}
                                                increaseArea
                                                name={rowData.rowid}
                                                disabled={false}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mobile-label">View</div>
                                        <div className="cell-value hidden-pc">
                                            <CheckBoxComp
                                                checked={rowData.View}
                                                onCheckChange={onRowCheckChange('View')}
                                                increaseArea
                                                name={rowData.rowid}
                                                disabled={false}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mobile-label">Print</div>
                                        <div className="cell-value hidden-pc">
                                            <CheckBoxComp
                                                checked={rowData.Print}
                                                onCheckChange={onRowCheckChange('Print')}
                                                increaseArea
                                                name={rowData.rowid}
                                                disabled={false}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mobile-label">Send Mail</div>
                                        <div className="cell-value hidden-pc">
                                            <CheckBoxComp
                                                checked={rowData.SendMail}
                                                onCheckChange={onRowCheckChange('SendMail')}
                                                increaseArea
                                                name={rowData.rowid}
                                                disabled={false}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mobile-label">Exception</div>
                                        <div className="cell-value hidden-pc">
                                            <CheckBoxComp
                                                checked={rowData.Exception}
                                                onCheckChange={onRowCheckChange('Exception')}
                                                increaseArea
                                                name={rowData.rowid}
                                                disabled={false}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </>

                        }




                    </>)

                }}

            />,
            <Column
                //label="Menu"
                dataKey="Modify"
                width={40}
                headerRenderer={() => (
                    isOnPC() && <div className="checkbox-in-table-header ">
                        <CheckBoxComp
                            checked={state.allModify}
                            onCheckChange={onCheckAll}
                            name="allModify"
                            disabled={false}
                        />
                        <div>Modify</div>
                    </div>
                )}
                cellRenderer={({ rowData, ...row }) => {
                    return (<>{
                        isOnPC() && <span className="cell-value hidden-mobile">
                            <CheckBoxComp
                                checked={rowData.Modify}
                                onCheckChange={onRowCheckChange('Modify')}
                                increaseArea
                                name={rowData.rowid}
                                disabled={false}
                            />
                        </span>
                    }
                    </>)

                }}
            />,
            <Column
                dataKey="Delete"
                width={40}
                headerRenderer={() => (
                    isOnPC() &&
                    <div className="checkbox-in-table-header ">
                        <CheckBoxComp
                            checked={state.allDelete}
                            onCheckChange={onCheckAll}
                            name="allDelete"
                            disabled={false}
                        />
                        <div>Delete</div>
                    </div>
                )}
                cellRenderer={({ rowData, ...row }) => {
                    return (<>
                        {isOnPC() &&
                            <span className="cell-value hidden-mobile">
                                <CheckBoxComp
                                    checked={rowData.Delete}
                                    onCheckChange={onRowCheckChange('Delete')}
                                    increaseArea
                                    name={rowData.rowid}
                                    disabled={false}
                                />
                            </span>
                        }

                    </>)

                }}
            />,
            <Column
                dataKey="View"
                width={40}
                headerRenderer={() => (
                    isOnPC() && <div className="checkbox-in-table-header ">
                        <CheckBoxComp
                            checked={state.allView}
                            onCheckChange={onCheckAll}
                            name="allView"
                            disabled={false}
                        />
                        <div>View</div>
                    </div>
                )}
                cellRenderer={({ rowData, ...row }) => {
                    return (<>
                        {
                            isOnPC() && <span className="cell-value hidden-mobile">
                                <CheckBoxComp
                                    checked={rowData.View}
                                    onCheckChange={onRowCheckChange('View')}
                                    increaseArea
                                    name={rowData.rowid}
                                    disabled={false}
                                />
                            </span>
                        }

                    </>)

                }}
            />,
            <Column
                dataKey="Print"
                width={40}
                headerRenderer={() => (
                    isOnPC() && <div className="checkbox-in-table-header ">
                        <CheckBoxComp
                            checked={state.allPrint}
                            onCheckChange={onCheckAll}
                            name="allPrint"
                            disabled={false}
                            description="Print"
                        />
                    </div>
                )}
                cellRenderer={({ rowData, ...row }) => {
                    return (<>
                        {
                            isOnPC() && <span className="cell-value hidden-mobile">
                                <CheckBoxComp
                                    checked={rowData.Print}
                                    onCheckChange={onRowCheckChange('Print')}
                                    increaseArea
                                    name={rowData.rowid}
                                    disabled={false}
                                />
                            </span>
                        }

                    </>)

                }}
            />,
            <Column
                dataKey="SendMail"
                width={65}
                headerRenderer={() => (
                    isOnPC() &&
                    <div className="checkbox-in-table-header ">
                        <CheckBoxComp
                            checked={state.allSendMail}
                            onCheckChange={onCheckAll}
                            name="allSendMail"
                            disabled={false}

                        />
                        <div>Send Mail</div>
                    </div>
                )}
                cellRenderer={({ rowData, ...row }) => {
                    return (<>
                        {
                            isOnPC() &&
                            <span className="cell-value hidden-mobile">
                                <CheckBoxComp
                                    checked={rowData.SendMail}
                                    onCheckChange={onRowCheckChange('SendMail')}
                                    increaseArea
                                    name={rowData.rowid}
                                    disabled={false}
                                />
                            </span>
                        }

                    </>)

                }}
            />,
            <Column
                dataKey="Till"
                width={120}
                label='Expiry Date'

                cellRenderer={({ rowData, ...row }) => {
                    //console.log('isOnPC()', isOnPC(), 'isOnMobile()', isOnMobile())
                    return (<>
                        {
                            isOnPC() && <span className="cell-value hidden-mobile text-center ">
                                <DateTimePickerComp
                                    popperPlacement='left-start'
                                    selected={rowData.Till}
                                    onDateTimeChange={handleDateTimeChange('Till', rowData)}
                                    name={rowData.rowid}
                                    className={state[`${"Till/" + rowData.rowid}NotValid`] || state[`${"Till/" + rowData.rowid}Mandatory`] ? "alert-danger" : ""}
                                    placeholder="--/--/----"
                                    dateSlash
                                    disabled={false}
                                />
                            </span>
                        }
                        {
                            isOnMobile() && <>
                                <span className="mobile-label">Expiry Date</span>
                                <span className="cell-value hidden-pc">
                                    <DateTimePickerComp
                                        popperPlacement='left-start'
                                        selected={rowData.Till}
                                        onDateTimeChange={handleDateTimeChange('Till', rowData)}
                                        name={rowData.rowid}
                                        className={state[`${"Till/" + rowData.rowid}NotValid`] || state[`${"Till/" + rowData.rowid}Mandatory`] ? "alert-danger" : ""}
                                        placeholder="--/--/----"
                                        dateSlash
                                        disabled={false}
                                    />
                                </span>
                            </>
                        }



                    </>)

                }}
            />,

        ]

    }, [state])

    const screenWidth = document.getElementById('tbl_users_details')?.clientWidth || 0


    return (
        <div className="fadeIn activeComponent" >
            <Notification
                type={state.notifType}
                title={state.notifTitle}
                message={state.notifMessage}
                display={state.notifDisplay}
            />
            <div className="row">
                <div className='row'>
                    <div className='col-12 col-lg-6'>
                        <div className='row mb-3 '>
                            <div className="col-6">
                                <DateTimePickerComp
                                    selected={state.since}
                                    onDateTimeChange={handleDateTimeChange('since')}
                                    name="since"
                                    className={`form-control ${state.invaliddate ? "alert-danger" : ""}`}
                                    placeholder="--/--/----"
                                    dateSlash
                                />
                                {state.invaliddate && <label className="errorLabel">Invalid Date</label>}

                            </div>
                            <div className="col-6">
                                <Button
                                    disabled={state.applyOnPrivDisabled}
                                    color="primary" onClick={applyOnPrivileges}>Apply on Privileges</Button>
                            </div>

                        </div>
                    </div>
                    <div className="row mt-1 ">
                        <div className="col-xl-4 col-sm-3">Image</div>
                        <div className="col-xl-8 col-sm-9">
                            <UploadFiles
                                data={state.image}
                                name="image"
                                readOnly={false}
                                onUploadUpdateData={returnUploadedFiles}
                                classRow="col-12 col-lg-3"
                            />
                        </div>
                    </div>

                    <div className='col-12 col-lg-6 mb-2'>

                        <InputTextComp
                            value={state.filter}
                            name="filter"
                            placeholder="Search..."
                            maxLength={50}
                            handleChange={handleChange}
                            disabled={false}
                            removeSpaces={false}
                        />
                    </div>
                </div>
                <hr />
                <div className='row' >

                    <div id="tbl_users_details" className="col-12 ">
                        <VirtualTable
                            id="tbl_users_details_table"
                            gridClassName="tbl_users_details_grid"
                            className="virtualTable"
                            width={screenWidth}
                            height={500}
                            headerHeight={45}
                            rowHeight={window.innerWidth > mobileDevicesWidth ? 40 : 350}
                            columns={virtualizedColumns}
                            data={state.filteredUsersPermissions}
                        />

                        {/* <RTable
                            className="-striped mobile-overflow"
                            data={state.filteredUsersPermissions}
                            columns={columns}
                            style={{ maxHeight: "56vh" }}
                            minRows={0}
                            showPaginationBottom={false}
                            showPaginationTop={false}
                            defaultPageSize={0}
                            resizable={false}
                        //defaultSorted={[{ id: "code", asc: true }]}
                        /> */}
                    </div>
                </div>


            </div>

        </div >

    )
}
