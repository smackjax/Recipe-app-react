import React from 'react';
import PasswordLabel from './password-label/password-label.component';
import PasswordWithSubmit from './password-with-submit.component';
import ErrorDropdown from './error-dropdown/error-dropdown.component';

export default class PasswordFormInput extends React.Component{
    // props.onSubmit
    // props.name
    // props.onChange
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
        if(this.props.onChange){
            this.props.onChange(e);
        }
    }


    render(){
        return (
            <form onSubmit={this.props.onSubmit} className="row">
                <PasswordLabel
                htmlFor={this.props.id || "password-input" }
                />

                <PasswordWithSubmit
                id={this.props.id || "password-input"}
                onChange={this.handleChange.bind(this)}
                name={this.props.name || "password"} 
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