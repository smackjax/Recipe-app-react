import React from 'react';
import { updateUsername } from '../../_data/data';
import { checkUsernameAvailable } from '../../_data/serverData';
import Dropdown from '../_dropdown/dropdown.component';
import UsernameWithSubmit from '../_inputs/username/UsernameWithSubmit.component';
import CheckUsernameStatus from '../_inputs/username/check-status/check-status.component';

export default class UsernameInput extends React.Component{
    // token
    // onSuccess
    // placeholder

    state={
        attempting: null,
        updateSuccess: null,
    }

    updateResult(result){
        this.setState({
            attempting: false,
            updateSuccess: result
        });
    } 

    async handleSubmit(e){
        const newUsername = e.target.changeUsername.value;
        e.preventDefault();
        const formElem = e.target;
        this.setState({attempting: true });
        
        try{
            await updateUsername(this.props.token, newUsername);
            formElem.reset();
            this.updateResult(true)
            this.props.onSuccess(newUsername);
        } catch(err){
            console.log("Inside change-username failure");
            this.updateResult(false);
        }
    }        

    render(){
        
        return(
            <form className="row form-group" onSubmit={this.handleSubmit.bind(this)}>
                <Dropdown 
                className="col-12"
                open={this.state.attempting !== null}>
                    {
                        this.state.attempting !== null && this.state.updateSuccess ?  
                        <div className="alert alert-success">
                            Username successfully updated.
                        </div>
                        : this.state.attempting !== null && !this.state.updateSuccess &&                    
                        <div className="alert alert-danger">
                            Username update failed. Please try again. 
                        </div>
                    }
                </Dropdown>

                <label htmlFor="settings-username"
                className="col-12">Username</label>

                <UsernameWithSubmit
                onChange={this.setSearchTimeout.bind(this)}
                submitDisabled={
                    this.state.attempting || 
                    this.state.checkingUsername || 
                    !this.state.usernameAvailable }
                placeholder={this.props.placeholder}
                id="settings-username"
                name="changeUsername"
                className="col-12"
                />

            </form>
        )
    }
}