import React from 'react';  
import Dropdown from '../../../_dropdown/dropdown.component';
import  SkxInput from '../../../_input-not-blank/input-not-blank.component';

export default (props)=>{
    // props.newUser
    // props.name
    // props.onChange
    return(
        <div className="login-pass-group">
            <label className="login-input-label">Confirm Password*</label>
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