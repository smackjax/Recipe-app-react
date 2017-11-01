import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
import SkxInput from '../../_input-not-blank/input-not-blank.component';

export default class DisplayNameInput extends React.Component{
    // props.newUser
    // props.setReady(inputName, bool)
    // props.errors
    // props.className
    state={
        invalid: false
    }

    handleChange(e){
        // Sets this state first to ensure correct outer dropdown height
        const inputName = e.target.name;
        const isValid = e.target.isValid;
        this.setState({invalid: !isValid},
        ()=>{
            this.props.setReady(inputName, isValid);
        });        
    }

    render(){
        return(
        <div className={this.props.className}>
            <Dropdown open={this.props.newUser}>
                <label className="login-input-label">Display name*</label>
                <SkxInput
                type="text"
                onChange={this.handleChange.bind(this)}
                maxLength="20"
                name={this.props.name || "loginDisplayName"}
                className="form-control login-input"/>
            </Dropdown>
            <Dropdown open={this.state.invalid}>
                <div className="alert alert-danger">
                Cannot be blank
                </div>
            </Dropdown>
        </div>
        
        )
    }
}