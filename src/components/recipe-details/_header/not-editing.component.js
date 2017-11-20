import React from 'react';
import {Link, withRouter} from 'react-router-dom';


import {MainNav, BackBtn} from '../../_main-nav/_components';
import ConfirmDeleteModal from './confirmDelete.modal';
import "./not-editing.style.css";


const notEditingHeader = (props)=>{
    // props.userInfo
    // props.canEdit
    // props.handleDelete
    // props.handleEdit

    // Redirects to dash on recipe delete
    const handleDelete = ()=>{
        props.handleDelete();
        props.history.goBack();
    }
    const displayName = props.userInfo.displayName;
    const username = props.userInfo.username;
    return (
        <MainNav>
                
            <BackBtn />
            
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


            { // Display name mini-card 
                !props.canEdit && 
                displayName  ?
                <Link
                to={'/friends/'+username}
                className="owner-display-name btn-friend text-light" 
                >   
                <i className="fa fa-user"></i> &nbsp;
                    {displayName}
                </Link> : ""
            }

          
            <ConfirmDeleteModal
            handleDelete={handleDelete}
            />
            
        </MainNav>
    )
}
export default withRouter(notEditingHeader);