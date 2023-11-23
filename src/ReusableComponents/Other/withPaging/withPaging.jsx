import { cloneDeep, forEach, isEqual, mapKeys } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FetchData } from '../../../utils/functions';

export const withPaging = (Comp) => (
    { fetchApiFunction, dataArray, columns, numberOfPages, ...props }) => {
    const timeout = useRef(null);
    const filterOptions = useRef([]);
    const pgNbr = useRef(0);
    const AllFiltration = useRef(null);
    const [state, setState] = useState(0)

    // const [searchOptions, setSearchOption] = useState([])
    // const [pgNbr, setPgNbr] = useState(0)
    // const [fltrtext, setFltrText] = useState('')

    useEffect(() => {
        console.log('columns', columns)

    }, [])

    useEffect(() => {
        if (dataArray && columns && dataArray.length > 0) {
            let obj = dataArray[0];


            let arr = [];

            Object.keys(obj).forEach(key => {
                let o1 = {};
                o1.columnName = key;
                let col = columns.find(e1 => e1.accessor === key);
                if (col?.Header) {
                    o1.columnCaption = col.Header
                    arr.push(o1);
                }

            });
            filterOptions.current = [...arr]
            setState(prv => prv + 1)
        }

    }, [dataArray, columns, numberOfPages])

    const triggerPaging = useCallback((searchValue, selectedFilterOptions, searchOptions, pagecounter = 0) => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        let searchObject = { searchValue: searchValue, selectedFilterOptions: cloneDeep(selectedFilterOptions), searchOptions: cloneDeep(searchOptions) }


        if (!isEqual(searchObject, AllFiltration.current)) {
            pgNbr.current = 0
            AllFiltration.current = searchObject
        }
        else {
            AllFiltration.current = searchObject
            pgNbr.current = pgNbr.current + pagecounter < 0 ? 0 : pgNbr.current + pagecounter

        }
        timeout.current = fetchData(searchValue, selectedFilterOptions, searchOptions);



    }, [pgNbr.current])


    const fetchData = useCallback((searchValue, selectedFilterOptions, searchOptions) =>
        setTimeout(async () => {
            try {
                fetchApiFunction(searchValue, selectedFilterOptions, searchOptions, pgNbr.current);
            }
            catch (error) {
                throw error
            }
            finally {

            }
        }, 1000)
        , [pgNbr.current])


    return (
        <Comp {...props}
            dataArray={dataArray}
            columns={columns}
            triggerPaging={triggerPaging}
            filterOptions={filterOptions.current} />
    )
}
