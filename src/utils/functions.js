import axios from "axios";
import Moment from 'moment';
import {
    clone,
    cloneDeep,
    isEmpty
} from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { mobileDevicesWidth } from "../globals";
export const ColoringStatusLikeLegends = (status) => {

    let color = "";
    status = status ? status : ""
    if (status.toLowerCase() === "pending" || status.toLowerCase() === "on-hold" || status.toLowerCase() === "waiting approval") {
        color = "#ffa500"
    } else if (status.toLowerCase() === "approved" || status.toLowerCase() === "active" || status.toLowerCase() === "started" || status.toLowerCase() === 'a') {
        color = "#00cc00"
    } else if (status.toLowerCase() === "rejected" || status.toLowerCase() === "inactive") {
        color = "#ff0000"
    } else if (status.toLowerCase() === "draft") {
        color = "#999999"
    } else if (status.toLowerCase() === "waiting my approval") {
        color = "#33ccff";
    }

    if (status) {
        return <span><span style={{ color }}><i className="fa fa-circle"></i></span> {status}</span>;
    } else {
        return "";
    }

}

export const isOnMobile = () => window.innerWidth < mobileDevicesWidth;
export const isOnPC = () => !isOnMobile();

export const CalculateTitleHeight = (id) => {
    return document.getElementById(id) ? document.getElementById(id).offsetHeight : 0
}
export const handleEmpty = () => {
    throw new Error('Invalid Type, must be get or post ')
}

export async function FetchData(url, Type = handleEmpty(), params = null, datafilterfunction = () => true, controller) {
    try {
        if (Type === 'get') {
            let queryparams = new URLSearchParams({ ...params });
            let resp = await axios({ method: 'get', url: url + `${!isEmpty(params) ? `?${queryparams.toString()}` : ''}`, crossDomain: true, signal: controller ? controller.signal : null });
            await awaitableTimeOut(500);
            return {
                ...cloneDeep(resp), data: resp.data.filter(datafilterfunction)
            }
        }
        else {
            let resp = await axios({
                method: 'post',
                signal: controller ? controller.signal : null,
                url: url,
                data: isEmpty(params) ? JSON.stringify({}) : JSON.stringify(params),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });

            await awaitableTimeOut(500);

            return {
                ...cloneDeep(resp), data: resp.data.filter(datafilterfunction)
            }
            // await awaitableTimeOut(500);

            // let uri = new URL(url);
            // let MethodName = uri.href.substring(uri.href.lastIndexOf("/")).replace("/", '')
            // let r = resp.data[`${MethodName}Result`];
            // if (isEmpty(r)) {
            //     return []
            // }
            // else {
            //     return JSON.parse(r)
            // }


        }
    }
    catch (e) {
        throw e;
    }


}
export async function FetchDataMultiple(params) {
    try {
        params.forEach(element => {
            if (element.Type.toLowerCase() !== 'get' && element.Type.toLowerCase() !== 'post') {
                handleEmpty();
            }
        });

        let resp = await Promise.all(params.map(p => {
            return PromisfiedAxiosRequest(p.url, p.Type, p.params)
        }))


        resp = resp.map((v, i) => {
            if (params[i].datafilterfunction) {
                return v.filter(params[i].datafilterfunction)
            }
            else {
                return v;
            }
        })
        return resp;


    }
    catch (e) {
        throw e;
    }


}

export const awaitableTimeOut = (timeout) => new Promise((rs, rj) => {
    setTimeout(() => {
        rs(1)
    }, timeout);

})
export const readfileasync = (file) => new Promise((rs, rj) => {
    var reader = new FileReader()
    reader.onloadend = () => {
        rs(reader.result)
    }
    reader.readAsDataURL(file)
})

export const isRequiredDataEmpty = (state) => {
    let mandatory = state.mandatory;
    let missing = {}
    if (!mandatory)
        return
    for (let key of mandatory) {
        const valueToBeChecked = state[key];
        if (typeof valueToBeChecked === "number") {
            if (valueToBeChecked === 0) missing[`missing${key}`] = true;
            return;
        };
        if (isEmpty(valueToBeChecked)) {
            missing[`missing${key}`] = true
        }
    }

    return missing
}

