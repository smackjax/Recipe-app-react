import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
import DisplayNameInput from '../../_inputs/display-name/display-name.component';

export default class NewUserDisplayName extends React.Component{
    // props.newUser
    // props.name
    // props.className
    state={
        invalid: false
    }

    handleChange(e){
        const isInvalid = !e.target.isValid;
        this.setState({invalid: isInvalid});
    }

    render(){
        return(
        <div className={this.props.className}>
            <Dropdown open={this.props.newUser}>
                <label className="login-input-label"><b>Display name*</b></label>
                <DisplayNameInput
                onChange={this.handleChange.bind(this)}
                required={this.props.newUser}
                disabled={!this.props.newUser}
                placeholder="Ms Stewart"
                name={this.props.name || "loginDisplayName"}
                className="form-control login-input"/>
            </Dropdown>
        </div>
        
        )
    }
}