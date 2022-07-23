import { createElement } from "react";

const innerFunction = (element: any, props: any): any => {
    const tagName = element.tagName;
    let _props = props || {};

    for(let i = 0; i < element.attributes.length; i++){
        _props[element.attributes[i].nodeName] = element.attributes[i].nodeValue;
    }

    let children = Array.from(element.children).map(item => innerFunction(item, undefined));

    return createElement(tagName, _props, children);
};

export const convertDocEleToReact = (element: any, props: any) => {
    try{
        return innerFunction(element, props);
    }
    catch(ex){
        return createElement("span", {}, "Error loading svg image");
    }
};