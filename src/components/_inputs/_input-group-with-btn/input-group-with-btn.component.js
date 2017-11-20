import React from 'react';
export default class InputGroupWithSubmitBtn extends React.Component{
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
        // ...except ones that can't be on an input
        delete inputProps.submitDisabled;
        delete inputProps.component;
        
        // Allows hoc to disable form
        const submitDisabled = 
            this.state.submitDisabled || this.props.submitDisabled;

        const btnClass = submitDisabled ?
            "btn-secondary" : "btn-success";
        
        return(
            <div className="input-group col-12 ">
                {
                    this.props.component(inputProps)
                }
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