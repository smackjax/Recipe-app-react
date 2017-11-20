import React from 'react';
import {Link} from 'react-router-dom';
import './remove-friend-btn.style.css';

export default class RemoveFriendBtn extends React.Component{
    render(){
        return (
            <button
            data-toggle="modal" data-target="#confirmUnfollowModal"
            className={this.props.className}>
                Stop following
            </button>
        )
    }
    
}