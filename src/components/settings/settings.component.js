import React from 'react';


// Components
import SettingsNav from '../_main-nav/main-nav.component';
import LogoutBtn from './logout-btn/logout-btn.component';
import ChangeUsername from './change-username/change-username.component';
import ChangePassword from './change-password/change-password.component';
import ChangeDisplayName from './change-display-name/change-display-name.component';
import DeleteAccountBtn from './delete-account-btn/delete-account-btn.component';

// Style
import "./settings.style.css";

export default (props)=>{
    // props.logout
    // props.userId
    // props.userName

    const handleUsernameChange=(newUsername)=>{
        if(newUsername === false){
            console.log('invalid');
        } else {
            console.log(newUsername);
        }
    }
    const handleDisplayNameChange=(newDisplayName)=>{
        console.log('NEW DISPLAY NAME: ', newDisplayName);
    }
    const handlePasswordChange=(newPassword)=>{
        console.log('NEW PASSWORD: ', newPassword);
    }
    return (
    <div>
        <SettingsNav />
        <div className="container-fluid settings-page">
            
            <LogoutBtn 
            logout={props.logout}/>

            <hr/>

            <ChangeUsername
            onSubmit={handleUsernameChange}
            placeholder={props.username}
            name='username'
            />
            
            <ChangeDisplayName 
            placeholder={props.displayName}
            onSubmit={handleDisplayNameChange}/>
            <hr />
            <ChangePassword 
            onSubmit={handlePasswordChange}
            />
            <hr />
            <DeleteAccountBtn />
        </div>
    </div>
    )
}