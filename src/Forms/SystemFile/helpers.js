import { isEqual } from "lodash";
import { ARR_OF_NAV_INDEX_STATE_KEYS, NAV_INDEXES } from "./data";

export const sysFileMemoCb = (prevProps, nextProps) => isEqual(prevProps.state, nextProps.state);

/**
 * This function takes a single object and returns a new object with the same data, but with the data
 * organized in a different way.
 * @param data - {
 * @returns An object with the following structure:
 * {
 *     "stateAbbreviation": {
 *         "key1": "value1",
 *         "key2": "value2",
 *         "key3": "value3",
 *         "key4": "value4",
 *         "key5": "value5",
 *         "key6": "value6",
 */
export const mutateSystemFileDataForReact = (data) => {
    const NEW_STATE = {};
    for (let key in NAV_INDEXES) {
        const INT_INDEX = Number(key);
        const STATE_ABBREVIATION = NAV_INDEXES[INT_INDEX];
        NEW_STATE[STATE_ABBREVIATION] = {};
        ARR_OF_NAV_INDEX_STATE_KEYS[INT_INDEX].forEach((item) => {
            NEW_STATE[STATE_ABBREVIATION][item] = data[item];
        });
    };
    return NEW_STATE;
};
