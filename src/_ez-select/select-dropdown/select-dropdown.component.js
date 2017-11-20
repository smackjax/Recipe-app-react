import React from 'react';
import './select-dropdown.css';
export default (props)=>{
    // props.name
    // props.onChange
    // props.id

    const dropId = props.id ?
        props.id + "-dropdown" : "";
        
    return (
        <div
        id={dropId}
        key="boogaWooga"
        className={"ez-pz-select-dropdown " + props.className}>
            {props.children}
        </div>
    )
}