import React from 'react';

export default (props)=>{
    // props.ovenTemp
    // props.cookTime
    // props.editing
    // props.setState
    
    // setState on these refers to PARENT
    // (which is the main recipe object)
    const handleOvenTemp=(e)=>{
        const newTemp = e.target.value.trim();
        props.setState({ ovenTemp: newTemp });
    }
    const handleCookTime=(e)=>{
        const newTime = e.target.value.trim();
        props.setState({ cookTime: newTime });
    }
    return(
        <div className="row recipe-info">
            
            { // ovenTemp
                props.editing ? // Is editing
                <div className="row">
                    <label htmlFor="ovenTempInput" 
                    className="offset-1 col-5 col-form-label">
                        Oven Temp: </label>
                    <div className="col-5">
                        <input 
                        onChange={handleOvenTemp}
                        type="text" 
                        className="form-control" 
                        id="ovenTempInput"  
                        maxLength="3"
                        value={props.ovenTemp}
                        placeholder="360 deg" />
                    </div>
                </div>
                : // Is not editing
                props.ovenTemp && ( // If oven Temp is set
                <div className="offset-1 col-10">
                   Oven Temp: {props.ovenTemp}
                </div>
                ) 
            }
            { // Cook time
                props.editing ? // Is editing
                <div className="row">
                    <label htmlFor="cookTimeInput" 
                    className="offset-1 col-5 col-form-label">
                        Cook time: </label>
                    <div className="col-5">
                        <input 
                        onChange={handleCookTime}
                        type="text" 
                        className="form-control" 
                        id="ovenTempInput"  
                        maxLength="15"
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
        </div>
    )
}