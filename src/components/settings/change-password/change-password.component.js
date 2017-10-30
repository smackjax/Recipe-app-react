import React from 'react';

export default class NewPassword extends React.Component{
    state={
        errorMsg: '',
        invalid: true,
        passIsLength: false,
        primary: '',
        secondary: ''
    }

    checkPassString(e){
        const passString = e.target.value;
        const passCheck = /(?=.{6,})/;
        if(passCheck.test(passString)){
            this.setState({
                errorMsg: '',
                primary: passString,
                passIsLength: true
            });
            if (this.state.secondary === passString){
                this.setState({
                    invalid: false
                });
            }
        } else if (passString.length === 0){
            this.setState({
                invalid: true,
                passIsLength: false, 
                errorMsg: '',
                primary: passCheck
            });
        }
        else {;
            this.setState(
                {
                    errorMsg: 'Must be at least 6 characters',
                    invalid: true,
                    primary: passCheck,
                    passIsLength: false
                }
            );
        }
    }
    checkSamePass(e){
        const secondPass = e.target.value;
        if(secondPass === this.state.primary){
            this.setState({
                invalid: false,
                secondary: secondPass
            });
        } else {
            this.setState({
                invalid: true,
                secondary: secondPass
            });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const primary = e.target.passPrimary.value;
        const secondary = e.target.passSecondary.value;
        if(primary === secondary){
            this.props.onSubmit(primary);
            e.target.reset();
            this.setState({
                errorMsg: '',
                invalid: true,
                passIsLength: false,
                primary: '',
                secondary: ''
            });
        } else {
            this.setState({errorMsg: 'Passwords don\'t match'});
        }
    }

    render(){
        const btnClass = this.state.invalid ?
            "btn btn-sm offset-4 col-4" : 
            "btn btn-sm offset-4 col-4 btn-success";
        return (
            <form className="row form-group" onSubmit={this.handleSubmit.bind(this)}>
                    <label className="col-12 mt-2" htmlFor="pass-primary">Change password</label>
                    <div
                    className="form-group col-12">
                            <input 
                            type="text"
                            onChange={this.checkPassString.bind(this)}
                            name="passPrimary"
                            id="pass-primary"
                            placeholder="New password"
                            className="form-control"/>

                    </div>
                    
                    <div
                    className="form-group col-12">

                            <input 
                            type="text"
                            name="passSecondary"
                            disabled={!this.state.passIsLength}
                            onChange={this.checkSamePass.bind(this)}
                            id="pass-secondary"
                            placeholder="Confirm password"
                            className="form-control col-12"/>
                    </div>
                    
                    {this.state.errorMsg !== '' && // Error alert
                        <div className="col-12 alert alert-danger">{this.state.errorMsg}</div> }

                    <button 
                    type="submit"
                    disabled={this.state.invalid}
                    className={btnClass}>
                        <i className="fa fa-check"></i>
                    </button>
            
            </form>
        )
    }
}