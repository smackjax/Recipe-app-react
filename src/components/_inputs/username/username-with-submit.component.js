import React from 'react';
import UsernameInput from './username.component';

export default class UsernameWithSubmit extends React.Component{
    // ?props.submitDisabled

    state={
        submitDisabled: true
    }

    handleChange(e){
        if(e.target.isBlank || !e.target.isValid){
            this.setState({ submitDisabled: true });
        } else {
            this.setState({ submitDisabled: false });
        }
        if(this.props.onChange){
            this.props.onChange(e);
        }
    }

    render(){
        // Passes all props to input
        const inputProps = {
            ...this.props,
            onChange: this.handleChange.bind(this)
        };
        delete inputProps.submitDisabled;
        
        // Allows hoc to disable form
        const submitDisabled = 
            this.state.submitDisabled || this.props.submitDisabled;

        const btnClass = submitDisabled ?
            "btn-secondary" : "btn-success";

        return(
            <div className="input-group col-12 ">
                <UsernameInput 
                {...inputProps}
                onChange={this.handleChange.bind(this)}
                className="form-control"/>
                <span
                className="input-group-btn">
                    <button
                    type="submit" 
                    disabled={ submitDisabled }
                    className={"btn " + btnClass} >
                        <i className="fa fa-check"></i>
                    </button>
                </span>
            </div>
        )}
}