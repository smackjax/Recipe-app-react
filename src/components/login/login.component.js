import React from 'react';
import { Link } from 'react-router-dom';
import { createNewUser, loginExistingUser} from '../../_data/serverData';

import Dropdown from '../_dropdown/dropdown.component';
import SkxInput from '../_input-not-blank/input-not-blank.component';
import UsernameInput from './username-input/username-input.component';
import DisplayNameInput from './display-name-input/display-name-input.component';

import SwitchUserTypeBtn from './switch-user-type-btn/switch-user-type-btn.component';

import Logo from '../../_resources/logo.svg';
import './login.style.css';


function handleNewUser(form){
    const newUsername = "";
    const newDisplayName = "";
    const newPassword = "";
    const confirmPassword = "";

    if(newPassword !== confirmPassword){
        this.setState({passwordMismatch: "Passwords don't match"});
    }
    
    createNewUser()
}
function handleExisting(form){

}

export default class LoginComponent extends React.Component{
    // props.saveUserInfo(newVals)
    
    state={
        loginFail: false,
        newUser: true,

        checkingUsername: false,
        usernameAvailable: false,
        validUsername: true,
        
        formStatus: {
            // usernameInput
        }
        
    }

    // Switches between new and existing user logins
    switchUserLogin(){
        const isNewUser = !this.state.newUser;
        this.setState({newUser: isNewUser});
    }

    handleSubmit(e){
        // Handles both new and existing user sign in
        e.preventDefault();
        const formElem = e.target;
        let signInResult;
        if(this.state.newUser){
           signInResult = handleNewUser(formElem);
        } else {
            signInResult = handleExisting(formElem);
        }

        if(signInResult !== false) {
            // Set app userInfo with sign in data
        } else {
            this.setState({
                errorMsg: 'Problem logging in. Please try again later.'
            });
        }
    }

    setReady(inputName, readyStatus){
        if(this.state.formStatus[inputName] !== readyStatus){
            const totalStatus = {
                ...this.state.formStatus,
                [inputName] : readyStatus
            }
            this.setState(totalStatus);
        }
    }


    render(){
        return (
            <div className="login-existing-user-page">
                <div className="login-logo-wrapper">
                    <img src={Logo} className="login-logo-img" />
                </div>
                <Dropdown open={this.state.newUser}>
                    <h3 className="welcome-text-header">Hello! Please create an account.</h3>     
                </Dropdown>
                <Dropdown open={!this.state.newUser}>
                    <h3 className="welcome-text-header">Welcome back!</h3>     
                </Dropdown>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="login-form-content-wrapper">

                        <UsernameInput
                        setReady={this.setReady.bind(this)}
                        className="login-input-group"/>


                        <DisplayNameInput 
                        newUser={this.state.newUser} 
                        setReady={this.setReady.bind(this) } 
                        className="login-input-group" />

    

                        <div className="login-input-group">
                            <label className="login-input-label">Password*</label>
                            <SkxInput 
                            required
                            type="password"
                            name="loginPass"
                            className="form-control login-input"/>
                        </div>

                        <Dropdown open={this.state.newUser}>
                            <div className="login-input-group">
                                <label className="login-input-label">Confirm Password*</label>
                                <SkxInput 
                                type="password"
                                name="loginPassConfirm"
                                className="form-control login-input"/>
                            </div>
                        </Dropdown>
                        <div className="login-form-btns-wrapper">
                            <input 
                            type="reset"
                            value="Clear" 
                            className="btn btn-danger login-form-btn login-reset-btn" />
                            
                            <input 
                            type="submit" 
                            value="Login"
                            className="btn bg-blue login-form-btn  login-submit-btn"/>
                        </div>
                    </div>
                </form>

                <div className="other-options-wrapper">
                    <Dropdown 
                    open={!this.state.newUser}>
                        <SwitchUserTypeBtn
                        onClick={this.switchUserLogin.bind(this)} >
                            New user
                        </SwitchUserTypeBtn>
                    </Dropdown>

                    <Dropdown 
                    open={this.state.newUser}>
                        <SwitchUserTypeBtn
                        onClick={this.switchUserLogin.bind(this)} >
                            Already have an account 
                        </SwitchUserTypeBtn>
                    </Dropdown>
                </div>
                
            </div>
        )
    }
}