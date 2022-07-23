import React, {ReactElement, useEffect, useState} from "react";
import {convertDocEleToReact} from "../../utils/convertDocEleToReact";

export const SVGUrl = (props: {url: string}) => {
    const [Comp, setComp] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(props.url)
            .then(res => res.text())
            .then(res => {
                const domParser = new DOMParser();
                const ele = domParser.parseFromString(res, "image/svg+xml");
                setComp(convertDocEleToReact(ele.documentElement, undefined));
                setLoading(false);
            });
    }, []);

    return <>{loading || !Comp ? "..." : Comp}</>;
};