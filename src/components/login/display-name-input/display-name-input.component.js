import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
import SkxInput from '../../_input-not-blank/input-not-blank.component';

export default class DisplayNameInput extends React.Component{
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
                <label className="login-input-label">Display name* (What others see)</label>
                <SkxInput
                type="text"
                onChange={this.handleChange.bind(this)}
                maxLength="20"
                required={this.props.newUser}
                name={this.props.name || "loginDisplayName"}
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