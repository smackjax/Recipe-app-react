import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import IconBadge from '../../_icon-badge/icon-badge.component';
import ConfirmDeleteModal from './confirmDelete.modal';
import "./not-editing.style.css";


const notEditingHeader = (props)=>{
    // props.userInfo
    // props.canEdit
    // props.handleDelete
    // props.handleEdit
    // props.recipeType

    // Redirects to dash on recipe delete
    const handleDelete = ()=>{
        props.handleDelete();
        props.history.goBack();
    }
    const username = props.userInfo.username;
    return (
        <div className="recipe-controls">
                
            <IconBadge
            iconType={props.recipeType} 
            className="recipe-controls-item"/> 
            
            {props.canEdit && (
                <button 
                data-toggle="modal" data-target="#deleteModal"
                className="btn btn-danger not-editing-btn">
                    <i className="fa fa-trash"></i>
                </button>    
            )}

            {props.canEdit && (
                <button
                onClick={props.handleEdit}
                className="btn btn-info not-editing-btn">
                    <i className="fa fa-pencil"></i>
                </button>
            )}


            { // Display name mini-card 
                !props.canEdit && 
                username  ?
                <Link
                to={'/friends/'+username}
                className="owner-display-name btn-friend text-light" 
                >   
                <i className="fa fa-user"></i> &nbsp;
                    {username}
                </Link> : ""
            }

          
            <ConfirmDeleteModal
            handleDelete={handleDelete}
            />
            
        </div>
    )
}
export default withRouter(notEditingHeader);