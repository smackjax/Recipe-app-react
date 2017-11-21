import React from 'react';
import UnfollowBtn from './unfollow-btn/unfollow-btn.component';
import UnfollowConfirmModal from './unfollow-confirm-modal/unfollow-confirm-modal.component';
import './info-block.style.css';

export default (props)=>{
    // props.profilePic(future release) TODO
    // props.displayName
    // props.username
    return (
        <div className="friend-info-block">
            <div className="friend-profile-pic-wrapper text-blue border-blue bg-light">
                <i className="fa fa-user"></i>
            </div>
            <div className="friend-name-blocks-wrapper">
                <div className="friend-name-block">
                    <div className="friend-name-block">
                        <div className="friend-name-desc">Username</div>
                        <div className="friend-name-value">{ props.username }</div>
                    </div>

                </div>
                <div className="friend-name-block">
                    <div className="friend-name-desc">Display Name</div>
                    <div className="friend-name-value">{ props.displayName }</div>
                    <UnfollowBtn 
                    className="btn btn-secondary col-12 mt-2"
                    />
                </div>
            </div>
            <UnfollowConfirmModal 
            handleUnfollow={props.handleUnfollow}
            />
        </div>
    )
}