import React from 'react';
import {withRouter} from 'react-router-dom';
import NotEditing from './not-editing.component';
import Editing from './editing.component';

import './recipe-details-header.style.css';

// If recipe is new(props.isNew), 'cancel' redirects to '/recipe-dash'
export default withRouter((props)=>{
    // props.editing

    // props.isNew
    // props.handleCancel             
    // props.handleSave
    // props.newRecipeId
    
    // props.canEdit
    // props.handleEdit
    // props.handleDelete

    if(props.editing){
        return (
            <Editing 
            {...props} />
        )
    } else {
        return (
            <NotEditing 
            {...props}
            />
        )
    }
    
});
