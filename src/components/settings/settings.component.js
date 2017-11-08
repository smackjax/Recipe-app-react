import React from 'react';
import {withRouter} from 'react-router-dom';

// Components
import SettingsNav from '../_main-nav/main-nav.component';
import LogoutBtn from './logout-btn/logout-btn.component';
import ChangeUsername from './change-username/change-username.component';
import ChangePassword from './change-password/change-password.component';
import ChangeDisplayName from './change-display-name/change-display-name.component';
import DeleteAccountBtn from './delete-account-btn/delete-account-btn.component';

// Style
import "./settings.style.css";

export default withRouter((props)=>{
    // props.history(from withRouter)

    // props.logout
    // props.username
    // props.displayName
    // props.token

    const handleLogout =()=>{
        console.log("Logout run");
        props.logout();
        props.history.push('/recipe-dash');
    }

    const handleUsernameChange=(newUsername)=>{
        if(newUsername === false){
            console.log('invalid');
        } else {
            console.log(newUsername);
        }
    }
    const handleDisplayNameChange=(newDisplayName)=>{
        console.log('TODO: ', newDisplayName);
    }
    const handlePasswordChange=(newPassword)=>{
        console.log('TODO: ', newPassword);
    }
    return (
    <div>
        <SettingsNav />
        <div className="container-fluid settings-page">
            
            <LogoutBtn 
            logout={handleLogout}/>
            
            <hr/>

            <ChangeUsername
            onSubmit={handleUsernameChange}
            placeholder={props.username}
            token={props.token}
            name='username'
            />
            
            <ChangeDisplayName 
            placeholder={props.displayName}
            token={props.token}
            onSubmit={handleDisplayNameChange}/>

            <hr />
            
            <ChangePassword
            token={props.token}
            onSubmit={handlePasswordChange} />

            <hr />

            <DeleteAccountBtn 
            token={props.token}
            logout={handleLogout} />
        </div>
    </div>
    )
});