export const saveFinished = (state, setState, notifType, notifTitle, notifMessage, goBack, navigate) => {

    console.log('saveFinished')
    setState({ ...state, notifType, notifTitle, notifMessage, notifDisplay: 'block' },
        async (nextState, setNextState) => {
            await awaitableTimeOut(nextState.notifTime ? nextState.notifTime : 3000);
            if (nextState.notifType !== 'error') {
                setNextState({ ...nextState, notifDisplay: 'none' },
                    (afternextState, setAfterNextState) => {
                        if (!goBack) {

                        }
                        else {
                            console.log('navigating away')
                            navigate(-1)
                        }
                    })
            }

        })
}

export const customTableSearch = (filterText, data, FilterOptions = null) => {
    let searchedValue = filterText.toLowerCase();
    let regExDateFormat = /^[0-9]{2}(\/|-)[0-9]{2}(\/|-)[0-9]{4}/; // start with DD/MM/YYYY or DD-MM-YYYY or MM/DD/YYYY or MM-DD-YYYY
    let regExDateFormat2 = /^[0-9]{4}(\/|-)[0-9]{2}(\/|-)[0-9]{2}/; // start with YYYY/DD/MM or YYYY-DD-MM or YYYY/MM/DD or YYYY-MM-DD
    let dataFiltered = [];



    let includedColumns = !isEmpty(FilterOptions) ?
        FilterOptions.filter(e => e.isSelected).map(e => e.columnName) :
        data.length > 0 ? Object.keys(data[0]) : []


    if (searchedValue) {
        dataFiltered = data.filter(row => {
            let getRow = true;
            if (searchedValue) {

                getRow = false;

                for (let key of includedColumns) {
                    let value = row[key]

                    if (value && (regExDateFormat.test(value) || regExDateFormat2.test(value) || typeof value.getMonth === "function")) {
                        getRow = getRow || Moment(value).format("DD/MM/YYYY").includes(searchedValue.trim()) || Moment(value).format("DD-MM-YYYY").includes(searchedValue.trim()) || value.toString().toLowerCase().includes(searchedValue.trim());
                    } else if (value) {
                        getRow = getRow || value.toString().toLowerCase().includes(searchedValue.trim());
                    }
                }

            }

            return getRow

        })
    }
    else {
        dataFiltered = cloneDeep(data)
    }
    return dataFiltered



}
export const PromisfiedAxiosRequest = (url, Type = handleEmpty(), params = null, controller = null) => new Promise((rs, rj) => {
    if (Type === 'get') {
        let queryparams = new URLSearchParams({ ...params });

        //  console.log('useFetchData use Effect Executing')
        axios({
            method: 'get',
            url: url + `${!isEmpty(queryparams) ? `?${queryparams.toString()}` : ''}`,
            signal: controller ? controller.signal : null,
            crossDomain: true,
            //params:params
        }).then(resp => setTimeout(() => {
            rs(resp)
        }, 500))
            .catch(err => rj(err))
    }
    else {
        axios({
            method: 'post',
            url: url,
            signal: controller ? controller.signal : null,
            data: isEmpty(params) ? JSON.stringify({}) : JSON.stringify(params),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(resp => rs(resp)).catch(err => rj(err))
    }

});


export const buildTypeFromBase64 = (base64string) => {


    if (!isEmpty(base64string)) {
        let fileType = ''
        let nameExtension = ''
        switch (base64string.charAt(0)) {
            case '/':
                fileType = 'jpeg'
                break;
            case 'i':
                fileType = 'png'
                break;
            case 'R':
                fileType = 'gif'
                break;
            case 'U':
                if (base64string.charAt(1) === "E") {
                    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    nameExtension = 'xlsx'
                } else {
                    fileType = 'webp'
                }
                break;
            case 'D':
                fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                nameExtension = 'docx'
                break;
            default:
                break;

        }
        //image/jpeg;base64,
        if (base64string.slice(0, 2) !== "UE" && base64string.charAt(0) !== "D") {
            base64string = { data: `data:image/${fileType};base64,${base64string}` }
        } else {
            base64string = [{
                deleted: false,
                file: `data:${fileType};base64,${base64string}`,
                name: 'name.xls',
                readOnly: false,
            }]
        }
        return base64string;
    }
}

export const getBase64 = (itemObject) => {
    const { file, ...restProperties } = itemObject;
    return new Promise((resolve, reject) => {

        if (file instanceof File === false) {
            const newItemObject = { ...itemObject };
            newItemObject.file = newItemObject.file.split(',')[1];
            return resolve(newItemObject);
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const newObject = {
                ...restProperties,
                file: reader.result.split(',')[1]
            };
            resolve(newObject);
        }
        reader.onerror = error => reject(error);
    });
}