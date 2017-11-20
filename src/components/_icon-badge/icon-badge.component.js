import React from 'react';
import getBgClass from '../../_style/getBgClass';
import * as icons from '../../_resources/circle-icons/all-icons';
import './icon-badge.css';
export default (props)=>{
    // props.iconType
    // props.className
    const bgColor = getBgClass(props.iconType);
    const svgSrc = icons.getIconSrc(props.iconType);
    return (
        <div 
        className={"icon-badge " + bgColor  + " " + (props.className || "")}>
            <img src={svgSrc} 
            alt=""
            className={"icon-badge-svg "} />
        </div>
    )
}