import React from 'react';

export default (props)=>{
    // props.name
    // props.editing
    // props.setState

    const handleNameEdit=(e)=>{
        const newName = e.target.value.trim();
        props.setState({name: newName})
    }

    return (
        props.editing ?
        <div className="row mb-3">
            <div className="col-12">
                <input 
                type='text' 
                onChange={handleNameEdit} 
                defaultValue={props.name}
                className="form-control"/>
            </div>
        </div>
        : // If not editing
        <div className="row recipe-header mb-3">
            <h4 className="col-12"><b>{props.name}</b></h4>
        </div>  
        
    )
}