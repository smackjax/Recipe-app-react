import React from 'react';
import { checkPasswordValid } from '../../../_data/serverData';

import UpdateUserInfoControls from './update-user-info-controls/update-user-info-controls.component';
import CheckUserPassword from './check-user-password/check-user-password.component';

import "./update-user-info.style.css";

export default class UpdateUserInfo extends React.Component{
    // props.token
    // (props are passed to controls)
    state={ 
        checkingPassword: null, 
        passwordCheckFailed: null,
        password: null }

    async handlePasswordCheck(e){
        e.preventDefault()
        const pass = e.target.passwordCheck.value;
        try{
            await checkPasswordValid(this.props.token, pass);
            this.setState({
                checkingPassword: false, 
                passwordCheckFailed: false,
                password: pass
            })
        } catch (e) {
            this.setState({
                checkingPassword: false,
                passwordCheckFailed: true
            })
        }  
    }

    // Keeps password in sync after update
    updatePassword(password){
        this.setState({ password });
    }

    render(){

        if(this.state.password === null){
            return (
                <div className="settings-info-controls-wrapper">
                    <CheckUserPassword 
                    name="passwordCheck"
                    onSubmit={this.handlePasswordCheck.bind(this)}
                    />
                </div>
            )
        } else {
            return (
                <UpdateUserInfoControls
                className="settings-info-controls-wrapper"
                password={this.state.password}
                updatePassword={this.updatePassword.bind(this)}
                {...this.props} />
            )
        }
    }
}