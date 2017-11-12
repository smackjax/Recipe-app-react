import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
import MainPassword from './main-password/main-password.component';
import ConfirmPassword from './password-confirm/password-confirm.component';

export default class PasswordInputGroups extends React.Component {
    // props.newUser
    // props.mainPassName
    // props.confirmPassName

    state={
        mainPasswordValue: "",
        confirmPasswordVal: "",
        mainPassValid: null,
        passwordsMatch: null
    }
    componentRecieveProps(newProps){
        if(newProps.newUser){
            this.setState({
                confirmPasswordVal: "",
                passwordsMatch: null,
                mainPassValid: null
            });
        }
    }
    handleMainPasswordChange(e){
        this.setState({
            mainPasswordValue: e.target.value,
            mainPassValid: e.target.isValid
        });
    }
    handleConfirmPassChange(e){ 
        const confirmVal = e.target.value;

        const passMatch = (confirmVal === this.state.mainPasswordValue);
        this.setState({passwordsMatch: passMatch});
    }

    render(){

        return (
            <div className={this.props.className}>
                <MainPassword 
                name={this.props.mainPassName}
                onChange={this.handleMainPasswordChange.bind(this)} />
                
                {/* error msg for main password */}
                <Dropdown open={this.state.mainPassValid !== null && !this.state.mainPassValid }>
                    <div className="alert alert-danger">
                        Can't be blank. No spaces. 
                        <br />Min: 6 Max: 20
                    </div>
                </Dropdown>

                <Dropdown open={this.props.newUser}>
                    <ConfirmPassword
                    newUser={this.props.newUser}
                    name={this.props.confirmPassName}
                    disabled={!this.state.mainPassValid}
                    onChange={this.handleConfirmPassChange.bind(this)} />
                </Dropdown>

                <Dropdown open={this.state.passwordsMatch !== null && !this.state.passwordsMatch && this.props.newUser }>
                    <div className="alert alert-danger">
                        <i className="fa fa-times"></i> Passwords don't match
                    </div>
                </Dropdown>
                <Dropdown open={this.state.passwordsMatch !== null && this.state.passwordsMatch }>
                    <div className="alert alert-success">
                        <i className="fa fa-thumbs-up"></i> Passwords match 
                    </div>
                </Dropdown>
            </div>
        )
    }
}
