import React from 'react';
import InputGroupWithSubmitBtn from '../_input-group-with-btn/input-group-with-btn.component';
import PasswordInput from './password-input.component';

export default (props)=>{
    // props.placeholder
    // props.token
    // props.onSuccess

    // props.submitDisabled
    // All other props are applied to <input>

    return (
    <InputGroupWithSubmitBtn
        {...props}
        placeholder={props.placeholder || "Password"}
        component={PasswordInput}
    />
    
    
    )
}