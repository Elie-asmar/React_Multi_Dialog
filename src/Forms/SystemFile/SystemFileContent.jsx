import React, { useState, useEffect, useCallback, useMemo } from "react"
import { TabContent, TabPane } from "reactstrap";
import { useLoadingContext } from "../../CustomHooks/Context/useLoadingContext";
import { NAV_INDEXES, } from "./data";
import { mutateSystemFileDataForReact } from "./helpers";

export function SystemFileContent({ children, active }) {

    const [, setIsLoading] = useLoadingContext();
    const [settings, setSettings] = useState(null);
    const activeStateName = NAV_INDEXES[active];
    const Children = React.Children.toArray(children);
    const ActiveChild = Children[active];

    const innerState = useMemo(() => {
        return settings?.[activeStateName] ?? null;
    }, [activeStateName, settings]);


    const fetchData = useCallback(async () => {
        const data = await (await fetch("/DataFiles/Settings.json")).json();
        const derivedData = mutateSystemFileDataForReact(data);
        setSettings(derivedData);
    }, []);

    const changeInnerState = useCallback((outerKey) => {

        return (key, value) => {
            setSettings(prevState => {
                if (prevState === null) return null
                return {
                    ...prevState,
                    [outerKey]: { ...prevState[outerKey], [key]: value }
                };
            })
        };
    }, []);


    const ClonedElement = React.cloneElement(ActiveChild, {
        state: innerState,
        changeState: changeInnerState
    });

    useEffect(() => {
        setIsLoading(prevState => prevState + 1);
        fetchData();
        setTimeout(() => {
            setIsLoading(prevState => prevState - 1);
        }, 1000);
    }, []);

    return <TabContent activeTab={active}>
        <TabPane style={{ height: "100vh" }} tabId={active}>
            {ClonedElement}
        </TabPane>
    </TabContent >
}
