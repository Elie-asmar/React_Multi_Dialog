import { isEqual } from 'lodash';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Column, Table } from 'react-virtualized';


export default function VirtualTable({
    data = [], id,
    classname, width, height,
    headerHeight, rowHeight, gridClassName,
    rowClassName = null, columns, ...props }) {


    useEffect(() => {
        if (document.getElementsByClassName(gridClassName)[0])
            document.getElementsByClassName(gridClassName)[0].addEventListener("scroll", onScroll, { passive: true });

        return () => document.getElementsByClassName("ReactVirtualized__Grid")[0].removeEventListener("scroll", onScroll);
    }, []);

    const onScroll = useCallback(({ }) => {
        let ReactVirtualizedGrid = document.getElementsByClassName(gridClassName)
        let ReactVirtualizedTable = document.getElementById(id)
        ReactVirtualizedTable.scrollLeft = ReactVirtualizedGrid[0].scrollLeft
    }, []);

    const cols = useRef([]);
    useLayoutEffect(() => {
        cols.current = columns?.map((v, i) => { return { ...v, key: i } })
    }, columns)

    const colorRows = useCallback(({ index }) => {
        if (index < 0) {
            return null;
        } else {
            return index % 2 === 0 ? "odd" : null;
        }
    }, []);

    return (
        <Table
            id={id}
            gridClassName={gridClassName}
            className={classname}
            width={width}
            height={height}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowCount={data.length}
            rowGetter={({ index }) => data[index]}
            rowClassName={rowClassName ? rowClassName : colorRows}

        // gridStyle={{
        // }}
        // containerStyle={{
        // }}
        // style={{
        // }}
        >
            {cols.current.length > 0 ? cols.current : null}
        </Table>
    )

}

// function onScroll() {
//     let ReactVirtualizedGrid = document.getElementsByClassName(props.gridClassName)
//     let ReactVirtualizedTable = document.getElementById(props.id)
//     ReactVirtualizedTable[0].scrollLeft = ReactVirtualizedGrid[0].scrollLeft
// }
