import React from 'react';
import './check-status.style.css';

export default (props)=>{
    // props.newUser
    // props.checkingUsername
    // props.usernameAvailable

    return props.newUser ? ( // If new user(have to check username)
        <span className="username-check-result">
            {
            props.checkingUsername ? 
            <i className="fa fa-spinner"></i> :
                props.usernameAvailable ?
                    <i className="text-success fa fa-thumbs-up"></i> : 
                        <i className="text-danger fa fa-thumbs-down"></i>
            }
        </span> 
    ):
        <span></span>
    
}