import React from 'react';
import EmailLabel from './email-label/email-label.component';
import EmailWithSubmit from './email-with-submit.component';
import ErrorDropdown from './error-dropdown/error-dropdown.component';

export default class EmailFormInput extends React.Component{
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
        if(this.props.onChange){
            this.props.onChange(e);
        }
    }

    render(){
        return (
            <form onSubmit={this.props.onSubmit} className="row">
                <EmailLabel
                htmlFor="display-name-input"
                />

                <EmailWithSubmit
                id="email-name-input"
                onChange={this.handleChange.bind(this)}
                name={this.props.name || "email"} 
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