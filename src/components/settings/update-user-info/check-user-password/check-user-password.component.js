import React from 'react';
import {checkPasswordValid} from '../../../../_data/serverData';
import LoadingSpinner from '../../../_loading-spinner/loading-spinner.component';
import Dropdown from '../../../_dropdown/dropdown.component';
import PasswordWithSubmit from '../../../_inputs/password/password-with-submit.component';


export default class CheckUserPassword extends React.Component{
    // props.token
    // props.name
    // props.handleCorrectPassword

    state={ 
        checkingPassword: null, 
        passwordCheckFailed: null 
    }

    async handlePasswordCheck(e){
        // Reset
        this.setState({ checkingPassword: true, passwordCheckFailed: false });

        e.preventDefault();
        const pass = e.target.passwordCheck.value;
        e.target.reset();

        console.log(pass);
        try{
            await checkPasswordValid(this.props.token, pass);
            this.setState({
                checkingPassword: false, 
                passwordCheckFailed: false
            }, ()=>{
                this.props.handleCorrectPassword(pass);
            });
        } catch (err) {
            this.setState({
                checkingPassword: false,
                passwordCheckFailed: true
            })
        }
    }
    
    render(){
        const {token, handleCorrectPassword, ...rest} = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <b>Enter your password to update info</b>
                    </div>
                </div>

                <Dropdown open={(!this.state.checkingPassword && this.state.passwordCheckFailed)}>
                    <div className="row">
                        <div className="alert alert-danger offset-1 col-10 mt-1 mb-1">
                            <b>Failed</b> <br/>Please retype your password.
                        </div>
                    </div>
                </Dropdown>

                <Dropdown open={this.state.checkingPassword}>
                    <LoadingSpinner />
                </Dropdown>

                <Dropdown 
                open={!this.state.checkingPassword}>
                    <form
                    className="row mt-2"
                    onSubmit={this.handlePasswordCheck.bind(this)} >
                        <div className="col-12">
                            <PasswordWithSubmit
                            {...rest} />
                        </div>
                    </form>
                </Dropdown>
            </div>
        )
    }
}