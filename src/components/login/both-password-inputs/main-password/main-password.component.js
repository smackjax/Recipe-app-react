import React from 'react';
import PasswordInput from '../../../_inputs/password/password-input.component';

export default (props)=>{
    // props.onChange
    return (
        <div className="login-input-group">
            <label className="login-input-label"><b>Password*</b></label>
            <PasswordInput
            onChange={props.onChange}
            required
            name={props.name || "loginPassword"}
            className="form-control login-input" />
        </div>
    )
}