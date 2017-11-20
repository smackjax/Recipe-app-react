import React from 'react';

export default (props)=>{
    const newProps = {...props};

    return (
        <label className="col-12"
        {...newProps}>
        Password
            {  props.current && <b></b>} 
        </label>
    )
}