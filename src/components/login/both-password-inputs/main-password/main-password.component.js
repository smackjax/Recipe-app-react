import React from 'react';
import SkxInput from '../../../_input-not-blank/input-not-blank.component';

export default (props)=>{
    // props.onChange
    return (
        <div className="login-input-group">
            <label className="login-input-label">Password*</label>
            <SkxInput
            type="password"
            regex={/^\S*$/}
            onChange={props.onChange}
            maxLength="20"
            autoComplete="off"
            required
            name={props.name || "loginPassword"}
            className="form-control login-input" />
        </div>
    )
}