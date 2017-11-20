import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';

export default (props)=>{
    // props.newUser
    // props.errorMsg
    // props.attemptingLogin
    // props.loginSuccess
    // props.loginFail
    const showWelcomeMsg = (!props.attemptingLogin && !props.errorMsg);
    const showError = (props.errorMsg && !props.attemptingLogin);

   return( 
    <div>
            <Dropdown open={props.attemptingLogin}>
                <div style={{display: "flex", flexDirection: "column"}}>
                <i style={{alignSelf: "center", fontSize: "2rem", margin: "5px 0px"}} className="fa fa-spinner animated-loading-spin"></i>
                </div>
            </Dropdown>

            <Dropdown open={showError}>
                <div className="alert alert-danger">
                    Sorry! There was a problem signing in. Please check your info and try again.
                </div>
            </Dropdown>        

            <Dropdown open={showWelcomeMsg && props.newUser}>
                <h3 className="welcome-text-header">Hello! Please create an account.</h3>     
            </Dropdown>

            <Dropdown open={showWelcomeMsg && !props.newUser }>
                <h3 className="welcome-text-header">Welcome back!</h3>     
            </Dropdown> 
        </div>
   )
}
