import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
import MainPassword from './main-password/main-password.component';
import ConfirmPassword from './password-confirm/password-confirm.component';

export default class PasswordInputGroups extends React.Component {
    // props.newUser
    state={
        passwordsMatch: false
    }
    handleMainPasswordChange(e){

    }
    handleConfirmPassChange(e){

    }

    render(){
        return (
            <div className={this.props.className}>
                <MainPassword 
                onChange={this.handleMainPasswordChange.bind(this)} />
                <Dropdown open={this.props.newUser}>
                    <ConfirmPassword 
                    onChange={this.handleConfirmPassChange.bind(this)} />
                </Dropdown>
            </div>
        )
    }
}
