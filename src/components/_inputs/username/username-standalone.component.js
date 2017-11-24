import React from 'react';
import {checkUsernameAvailable} from '../../../_data/serverData';
import UsernameLabel from './check-status/username-label.component';
import UsernameWithSubmit from './username-with-submit.component';
import ErrorDropdown from './error-dropdown/error-dropdown.component';

export default class UsernameForm extends React.Component{
    // onSubmit
    // name
    // CheckUsername
    // placeholder

    state={
        isValid: null,
        isBlank: null,

        checkingUsername: null,
        usernameAvailable: null,
        currentSearch: ""
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
    // setting state to a setTimeout, and clearing any current 
    // on new search
    setSearchTimeout(e){
        const nameToCheck = e.target.value;
        this.setState({checkingUsername: true});
        if(this.state.currentSearch){
            this.clearSearch();
        }
        const newSearch = this.checkUsernameAvailability.bind(this)
        this.setState({currentSearch: 
            setTimeout(()=>{
                newSearch(nameToCheck)
            }, 1000 // Set timeout of search to 1 second
        )});
    }

    // Clears the search from happening
    clearSearch(){
        clearTimeout(this.state.currentSearch);
    }

    handleChange(e){

        const {isValid, isBlank} =
            e.target;

        const stateVals = {
            isBlank,
            isValid
        };
        if(!isValid || isBlank) {
            this.clearSearch()
            stateVals.checkingUsername = null;
            stateVals.usernameAvailable = null;
        } 
        this.setState({...stateVals});

        // Only check username availability if bool set and input valid
        if(this.props.checkUsername && isValid && !isBlank) { 
            this.setSearchTimeout(e);
        }
    }

    render(){
        return (
            <form onSubmit={this.props.onSubmit} className="row">

                <UsernameLabel
                checking={this.state.checkingUsername}
                available={this.state.usernameAvailable}
                />

                <UsernameWithSubmit
                submitDisabled={!this.state.usernameAvailable}
                onChange={this.handleChange.bind(this)}
                name={this.props.name || "username"} 
                placeholder={this.props.placeholder} />

                <ErrorDropdown 
                open={
                    (this.state.isValid !== null && !this.state.isValid) ||
                    (this.state.isBlank !== null && this.state.isBlank)
                } />
            </form>
        )
    }
}