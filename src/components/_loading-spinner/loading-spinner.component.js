import React from 'react';

export default (props)=>{
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <i style={{alignSelf: "center", fontSize: "2rem", margin: "5px 0px"}} className="fa fa-spinner animated-loading-spin"></i>
        </div> 
    )
}