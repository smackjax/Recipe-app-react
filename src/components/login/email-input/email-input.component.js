import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
import EmailInput from '../../_inputs/email/email-input.component';
export default class LoginEmailInput extends React.Component{
    // props.className
    // props.name
    // props.newUser

    state={
        invalid: null
    }

    handleChange(e){
        const isInvalid = !e.target.isValid;
        this.setState({invalid: isInvalid});
    }

    render(){
        return (
            <div className={this.props.className}>
                <Dropdown open={this.props.newUser}>
                    <label className="login-input-label"><b>Email*</b> (Not shared or visible)</label>
                    
                    <EmailInput
                    onChange={this.handleChange.bind(this)}
                    required={this.props.newUser}
                    disabled={!this.props.newUser}
                    placeholder="aStory@philadelphia"
                    name={this.props.name || "loginEmailInput"}
                    className="form-control login-input"/>

                </Dropdown>
                <Dropdown open={this.state.invalid}>
                    <div className="alert alert-danger">
                        Cannot be blank.
                    </div>
                </Dropdown>
            </div>
        )
    }
}
