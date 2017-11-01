import React from 'react';
import {checkUsernameAvailable as checkUsernameAvailableFromServer} from '../../../_data/serverData';
import Dropdown from '../../_dropdown/dropdown.component';
import SkxInput from '../../_input-not-blank/input-not-blank.component';
import CheckUsernameStatus from './check-status/check-status.component';

export default class UsernameInput extends React.Component {
    // props.newUser
    // props.name

    state={
        isBlank: false,
        invalid: false,
        checkingUsername: null,
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
            if(this.props.newUser){
                this.checkUsernameAvailability(e.target.value);
            }
        }
    }

    render(){
        const newUser = this.props.newUser;
        return (
            <div className={this.props.className}>
                
                {this.state.checkingUsername !== null && 
                <CheckUsernameStatus 
                    newUser={newUser}
                    checkingUsername={this.state.checkingUsername}
                    usernameAvailable={this.state.usernameAvailable} />
                }

                <label htmlFor="login-username-input" className="login-input-label">
                    Username{ newUser ? " (How people find you)" : " / Email" }
                    
                </label>
                
                <SkxInput type="text"
                reverseRegex={newUser ? /\W/ : false}   
                onChange={this.handleUsername.bind(this)}
                required
                maxLength="20"
                id="login-username-input"
                name={this.props.name || "loginUsername"}
                className="form-control login-input"/>
                 
  
                <Dropdown open={this.state.invalid}>
                    <div className="alert alert-danger">
                     Cannot be blank. {newUser && "Only letters, numbers, underscores, and spaces allowed."}
                    </div>
                </Dropdown>
            </div>
        )
    }
}