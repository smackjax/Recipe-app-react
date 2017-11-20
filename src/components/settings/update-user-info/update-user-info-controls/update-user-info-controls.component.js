import React from 'react';

import UsernameFormInput from './update-username/update-username.component';
import EmailInputBlock from './update-email/update-email.component';
import ChangePassword from './change-password/change-password.component';
import DisplayNameInputBlock from './update-display-name/update-display-name.component';
import DeleteAccountBtn from './delete-account-btn/delete-account-btn.component';
import DeleteAccountModal from './delete-account-modal/delete-account-modal.component';

export default (props)=>{
    // props.password(from parent)
    // props.updatePassword
    /// {...props} from settings

    return(
        <div className={" " + props.className}>

            <UsernameFormInput 
            placeholder={props.userInfo.username}
            password={props.password}
            token={props.token}
            onSuccess={props.updateUsername}
            />

    
            <DisplayNameInputBlock
            placeholder={props.userInfo.displayName}
            password={props.password}
            token={props.token}
            onSuccess={props.updateDisplayName}  />

            <EmailInputBlock 
            placeholder={props.userInfo.email}
            password={props.password}
            token={props.token}
            onSuccess={props.updateEmail}
            />

            <hr />
            
            <ChangePassword
            password={props.password}
            token={props.token}
            onSubmit={props.updatePassword} 
            onSuccess={props.updatePassword}/>

            <hr />

            <DeleteAccountBtn />
            <DeleteAccountModal
            token={props.token}
            logout={props.logout}
            />
        </div>
    )
    
}