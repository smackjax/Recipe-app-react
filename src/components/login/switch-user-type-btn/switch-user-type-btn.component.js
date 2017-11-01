import React from 'react';
import './switch-user-type-btn.style.css';

export default (props)=>{
    // props.text
    // props.onClick()
    return (
        <button onClick={props.onClick}
        className="btn switch-user-type-btn">
            {props.children}     
        </button>
    )
}