import React from 'react';
import './color-splotch.css';
export default (props)=>{
    // color set by className
    return (
    <div
    className={"color-splotch " + props.className}
    ></div>
    )
}