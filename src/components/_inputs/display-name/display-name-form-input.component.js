import React from 'react';
import DisplayNameLabel from './display-name-label/display-name-label.component';
import DisplayNameWithSubmit from './display-name-with-submit.component';
import ErrorDropdown from './_error-dropdown/error-dropdown.component';

export default class DisplayNameFormInput extends React.Component{
    // props.onSubmit

    state={
        isValid: null,
        isBlank: null
    }

    handleChange(e){
        const {isBlank, isValid} = e.target;
        this.setState({
            isValid,
            isBlank
        })
    }


    render(){
        return (
            <form onSubmit={this.props.onSubmit} className="row">
                <DisplayNameLabel
                htmlFor="display-name-input"
                />

                <DisplayNameWithSubmit
                id="display-name-input"
                onChange={this.handleChange.bind(this)}
                name={this.props.name || "displayName"} 
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