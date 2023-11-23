import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { FetchData, handleEmpty } from "../../utils/functions";



//A state change in a customHook will trigger a re-render of the
//component that is using the custom hook.
//Dont think of the custom hook as being a child component. Instead, it is 
//an abstraction of some logic from the component to outside. Consequently, any state change 
//at the level of the custom hook will trigger a re-render on main component side.
export function useFetchData(url, Type = handleEmpty(), params = null) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const controller = useRef(null);

    useEffect(() => {
        controller.current = new AbortController();
        return () => {
            controller.current.abort()
        }
    }, [])

    useEffect(() => {
        Fetch()


    }, [url, Type, params])

    const Fetch = useCallback(async () => {
        try {
            let resp = await FetchData(url, Type, params, () => true, controller.current.signal)
            console.log('resp',resp)
            setData(resp.data)
        }
        catch (e) {
            setError(e)
            setData(null)
        }

    }, [url, Type, params])



    // useEffect(() => {
    //     console.log('useEffect of fetchData')
    //     setTimeout(() => {
    //         setData('Some Data Returned From API')
    //     }, 1500);
    // }, [url, Type, params])

    // useEffect(() => {
    //     console.log('data has changed in fetchData')

    // }, [data])

    return [data, error,Fetch];


}
