import React from 'react';
import './back-btn.style.css';

export default (props)=>{
    // props.onClick
    return (
        <button
        onClick={props.onClick}
        className="btn main-nav-btn back-btn btn-app" >
            <i className="fa fa-chevron-left"></i>
        </button>
    )
}