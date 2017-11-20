import React from 'react';

export default (props)=>{
    // props.editing
    // props.ovenTemp
    
    
    // If editing
    return props.editing ? (
        <div className="row">
            <label htmlFor="ovenTempInput" 
            className="offset-1 col-5 col-form-label">
                Oven Temp: </label>
            <div className="col-5">
                <input 
                onChange={props.onChange}
                type="text" 
                className="form-control" 
                id="ovenTempInput"  
                maxLength="10"
                value={props.ovenTemp}
                placeholder="360 deg" />
            </div>
        </div>
    )
    // If oven Temp is set
    : props.ovenTemp ? (
        <div className="offset-1 col-10">
            Oven Temp: {props.ovenTemp}
        </div>
    ) : ""
    
}