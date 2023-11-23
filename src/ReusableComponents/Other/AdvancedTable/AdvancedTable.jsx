import React, { Component, useCallback, useEffect, useRef } from 'react';
import { map, isEqual, cloneDeep, isEmpty } from 'lodash';
import Moment from 'moment';
import RTable from './RTable'
import SelectComp from "../SelectComponent/SelectComponent";
import InputNumericComp from '../InputNumericComponent/InputNumericComp';
import { customTableSearch } from '../../../utils/functions';
import { useStateWithCallback } from '../../../CustomHooks/useStateWithCallback';
import ContainerComp from '../ContainerComp/ContainerComp';
// import InputNumericComp from '../components/InputNumericComp';
import DateTimePickerComp from '../DateTimePickerComp/DateTimePickerComp'

export default function AdvancedTable({ columns, dataArray, triggerPaging, filterOptions, SearchParameters, ...props }) {
    const STATE = useRef(
        {
            columns: [],
            filterText: '',
            dataArray: [],
            dataArrayFiltered: [],
            selectAll: 0,
            selectedFilterOptions: [],
            FilterOptions: [],

            OriginalFilter: [],



        }
    );
    const [state, setState] = useStateWithCallback(STATE.current);



    useEffect(() => {
        document.getElementsByClassName('ReactTable')[0].style.zIndex = 0;
        setState(prv => {
            let mapped = filterOptions ? filterOptions.map(e => {
                return {
                    label: e.columnCaption, value: e.columnName
                }

            }) : []


            return {
                ...prv,
                dataArray: dataArray,
                dataArrayFiltered: dataArray,
                columns: columns,
                FilterOptions: prv.FilterOptions?.length === 0 ? cloneDeep(mapped) : prv.FilterOptions,
                selectedFilterOptions: prv.FilterOptions?.length === 0 ? cloneDeep(mapped) : prv.selectedFilterOptions,
                OriginalFilter: filterOptions ? cloneDeep(filterOptions) : []
            }
        }, (nextState, SetNextState) => {
            // console.trace();
            //console.log('here')
            customsearch(nextState.filterText, true)


        });
    }, [columns, dataArray, filterOptions])

    useEffect(() => {
        if (!isEmpty(SearchParameters) && isEmpty(state.SearchParameters)) {
            let selectors = SearchParameters.filter(e => e.type === 'select')
            let datetime = SearchParameters.filter(e => e.type === 'date')
            let selectorsStateObj = {}
            let datetimeStateObj = {}
            selectors.forEach(element => {
                selectorsStateObj[`${element.name}`] = element.options
                if (element.isMultiple) {
                    selectorsStateObj[`selected${element.name}`] = element.options.filter(e => element.value.includes(e.value))
                }
                else {
                    selectorsStateObj[`selected${element.name}`] = element.value;
                }
            })

            datetime.forEach(element => {
                datetimeStateObj[`${element.name}`] = element.value;
            })

            setState(prv => { return { ...prv, ...{ SearchParameters: SearchParameters }, ...cloneDeep(selectorsStateObj), ...cloneDeep(datetimeStateObj) } })


        }

    }, [SearchParameters])

    useEffect(() => {

        if (state.selectedFilterOptions.length === 0 && state.FilterOptions.length > 0) {
            setState({ ...state, selectedFilterOptions: cloneDeep(state.FilterOptions) })
        }

    }, [state.selectedFilterOptions, state.FilterOptions])


    const customsearch = useCallback((value, isTriggeredOnStateChange) => {
        setState(prv => {
            let mapped = prv.OriginalFilter.map(e => {
                return {
                    ...e,
                    isSelected:
                        prv.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
                }
            });

            return {
                ...prv,
                filterText: value,
                dataArrayFiltered: customTableSearch(value, prv.dataArray, mapped)

            }
        }, (nextState, setNextState) => {
            if (triggerPaging && !isTriggeredOnStateChange) {

                let mappedFiltration = nextState.OriginalFilter.map(e => {
                    return {
                        ...e,
                        isSelected:
                            nextState.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
                    }
                }).filter(e => e.isSelected);

                let searchOptions = extractSearchOptionsFromState(nextState);

                triggerPaging(value.toLowerCase(), mappedFiltration, searchOptions);
            }
        })

    }, [])

    const handleFilterTextChange = useCallback((event) => {
        customsearch(event.target.value);

    }, [])

    const handleFilterOptionsChange = useCallback((value, key) => {
        setState(prv => {
            return { ...prv, [key]: value }
        }, (nextState, setNextState) => {
            let mapped = state.OriginalFilter.map(e => {
                return {
                    ...e,
                    isSelected:
                        state.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
                }
            }).filter(e => e.isSelected);
            let searchOptions = extractSearchOptionsFromState(nextState);

            triggerPaging(nextState.filterText, mapped, searchOptions);
        })

    }, [])

    const handleSearchValuesChange = useCallback((value, key) => {
        setState(prv => {
            return { ...prv, [key]: value }
        }, (nextState, setNextState) => {

            let mapped = state.OriginalFilter.map(e => {
                return {
                    ...e,
                    isSelected:
                        state.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
                }
            }).filter(e => e.isSelected);
            let searchOptions = extractSearchOptionsFromState(nextState);

            triggerPaging(nextState.filterText, mapped, searchOptions);
        })
    }, [])

    useEffect(() => {
        handleSearchDateValueChanges('z')
    }, [state])

    const handleSearchDateValueChanges = useCallback((key, value, isvalid) => {
        if (key === 'z') {
            console.log(JSON.stringify(state.selectedUsr_Type))
            return
        }


        if (isvalid && state[key] === (value ? value.format("YYYY-MM-DD") : "")) {
            return
        }

        if (isvalid) {
            setState(
                { ...state, [key]: value ? value.format("YYYY-MM-DD") : "" }
                , (nextState, setNextState) => {

                    let mapped = nextState.OriginalFilter.map(e => {
                        return {
                            ...e,
                            isSelected:
                                nextState.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
                        }
                    }).filter(e => e.isSelected);
                    let searchOptions = extractSearchOptionsFromState(nextState);

                    triggerPaging(nextState.filterText, mapped, searchOptions);
                })
        }

    }, [state])

    const handleNextPrevious = useCallback((event) => {
        let mapped = state.OriginalFilter.map(e => {
            return {
                ...e,
                isSelected:
                    state.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
            }
        }).filter(e => e.isSelected);

        let searchOptions = extractSearchOptionsFromState(state);

        triggerPaging(state.filterText, mapped, searchOptions, event.target.name === 'next' ? 1 : -1);
    }, [state])

    const buildSearchSection = useCallback(() => {

        let jsxArr = [];
        let selectors = state.SearchParameters.filter(e => e.type === 'select')

        selectors.forEach((element, index) => {
            jsxArr.push(
                <div className='row mb-1 mt-1' key={'select' + index.toString()}>
                    <div className=" col-4">{element.label}</div>
                    <div className={`col-8`}>
                        <SelectComp
                            value={element.options.filter(e => element.value.includes(e.value))}
                            name={`selected${element.name}`}
                            options={element.options}
                            clearable
                            className=""
                            onChange={handleSearchValuesChange}
                            multi={element.isMultiple}

                        />
                    </div>

                </div>)

        });
        let datetime = state.SearchParameters.filter(e => e.type === 'date')
        datetime.forEach((element, index) => {
            jsxArr.push(
                <div className='row mb-1 mt-1' key={'date' + index.toString()}>
                    <div className=" col-4">{element.label}</div>
                    <div className={`col-8`}>
                        <DateTimePickerComp
                            selected={element.value}
                            onDateTimeChange={handleSearchDateValueChanges}
                            name={element.name}
                            placeholder="--/--/----"
                            dateSlash
                        />
                    </div>

                </div>)

        });

        return jsxArr
    }, [state])

    const extractSearchOptionsFromState = useCallback((stt) => {
        let searchOptions = []
        if (!isEmpty(stt.SearchParameters)) {
            let selectors = stt.SearchParameters.filter(e => e.type === 'select')
            let datetime = stt.SearchParameters.filter(e => e.type === 'date')

            selectors.forEach(element => {
                searchOptions.push({
                    name: element.name,
                    value: stt[`selected${element.name}`].map(e => e.value)
                })

            })

            datetime.forEach(element => {
                searchOptions.push({
                    name: element.name,
                    value: stt[`${element.name}`]
                })
            })



        }
        console.log('searchOptions', searchOptions, 'SearchParameters', stt.SearchParameters)
        return searchOptions


    }, [])
    return (
        <>
            <div id="AdvancedTableSearchHeight" className={"row mt-3"}>
                {
                    filterOptions?.length > 0 ?
                        <>
                            <div className=" col-12  col-lg-1">Filter Options</div>
                            <div className={`col-12  col-lg-4`}>
                                <SelectComp
                                    value={state.selectedFilterOptions}
                                    onChange={handleFilterOptionsChange}
                                    name="selectedFilterOptions"
                                    options={state.FilterOptions}
                                    clearable
                                    className=""
                                    multi={true}

                                />
                            </div>

                        </> : null
                }
                {props.enableSearch ?
                    <>
                        <div className={`${filterOptions?.length > 0 ? "col-12 offset-lg-3 col-lg-4" : "offset-lg-8 col-lg-4"}`}>
                            <input type="text" className="form-control form-control-sm" value={state.filterText} onChange={handleFilterTextChange} placeholder="Search ..." />
                        </div>
                    </>
                    :
                    null
                }


            </div>
            {
                !isEmpty(state.SearchParameters) ? <div className={"row mt-2"}>
                    <div className="col-12 col-lg-5">
                        <ContainerComp
                            containerHeader='Search Options'
                            containerBody={<>
                                {
                                    buildSearchSection()
                                }
                            </>}
                            addPlus={false}
                            name=""
                            onClickPlus={() => { }}
                        />

                    </div>
                </div> : null
            }

            <RTable
                data={state.dataArrayFiltered}
                columns={state.columns}
                style={{ maxHeight: props.maxHeight ? props.maxHeight : "620px", marginTop: "10px" }}
                minRows={props.minRows === undefined ? 0 : props.minRows}
                SubComponent={props.SubComponent ? props.SubComponent : null}
                resizable={props.resizable ? props.resizable : false}
                defaultSorted={props.defaultSorted ? props.defaultSorted : []}
                selected={state.selected}
            />

            {
                triggerPaging ?
                    <div className="pagination" >
                        <button className="btn btn-primary  btn-sm" name='pvs' onClick={handleNextPrevious} disabled={false}>
                            {'<'}
                        </button>{' '}
                        <button className="btn btn-primary  btn-sm" name='next' onClick={handleNextPrevious} disabled={false}>
                            {'>'}
                        </button>{' '}

                    </div> : null


            }
        </>

    )
}

