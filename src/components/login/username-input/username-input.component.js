import React from 'react';
import {checkUsernameAvailable as checkUsernameAvailableFromServer} from '../../../_data/serverData';
import Dropdown from '../../_dropdown/dropdown.component';
import SkxInput from '../../_input-not-blank/input-not-blank.component';
import CheckUsernameStatus from './check-status/check-status.component';

export default class UsernameInput extends React.Component {
    // props.setReady(inputName, bool)

    state={
        isBlank: false,
        invalid: false,
        checkingUsername: false,
        usernameAvailable: null
    }

    // Checks if username is available from server
    checkUsernameAvailability(usernameString){
        // TODO (maybe use settimeout to avoid server stress)
        // Queries api, gets bool back
        this.setState({checkingUsername: true}, 
        ()=>{
            checkUsernameAvailableFromServer(usernameString)
            .then((isAvailable)=>{
                this.setState({usernameAvailable: isAvailable}, ()=>{
                    this.setState({checkingUsername: false});
                });
            })
            .catch(err=>{
                console.log('Error searching for username: ', err);
            })
        });
    }

    handleUsername(e){
        this.setState({
            invalid: !e.target.isValid 
        });    
        

        if(e.target.isValid){
            if(this.state.newUser){
                this.checkUsernameAvailability(e.target.value);
            }
            this.props.setReady(e.target.name, true);
        } else {
            this.props.setReady(e.target.name, false);
        }
    }

    render(){
        return (
            <div className={this.props.className}>
                
                <label className="login-input-label">
                    Username* &nbsp;
                    <CheckUsernameStatus 
                    newUser={this.state.newUser}
                    checkingUsername={this.state.checkingUsername}
                    usernameAvailable={this.state.usernameAvailable} />    
                </label>

                <SkxInput type="text"
                reverseRegex={/\W/}   
                onChange={this.handleUsername.bind(this)}
                required
                maxLength="20"
                name="loginUsername"
                className="form-control login-input"/>
                
                <Dropdown open={this.state.invalid}>
                    <div className="alert alert-danger">
                     Cannot be blank. Only letters, numbers, underscores, and spaces allowed.
                    </div>
                </Dropdown>
            </div>
        )
    }
}