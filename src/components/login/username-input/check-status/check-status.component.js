import React from 'react';
import './check-status.style.css';

export default (props)=>{
    // props.checking
    // props.available

    return ( // If new user(have to check username)
        <span className="username-check-result">
            {
            props.checkingUsername ? 
            <i className="fa fa-spinner animated-loading-spin"></i> :
                props.usernameAvailable ?
                    <span className="text-success"><i className="fa fa-thumbs-up"></i> Available</span>: 
                        <span className="text-danger "> <i className="fa fa-thumbs-down"></i> Unavailable</span>
            }
        </span> 
    )
    
}