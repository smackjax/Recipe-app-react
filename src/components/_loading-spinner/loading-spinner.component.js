import React from 'react';

export default (props)=>{
    return (
        <div 
        className={props.className || ""}
        style={{display: "flex", flexDirection: "column"}}>
            <i style={{alignSelf: "center", margin: "5px 0px"}} className="fa fa-spinner animated-loading-spin"></i>
        </div> 
    )
}