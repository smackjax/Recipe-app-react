import React from 'react';
import NavBtn from './_btn';
export default (props)=>{
    // props.alignRight

    return (
        <NavBtn
        to="/recipe-dash"
        className={"btn-app " + (props.className || "")}
        alignRight={props.alignRight}
        >
            <i className="fa fa-list"></i>
        </NavBtn>
    )
}