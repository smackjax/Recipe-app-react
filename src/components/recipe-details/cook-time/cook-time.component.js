import React from 'react';

export default (props)=>{
    // props.cookTime
    // props.editing
    // props.onChange

    return props.editing ? // Is editing
    <div className="row">
        <label htmlFor="cookTimeInput" 
        className="offset-1 col-5 col-form-label">
            Cook time: </label>
        <div className="col-5">
            <input 
            onChange={props.onChange}
            type="text" 
            className="form-control" 
            id="ovenTempInput"  
            maxLength="10"
            value={props.cookTime}
            placeholder="30 min" />
        </div>
    </div>
    : // Is not editing
    props.cookTime && ( // If cook time is set
    <div className="offset-1 col-10">
       Cook Time: {props.cookTime}
    </div>
    )
}