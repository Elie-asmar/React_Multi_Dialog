import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FetchData } from '../../../utils/functions';
import RTable from '../AdvancedTable/RTable';

export function SubGridComp({ stepname, ...rest }) {
    const [data, setData] = useState([]);
    const controller = useRef(null);

    useEffect(() => {
        getData();
        controller.current = new AbortController();
        return () => {
            controller.current.abort()
        }
    }, []);

    const getData = useCallback(async () => {
        let url = '';
        if (stepname === 'UsersDefinitionList') {
            url = 'DataFiles/Forms/UsersDefinition/UserLinkedGroups.json';
            let resp = await FetchData(url, 'get', null, () => true, controller.current);
            resp = cloneDeep(resp)
            setData(resp);
        }
        else {
            return;
        }
    }, []);

    const columns = useMemo(() => {
        let cols = [];
        switch (stepname) {
            case 'UsersDefinitionList':
                cols = [
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

                    },
                    {
                        Header: 'Name',
                        accessor: 'Grp_Name',
                        fixed: "left",

                        Cell: row => (
                            <div>
                                <span className="mobile-label">Name</span>
                                <span className="cell-value hidden-mobile ">{row.value}</span>
                                <span className="cell-value hidden-pc">{row.value}</span>
                            </div>
                        ),
                    }
                ]
                break;

            default:
                break;
        }
        return cols


    }, [data])

    return (
        <>
            {data.length > 0 ?
                <div className="row mt-1">
                    <div className="col-12 col-sm-6">
                        <RTable
                            className="-striped mobile-overflow"
                            data={data}
                            columns={columns}
                            style={{ maxHeight: "56vh" }}
                            minRows={0}
                            showPaginationBottom={false}
                            showPaginationTop={false}
                            defaultPageSize={0}
                            resizable={false}

                        />
                    </div>
                </div> :
                <div className="sk-three-bounce" style={{ position: "fixed", top: "calc(calc(50% - 12px) + 20px)", left: "calc(50% - 40px)" }
                }>
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                </div>

            }

        </>

    )
}
