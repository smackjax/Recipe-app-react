import React from 'react';
import CustomInput from '../../_regex-input/regex-input.component';

// Just an input with some predefined rules 
// import this instead of using standard 'input' 
// enforces the same rules throughout the app
export default (props)=>{
    return <CustomInput type="text"
    {...props}
    reverseRegex={/\W/}
    maxLength="20"
    name={props.name || "usernameInput"}
    className={"form-control username-input " + (props.className || "")}
    />
}
