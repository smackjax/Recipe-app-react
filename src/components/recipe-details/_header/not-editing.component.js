import React from 'react';
import {withRouter} from 'react-router-dom';

import BackBtn from '../../_back-btn/back-btn.component';
import ConfirmDeleteModal from './confirmDelete.modal';
import "./not-editing.style.css";


const notEditingHeader = (props)=>{
    // props.canEdit
    // props.handleDelete
    // props.handleEdit

    // Redirects to dash on recipe delete
    const handleDelete = ()=>{
        props.handleDelete();
        props.history.goBack();
    }

    return (
        <nav className="recipe-details-header not-editing">
            <div className="header-items-wrapper">
                
            <BackBtn 
            onClick={props.history.goBack}
            />
            
            {props.canEdit && (
                <button 
                data-toggle="modal" data-target="#deleteModal"
                className="btn btn-danger delete-recipe-btn">
                    <i className="fa fa-trash"></i>
                </button>    
            )}

            {props.canEdit && (
                <button
                onClick={props.handleEdit}
                className="btn btn-info edit-recipe-btn ">
                    <i className="fa fa-pencil"></i>
                </button>
            )}

          
            <ConfirmDeleteModal
            handleDelete={handleDelete}
            />
            </div>
        </nav>
    )
}
export default withRouter(notEditingHeader);