import React from 'react';  
import  SkxInput from '../../../_regex-input/regex-input.component';

export default (props)=>{
    // props.newUser
    // props.name
    // props.onChange
    return(
        <div className="login-pass-group">
            <label className="login-input-label"><b>Confirm Password*</b></label>
            <SkxInput
            type="password"
            required={props.newUser}
            disabled={props.disabled || !props.newUser}
            onChange={props.onChange}
            maxLength="20"
            name={props.name || "loginConfirmPassword"}
            className="form-control login-input" />
        </div>
    )
}