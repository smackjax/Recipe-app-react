import React from 'react';
import './back-btn.style.css';

export default (props)=>{
    // props.onClick
    return (
        <button
        onClick={props.onClick}
        className="btn back-btn bg-blue" >
            <i className="fa fa-chevron-left"></i>
        </button>
    )
}