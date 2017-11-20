import React from 'react';
import IconBadge from '../../_icon-badge/icon-badge.component';
import './name.css';

export default (props)=>{
    // props.invalid
    // props.value
    // props.recipeType
    // props.editing
    // props.setState
    const invalidClass = props.invalid ? " border-danger" : "";
    return (
        props.editing ?
        <div className="row mb-3">
            
            <div className="offset-sm-1 col-sm-10">
                <input 
                placeholder={props.placeholder}
                type='text' 
                onChange={props.onChange} 
                value={props.value}
                className={"form-control recipe-name-input" + invalidClass}/>
            </div>
        </div> :
        // If not editing
        <div className="row recipe-header mb-3">
            <IconBadge
            iconType={props.recipeType} 
            className="offset-3 col-6 col-sm-2 mb-2"/> 
            <h4 className="col-sm-10"><b>{props.value}</b></h4>

        </div>  
        
    )
}