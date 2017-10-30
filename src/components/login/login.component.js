import React from 'react';
import { Link } from 'react-router-dom';
import { createNewUser, loginExistingUser } from '../../_data/serverData';
import Dropdown from '../_dropdown/dropdown.component';
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
        newUser: false,


        checkingUsername: true,
        usernameAvailable: true,

        errors: {
            passwordsMatch: true,

        }
    }
    switchUserLogin(){
        const isNewUser = !this.state.newUser;
        this.setState({newUser: isNewUser});
    }

    // Checks if username is available from server
    checkUsernameAvailability(usernameString){
        // TODO (maybe use settimeout to avoid server stress)
        const result = true;
        this.setState({usernameAvailable: result});
    }

    handleSubmit(e){
        // Handles new user and existing sign in
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

    render(){
        return (
            <div className="login-existing-user-page">
                <div className="login-logo-wrapper">
                    <img src={Logo} className="login-logo-img" />
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="login-form-content-wrapper">
                        <div className="login-input-group">
                            
                            <label className="login-input-label">Username* 
                                <span style={{display: this.state.newUser ? 'initial' : 'none'}} className="username-check-result">
                                    
                                    {this.state.checkingUsername ? 
                                        <i className="fa fa-spinner"></i> :
                                            this.state.usernameAvailable ?
                                                <i className="text-success fa fa-thumbs-up"></i> : 
                                                    <i className="text-danger fa fa-thumbs-down"></i>
                                    }
                                </span>
                            </label>
                            <input type="text"
                            required
                            name="loginUsername"
                            className="form-control login-input"/>
                        </div>
                        
                        <Dropdown open={this.state.newUser} >
                            <div className="login-input-group">
                                <label className="login-input-label">Display name*</label>
                                <input type="text"
                                name="loginDisplayName"
                                className="form-control login-input"/>
                            </div>
                        </Dropdown>

                        <div className="login-input-group">
                            <label className="login-input-label">Password*</label>
                            <input 
                            required
                            type="password"
                            name="loginPass"
                            className="form-control login-input"/>
                        </div>
                        <Dropdown open={this.state.newUser}>
                            <div className="login-input-group">
                                <label className="login-input-label">Confirm Password*</label>
                                <input 
                                type="password"
                                name="loginPassConfirm"
                                className="form-control login-input"/>
                            </div>
                        </Dropdown>

                        <input type="submit" className="btn login-submit-btn"/>
                    </div>
                </form>

                <div className="other-options-wrapper">
                    <Dropdown 
                    open={!this.state.newUser}>
                        <button
                        onClick={this.switchUserLogin.bind(this)}
                        className="btn" >
                            New user
                        </button>
                    </Dropdown>

                    <Dropdown 
                    open={this.state.newUser}>
                        <button
                        onClick={this.switchUserLogin.bind(this)}
                        className="btn" >
                            Existing user
                        </button>
                    </Dropdown>
                </div>
                
            </div>
        )
    }
}