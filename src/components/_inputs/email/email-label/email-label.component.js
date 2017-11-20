import React from 'react';

export default (props)=>{
    // ?props.current
    const newProps = {...props};
    delete newProps.current;
    return (
        <label className="col-12"
        {...newProps}>
        Email
            {  props.current && <b>: {props.current}</b>} 
        </label>
    )
}