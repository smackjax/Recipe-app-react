import React from 'react';
import { Link } from 'react-router-dom';
import { createNewUser, loginExistingUser} from '../../_data/serverData';

import Dropdown from '../_dropdown/dropdown.component';
import SkxInput from '../_input-not-blank/input-not-blank.component';
import HeaderInfo from './header-info/header-info.component';
import UsernameInput from './username-input/username-input.component';
import DisplayNameInput from './display-name-input/display-name-input.component';
import EmailInput from './email-input/email-input.component';
import PasswordInputs from './both-password-inputs/both-pasword-inputs.component';

import LoginTypeBtns from './login-type-btns/login-type-btns.component';
import Logo from '../../_resources/logo.svg';
import './login.style.css';


function handleNewUser(formElem){
    
    const {username, displayName, email, password} = formElem.target;
    return ;
}
function handleExisting(form){

}

export default class LoginComponent extends React.Component{
    // props.saveUserInfo(newVals)
    
    state={
        newUser: false,
        attemptingLogin: false,

        errorMsg: ""
    }

    // Switches between new and existing user logins
    switchUserLogin(){
        const isNewUser = !this.state.newUser;
        this.setState({newUser: isNewUser});
    }

    async handleSubmit(e){
        // Handles both new and existing user sign in
        e.preventDefault();
        this.setState({attemptingLogin: true});
        
        const formElem = e.target;
        // Extract relevant values
        const {username, displayName, email, password} = formElem;
        
        // Server login/create functions return promises
        try{
            // Assigns result of appropriate server call
            let signInResult;
            if(this.state.newUser){
                signInResult = await createNewUser(
                    username.value, 
                    email.value, 
                    displayName.value, 
                    password.value );
            } else {
                signInResult = await loginExistingUser(
                    username.value,
                    password.value );
            } 
                
                    
            console.log("Server result: ", signInResult);
            this.setState({attemptingLogin: false});
        // Catches sign in problems
        } catch(e){
            this.setState({
                errorMsg: 'Problem logging in. Please try again later.'
            });
            console.log('Server error: ', e);
            this.setState({attemptingLogin: false});
        }
    }

    // TODO remove 'setReady' and rely on server for errors


    render(){
        return (
            <div className="login-existing-user-page">
                <div className="login-logo-wrapper">
                    <img src={Logo} className="login-logo-img" />
                </div>

                <HeaderInfo
                newUser={this.state.newUser} 
                errorMsg={this.state.errorMsg}
                attemptingLogin={this.state.attemptingLogin}
                loginSuccess={this.state.loginSuccess}
                loginFail={this.state.loginFail}
                />
                
                <form onSubmit={this.handleSubmit.bind(this)} 
                autoComplete="off">
                    <div className="login-form-content-wrapper">

                        <UsernameInput
                        newUser={this.state.newUser}
                        name="username"
                        className="login-input-group"/>

                        <EmailInput 
                        newUser={this.state.newUser}
                        name="email"
                        className="login-input-group"
                        />
                    
                        <DisplayNameInput 
                        newUser={this.state.newUser} 
                        name="displayName"
                        className="login-input-group" />
    
                        <PasswordInputs 
                        newUser={this.state.newUser}
                        mainPassName="password"
                        confirmPassName="confirmPassword"
                        className="login-input-group" />

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

                <LoginTypeBtns 
                newUser={this.state.newUser}
                switchType={this.switchUserLogin.bind(this)}
                />
                
                
            </div>
        )
    }
}