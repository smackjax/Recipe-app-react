import React from 'react';
import './recipe-search.style.css';
export default (props)=>{
    return (
        <div className="recipe-search-input input-group">
             <span className="input-group-addon">
                 <i className="fa fa-search"></i>
             </span>
             <input type="text" 
             value={props.value}
             onChange={props.onChange}
             className="form-control" 
             placeholder="Search names" />
        </div>
    )
}