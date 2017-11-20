import React from 'react';
import {Link} from 'react-router-dom';
export default (props)=>{
    // to
    // className
    // props.alignRight
    const rightClass = props.alignRight ? 
    " align-btn-right " : "";
    const btnClassName = 
        "btn main-nav-btn " + 
            (props.className || "") +
                rightClass;
                
    return (
        <Link
        to={props.to}
        className={btnClassName}
        >
            {props.children}
        </Link>
    )
}