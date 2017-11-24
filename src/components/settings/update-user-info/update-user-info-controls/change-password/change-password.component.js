import React from 'react';
import { updatePassword } from '../../../../../_data/serverData';

import Dropdown from '../../../../_dropdown/dropdown.component';
import LoadingSpinner from '../../../../_loading-spinner/loading-spinner.component';
import PasswordInput from '../../../../_inputs/password/password-input.component';

export default class NewPassword extends React.Component{
    // props.password (meaning current password)
    // props.onSubmit 

    state={
        updating: false,
        updateResult: null,

        errorMsg: '',
        passwordsMatch: false,
        passIsValid: false,
        primary: '',
        secondary: ''
    }



    handleChange(e){
    
        const {isValid} = e.target;
        const primary = e.target.value;
        const passwordsMatch = (this.state.secondary === primary);
        const errorMsg = isValid ? "" :
            "Must be at least 6 characters";
        this.setState({
            updateResult: null,
            errorMsg,
            passwordsMatch,
            primary,
            passIsValid: isValid
        });
    }

    handleConfirmChange(e){
        const secondary = e.target.value;
        const passwordsMatch = (secondary === this.state.primary);
        const errorMsg = passwordsMatch ?
           "" : "Passwords must match";
        this.setState({
            updateResult: null,
            errorMsg,
            passwordsMatch,
            secondary
        });
    }

    async handleSubmit(e){
        e.preventDefault();
        const {primary, secondary} = this.state;
        if(primary === secondary){
            e.target.reset();
            this.setState({updating: true});
            try{
                await updatePassword(
                    this.props.token,
                    this.props.password,
                    primary
                );
                this.setState({
                    errorMsg: '',
                    updateResult: true,
                    updateMsg: 'Password updated successfully',
                    passwordsMatch: true,
                    passIsValid: false,
                    primary: '',
                    secondary: ''
                });
                this.props.onSuccess(primary);
            } catch (e){
                const msg = "";
                this.setState({
                    updateResult: false,
                    updateMsg: msg
                });
            }
            this.setState({updating: false});
        }
    }

    render(){
        const btnClass = this.state.passwordsMatch ?
            "btn-success" : "";

        const updateAttempted = this.state.updateResult !== null;

        return (
            <form className="row form-group" onSubmit={this.handleSubmit.bind(this)}>
                    <label className="col-12 mt-2 text-center" htmlFor="pass-current">Change password</label>
                    
                    <Dropdown 
                    className="mr-auto ml-auto"
                    open={this.state.updating}>
                        <LoadingSpinner />
                    </Dropdown>

                    <Dropdown 
                    className="col-12"
                    open={updateAttempted}>

                        { 
                        // Update success    
                        updateAttempted && this.state.updateResult ? 
                            <div className="alert alert-success">
                                Password updated successfully                
                            </div>
                            // Update failed
                            : updateAttempted && 
                            <div className="alert alert-danger">
                            Failed to update. Please retype your passwords and try again. Unless this isn't your account. 
                            <br /> In which case, begone.
                        </div> }
                    </Dropdown>


                    <Dropdown 
                    className="col-12"
                    open={!this.state.updating}>
                        
                        <div
                        className="form-group col-12">
                            <PasswordInput 
                            onChange={this.handleChange.bind(this)}
                            name="newPass"
                            id="pass-primary"
                            placeholder="New password"
                            className=""/>
                        </div>
                        
                        <div
                        className="form-group col-12">
                            <PasswordInput
                            name="newPassConfirm"
                            disabled={!this.state.passIsValid}
                            onChange={this.handleConfirmChange.bind(this)}
                            id="pass-secondary"
                            placeholder="Confirm new password"
                            className=""/>
                        </div>
                    </Dropdown>

                    {this.state.errorMsg !== '' && // Error alert
                        <div className="col-12 alert alert-danger">{this.state.errorMsg}</div> }

                    <button 
                    type="submit"
                    disabled={!this.state.passwordsMatch}
                    className={"btn btn-sm offset-4 col-4 " + btnClass}>
                        <i className="fa fa-check"></i>
                    </button>
            
            </form>
        )
    }
}