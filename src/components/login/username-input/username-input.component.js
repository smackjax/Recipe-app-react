import React from 'react';
import {checkUsernameAvailable} from '../../../_data/serverData';
import Dropdown from '../../_dropdown/dropdown.component';
import UsernameInput from '../../_inputs/username/username.component';
import CheckUsernameStatus from './check-status/check-status.component';

export default class LoginUsernameInput extends React.Component {
    // props.newUser
    // props.name
    // props.withSubmit (give input add-on 'submit' btn)

    state={
        isBlank: false,
        invalid: null,
        checkingUsername: null,
        usernameAvailable: null,
        currentSearch: "",
    }

    
    // Queries api if username is taken
    async checkUsernameAvailability(nameToCheck){
        try{
            await checkUsernameAvailable(nameToCheck);
            this.setState({ usernameAvailable: true });
        } catch (e) {
            this.setState({ 
                usernameAvailable: false
            });
        }
        this.setState({checkingUsername: false});
    }

    // Checks if username is available from server by 
    // setting state to a setTimeout, and clearing on new search
    // to lessen server work
    setSearch(nameToCheck){
        this.setState({checkingUsername: true});
        clearTimeout(this.state.currentSearch);
        const newSearch = this.checkUsernameAvailability.bind(this)
        this.setState({currentSearch: 
            setTimeout(()=>{
                newSearch(nameToCheck)
            }, 1000 // Set timeout of search to 1 second
        )});
    }

    handleUsername(e){
        this.setState({
            invalid: !e.target.isValid 
        });    
        if(e.target.isValid){
            if(this.props.newUser){
                this.setState({
                    usernameAvailable: false
                });
                this.setSearch(e.target.value);
            }
        } 
        if(e.target.isBlank){
            this.setState({
                usernameAvailable: false
            });
        }

    }

    render(){
        const newUser = this.props.newUser;
        const btnClass = !this.state.invalid && this.state.usernameAvailable ? 
            " btn-success" : " btn-secondary"
        return (
            <div className={this.props.className}>
                <label htmlFor="login-username-input" className="login-input-label">
                    <span><b>Username</b>&nbsp;
                    { this.state.checkingUsername === null && newUser ?
                            "(Case sensitive)": 
                            // If have checked for username
                            this.state.checkingUsername !== null && 
                            <CheckUsernameStatus 
                                newUser={newUser}
                                checkingUsername={this.state.checkingUsername}
                                usernameAvailable={this.state.usernameAvailable} />
                    }
                    </span>          
                </label>
                
                <UsernameInput   
                    onChange={this.handleUsername.bind(this)}
                    placeholder="CKDexterHaven"  
                    required
                    id="login-username-input"
                    value={this.state.inputVal}
                    name={this.props.name || "loginUsername"}
                    className="form-control login-input"
                />
                
                <Dropdown open={this.state.invalid !== null && this.state.invalid}>
                    <div className="alert alert-danger">
                     Cannot be blank. Only letters, numbers, and underscores allowed.
                    </div>
                </Dropdown>
            </div>
        )
    }
}