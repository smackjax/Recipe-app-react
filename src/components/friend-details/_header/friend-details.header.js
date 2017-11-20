import React from 'react';
import {withRouter} from 'react-router-dom';

import {MainNav, BackBtn} from '../../_main-nav/_components';
import ConfirmUnfollowModal from './unfollow-confirm-modal/unfollow-confirm-modal.component';
import RemoveFriendBtn from './remove-friend-btn/remove-friend-btn.component';
import './friend-details-header.style.css';

export default withRouter((props)=>{
    // props.history
    // props.username
    // props.handleDelete

    const handleUnfollow=()=>{
        props.history.replace("/friends");
        props.handleDelete();
    }

    return (
        <MainNav>
            <BackBtn />
            <RemoveFriendBtn 
            className="btn btn-danger remove-friend-btn mr-auto ml-5"
            onClick={props.handleDelete}/>
            <ConfirmUnfollowModal 
            userName={props.username}
            handleUnfollow={handleUnfollow}
            />
        </MainNav>
    )
})
