import React from 'react';
import {withRouter} from 'react-router-dom';

// Components
import SettingsNav from '../_main-nav/main-nav.component';

import LogoutBtn from './logout-btn/logout-btn.component';
import ConfirmLogoutModal from './logout-confirm-modal/logout-confirm-modal.component';
import CurrentInfo from './current-user-info/current-user-info.component';
import UpdateUserInfo from './update-user-info/update-user-info.component';



// Style
import "./settings.style.css";

export default withRouter((props)=>{
    // props.history(from withRouter)
    // props.userInfo
    // props.token

    // props.updateUsername
    // props.updateDisplayName
    // props.updateEmail


    const handleLogout =()=>{
        props.logout();
        props.history.push('/recipe-dash');
    }

    return (
    <div>
        <SettingsNav />
        <div className="container settings-page">
            <LogoutBtn />
            <ConfirmLogoutModal 
            logout={handleLogout}/>

            <CurrentInfo 
            userInfo={props.userInfo}
            />
            <hr/>
        </div>
        
        <UpdateUserInfo  {...props} /> 

    </div>
    )
});