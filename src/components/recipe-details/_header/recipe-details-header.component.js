import React from 'react';

import NotEditing from './not-editing.component';
import Editing from './editing.component';

import './recipe-details-header.style.css';


export default (props)=>{
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
    
};
