import React from 'react';
import {checkUsernameAvailable} from '../../../_data/serverData';
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
        usernameAvailable: null,
        currentSearch: "",
    }

    
    // Queries api if username is taken
    async checkUsernameAvailability(nameToCheck){
        try{
            await checkUsernameAvailable(nameToCheck);
            this.setState({ usernameAvailable: true });
        } catch (e) {
            this.setState({ usernameAvailable: false });
            console.log(e.message);
        }
        this.setState({checkingUsername: false});
    }

    // Checks if username is available from server by 
    // setting state to a setTimeout, and clearing on new search
    // to lessen server work
    setSearch(nameToCheck){
        this.setState({checkingUsername: true});
        if(this.state.currentSearch){
            clearTimeout(this.state.currentSearch);
        }
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
                this.setSearch(e.target.value);
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