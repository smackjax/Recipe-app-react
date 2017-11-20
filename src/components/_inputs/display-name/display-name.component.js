import React from 'react';
import CustomInput from '../../_regex-input/regex-input.component';

// Just an input with some predefined rules 
// import this instead of using standard 'input' 
// enforces the same rules throughout the app
export default (props)=>(
    <CustomInput type="text"
    {...props}
    placeholder={props.placeholder || "Display name"}  
    maxLength="20"
    name={props.name || "displayNameInput"}
    className={"form-control display-name-input " + (props.className || "")}/>
)
