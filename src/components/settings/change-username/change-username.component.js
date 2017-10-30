import React from 'react';
import TextInput from '../text-input/text-input.component';

export default class UsernameInput extends React.Component{
    // name
    // onSubmit
    // onChange
    // placeholder
    // value

    state={
        invalid: true,
        errorMsg: ''
    }

    checkString(e){
        const newUsername = e.target.value;
        
        // tests for anything other than alphanumeric and underscores
        let isInvalid = /\W/.test(newUsername);
        if(isInvalid === true){ 
            this.setState({
                invalid: isInvalid,
                errorMsg: 'Can only have letters, numbers, and underscores'
            });
        } else if(newUsername.length === 0){ 
            // checks length greater than 0
            this.setState({ invalid: true, errorMsg: '' });
        } else {
            this.setState({invalid: false, errorMsg: ''});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const value = e.target[this.props.name].value;
        this.props.onSubmit(value);
        e.target.reset();
    }

    render(){
        const btnClasses = this.state.invalid ? 
            'btn btn-secondary' :
            'btn btn-success';
        return(
            <form className="row form-group" onSubmit={this.handleSubmit.bind(this)}>
                <div className="col-12">
                    <label htmlFor="change-username-input">Change username</label>
                    <div className="input-group">
                        <input type="text"       
                        onChange={this.checkString.bind(this)}
                        name={this.props.name}
                        id="change-username-input"
                            className="form-control" placeholder={this.props.placeholder} />
                        
                        <span
                        className="input-group-btn">
                            <button
                            disabled={this.state.invalid}
                            type="submit" 
                            className={btnClasses} >
                                <i className="fa fa-check"></i>
                            </button>
                        </span>
                    </div>
                </div>
                {this.state.errorMsg !== '' &&
                    <div className="col-12 alert alert-danger">
                        {this.state.errorMsg}
                    </div>
                }
            </form>
        )
    }
}