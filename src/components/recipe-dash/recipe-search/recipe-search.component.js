import React from 'react';
import './recipe-search.style.css';

export default (props)=>{
    const handleChange=(e)=>{
        props.onChange(e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return (
        <form 
        className="row form-group recipe-searchbar" 
        onSubmit={handleSubmit}>
            <div className="col-12 input-group">
                <input type="text" 
                onChange={handleChange}
                className="form-control" 
                placeholder="Recipe names containing..." />
                <span className="input-group-addon">
                    <i className="fa fa-search"></i>
                </span>
            </div>
        </form>
    )
}