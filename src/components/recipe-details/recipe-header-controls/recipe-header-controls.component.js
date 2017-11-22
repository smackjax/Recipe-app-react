import React from 'react' ;
import IconBadge from '../../_icon-badge/icon-badge.component';
import {Link} from 'react-router-dom';
import './recipe-header-controls.style.css';
export default (props)=>{
    // props.isMine
    // props.editing
    // props.userInfo
    // props.handleEdit
    // props.handleSave
    // props.handleCancel
    // props.handleDelete
    
    return (
        <div className="recipe-header-controls">
            <IconBadge
            iconType={props.recipeType} 
            className="offset-3 col-6 col-sm-2 mb-2"/> 
            
            {props.editing ?
            <EditingBtns {...props} />
            : props.isMine ? 
            <NotEditingBtns {...props} />
            : 
            // If not owner, show link to recipe owner
            <Link
            to={"/friends/" + props.userInfo.username}
            >
                {props.userInfo.username} 
            </Link>
            }
            <ConfirmDeleteModal />
        </div>  
    )
}