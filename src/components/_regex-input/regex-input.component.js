import React from 'react';

export default (props)=>{
    // spreads all props into returned input
    // if props.onChange, passes event to props.onChange
    // Changes border to red or gray if invalid or valid
    // e.target.isValid will be a bool based on regex pattern(if passed in)
        // or based solely on trimmed input not being blank

    // ? props.regex
    // ? props.reverseRegex
    // ? props.onChange()
    
    const handleInputChange = (e)=>{
        const txt = e.target.value;

        const valid = txt.trim() !== "" ? // If input value trimmed
            props.regex ? // If normal regex pattern passed in
                props.regex.test(txt) : // Return result of regex match
                    props.reverseRegex ? // If regex to be reversed passed in
                        !props.reverseRegex.test(txt) : // Return the opposite result of regex
                    true :// If no regex and not blank, is valid
                         false; // If trimmed input is blank, it's not valid
        e.target.isValid = valid;
        e.target.isBlank = txt.trim() === "";
        // Always passes event back onChange callback
        if(!valid){
             e.target.style.borderColor = "#dc3545";
        } else {
            e.target.style.borderColor = "#ced4da";
        }
        if(props.onChange){
           props.onChange(e);
        }
     }

    const inputProps = { ...props };
    // Delete custom props
    delete inputProps.regex;
    delete inputProps.reverseRegex;

    return (
        <input {...inputProps} onChange={handleInputChange}/>
    )  

}