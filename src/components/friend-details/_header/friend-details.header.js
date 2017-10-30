import React from 'react';
import BackBtn from '../../_back-btn/back-btn.component';
import './friend-details-header.style.css';

export default (props)=>{
    // props.history
    const fakeGoback = ()=>{
        console.log('Tried to go back');
    }
    
    return (
        <div className="friend-details-header bg-nav-gray">
            <BackBtn 
            onClick={props.history.goBack}/>
        </div>
    )
}