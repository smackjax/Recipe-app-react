import React from 'react';
import './check-status.style.css';

export default (props)=>{
    // props.checking
    // props.available

    return ( // If new user(have to check username)
    <label htmlFor="settings-username"
    className="col-12">
    {props.checking === null || props.checking === undefined ? 
        "Username" : props.checking ? 
        <i className="fa fa-spinner animated-loading-spin"></i> :
            props.available ?
                <span className="text-success"><i className="fa fa-thumbs-up"></i> Available</span>: 
                    <span className="text-danger "> <i className="fa fa-thumbs-down"></i> Unavailable</span>
        }
    </label>
    )    
}