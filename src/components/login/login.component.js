import React from 'react';

import { createNewUser, loginExistingUser} from '../../_data/serverData';

import HeaderInfo from './header-info/header-info.component';
import UsernameInput from './username-input/username-input.component';
import DisplayNameInput from './display-name-input/display-name-input.component';
import EmailInput from './email-input/email-input.component';
import PasswordInputs from './both-password-inputs/both-pasword-inputs.component';

import LoginTypeBtns from './login-type-btns/login-type-btns.component';
import Logo from '../../_resources/logo.svg';
import './login.style.css';

export default class LoginComponent extends React.Component{
    // props.saveUserInfo(newVals)
    
    state={
        formElem: null,
        newUser: false,
        attemptingLogin: false,
        errorMsg: ""
    }

    // Switches between new and existing user logins
    switchUserLogin(){
        this.state.formElem.reset();
        const isNewUser = !this.state.newUser;
        this.setState({newUser: isNewUser});
    }

    setFormElem(formElem){
        if(!this.state.formElem){
            this.setState({formElem})
        }
        
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

            // Retrieve user info from result
            const userInfo = signInResult.data;
            this.setState({
                // switch off 'signing in' flag
                attemptingLogin: false, 
                errorMsg: ""
            }, ()=>{
                // prop function sets data state in main app(this component's parent)
                this.props.saveUserInfo(userInfo);
            });
        } catch(e){
            // Catches sign in problems
            console.log('Sign in error: ', e);
            this.setState({
                attemptingLogin: false,
                errorMsg: 'Problem logging in. Please check your username and password.'
            });
        }
    }

    render(){
        const inputMT = this.state.newUser ?
            " mt-3 " : "";
        return (
            <div className="login-existing-user-page">
                <div className="login-logo-wrapper">
                    <img src={Logo} alt="Incooknito Kitchen" className="login-logo-img" />
                </div>

                <HeaderInfo
                newUser={this.state.newUser} 
                errorMsg={this.state.errorMsg}
                attemptingLogin={this.state.attemptingLogin}
                loginSuccess={this.state.loginSuccess}
                loginFail={this.state.loginFail}
                />
                
                <form
                ref={this.setFormElem.bind(this)}
                onSubmit={this.handleSubmit.bind(this)} 
                autoComplete="off">
                    <div className="login-form-content-wrapper">

                        <UsernameInput
                        newUser={this.state.newUser}
                        name="username"
                        className="login-input-group mt-2"/>

                        <EmailInput 
                        newUser={this.state.newUser}
                        name="email"
                        className={"login-input-group" + inputMT}
                        />
                    
                        <DisplayNameInput 
                        newUser={this.state.newUser} 
                        name="displayName"
                        className={"login-input-group" + inputMT} />
    
                        <PasswordInputs 
                        newUser={this.state.newUser}
                        mainPassName="password"
                        confirmPassName="confirmPassword"
                        className={"login-input-group" + inputMT} />

                        <div className="login-form-btns-wrapper">
                            <input 
                            type="reset"
                            value="Clear" 
                            className="btn btn-danger login-form-btn login-reset-btn" />
                            
                            <input 
                            type="submit" 
                            value={this.state.newUser ? "Create" : "Login"}
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