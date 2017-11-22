import React from 'react';
import {Link} from 'react-router-dom';
import './editing.style.css';

export default (props)=>{
    // props.history
    // props.isNew
    // props.handleSave
    // props.handleCancel
    // props.newRecipeId

    const handleNewSave = ()=>{
        const newUrl = '/recipes/'+props.newRecipeId;
        props.history.replace(newUrl);
        props.handleSave();        
    }

    // Set save function 
    const currentSave = props.isNew ? 
        handleNewSave : props.handleSave;
    return(
        <div className="recipe-controls">

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

            <button 
            onClick={currentSave}
            className="btn bg-blue save-recipe-btn ">
                <i className="fa fa-check"></i> Save
            </button> 
            

        </div>
    )
}
