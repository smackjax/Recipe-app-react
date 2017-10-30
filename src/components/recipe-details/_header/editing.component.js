import React from 'react';
import {Link} from 'react-router-dom';
import './editing.style.css';
export default (props)=>{
    // props.isNew
    // props.handleSave
    // props.handleCancel
    // props.newRecipeId

    return(
        <nav className="recipe-details-header editing">

                {// If recipe is new, display link to dash instead of just cancel
                props.isNew ? 
                    <Link 
                    to="/recipe-dash"
                    className="btn cancel-recipe-btn">
                        <i className="fa fa-times"></i> Cancel
                    </Link> :
                    <button 
                    onClick={props.handleCancel}
                    className="btn cancel-recipe-btn ">
                        <i className="fa fa-times"></i> Cancel
                    </button>
                }

                <Link 
                onClick={props.handleSave}
                to={'/recipes/'+props.newRecipeId}
                className="btn bg-blue save-recipe-btn ">
                    <i className="fa fa-check"></i> Save
                </Link>

        </nav>
    )
}
