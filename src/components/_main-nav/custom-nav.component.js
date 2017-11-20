import React from 'react';

export default (props)=>{
    // props.className
    return (
        <nav className={"main-nav-wrapper " + (props.className || "")}>
            {props.children}
        </nav>
    )
}