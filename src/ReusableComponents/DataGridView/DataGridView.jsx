import React, { useEffect, useMemo } from 'react'
import AdvancedTable from '../Other/AdvancedTable/AdvancedTable'
export function DataGridView() {

    const data = useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ],
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1', // accessor is the "key" in the data
                Cell: (row) => {
                    return <h1>{row.value}</h1>

                }
            },
            {
                Header: 'Column 2',
                accessor: 'col2',
            },
        ],
        []
    )



    return (
        <AdvancedTable
            columns={columns}
            dataArray={data}
            showPagination
            pageNbr={1}
            gotoPage={(pageNbr) => e => { }}
            nbrOfPage={10}
        />

    )
}
