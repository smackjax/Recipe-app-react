import React from 'react';
import "./recipe-filter.style.css";
export default (props)=>{
    // props.onChange
    // activeFilters
    return (
        <div className="friend-filter-wrapper">
            <label className="form-check-label friend-filter">
                <input type="checkbox"
                checked={props.activeFilters.includes('personal')}
                value="personal"
                onChange={props.onChange}
                className="form-check-input"
                />
                &nbsp;My recipes
            </label>
            <label className="form-check-label friend-filter">
                <input type="checkbox"
                checked={props.activeFilters.includes('following')}
                value="following"
                onChange={props.onChange}
                className="form-check-input"
                />
                &nbsp; Following
            </label>
        </div>
    )
}