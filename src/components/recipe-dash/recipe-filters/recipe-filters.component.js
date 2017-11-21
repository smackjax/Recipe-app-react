import React from 'react';
import "./recipe-filter.style.css";
export default (props)=>{
    // props.onChange
    // activeFilters
    return (
        <div className="friend-filter-wrapper mb-2">
            <label className="form-check-label friend-filter">
                <input type="checkbox"
                checked={props.myRecipesSelected}
                value="myRecipes"
                onChange={props.onChange}
                className="form-check-input"
                />
                &nbsp;My recipes
            </label>
            <label className="form-check-label friend-filter">
                <input type="checkbox"
                checked={props.friendRecipesSelected}
                value="friendRecipes"
                onChange={props.onChange}
                className="form-check-input"
                />
                &nbsp; Following
            </label>
        </div>
    )
}