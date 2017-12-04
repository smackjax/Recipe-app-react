import React from 'react';
import $ from 'jquery';
import { closeAccount } from '../../../../../_data/serverData';
import Dropdown from '../../../../_dropdown/dropdown.component';
import LoadingSpinner from '../../../../_loading-spinner/loading-spinner.component';


export default class DeleteAccountModal extends React.Component {
    // props.token
    // props.logout
    state={
        invalid: true,
        closingAccount: false, 
        closeFailed: false
    }

    handleChange(e){
        const pass = e.target.value;
        this.setState({ pass })
        if(pass.trim() !== ''){
            this.setState({ invalid: false })
        } else {
            this.setState({invalid: true})
        }
    }

    async handleSubmit (e){
        e.preventDefault();

        e.preventDefault();
        const userPass = e.target.passConfirm.value;
        e.target.reset();
        this.setState({ closingAccount: true });
        try {
            await closeAccount(this.props.token, userPass);
            this.props.logout();
            $('.closeAccountModal').hide();
            $('.modal-backdrop').hide();
        } catch (e) {
            this.setState({
                closingAccount: false,
                closeFailed: true
            })
        }
    }


    render(){
        return (
        <div className="modal fade" id="closeAccountModal" 
        tabIndex="-1" 
        role="dialog" 
        aria-labelledby="closeAccountModalLabel" 
        aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                    <h5 className="modal-title font-danger" id="closeAccountHeading"><i className="fa fa-life-bouy"></i> WARNING</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                    This will delete your account, including all your recipes.<br />
                    Whoever is following you will not keep them.<br />
                    <span className="text-danger font-weight-bold">This cannot be undone!</span>
                    <hr />

                    { this.state.closingAccount ?
                    <LoadingSpinner /> :       
                    <form
                    onSubmit={this.handleSubmit.bind(this)}
                    className="row">
                        <Dropdown open={this.state.closeFailed}>
                            <div className="alert alert-danger">
                                There was a problem closing your account. 
                                Please retype your password and try again.
                            </div>
                        </Dropdown>
                        {this.state.closingAccount === null && 
                            // If there has been an attempt to close the account
                            <div className="col-12"> 
                                If you're sure, please confirm with your password. 
                            </div>
                        }


                        <input type="password" 
                        name="passConfirm"
                        onChange={this.handleChange.bind(this)}
                        placeholder="Password here"
                        className="form-control offset-1 col-10 mt-3"/>

                        <input type="submit"
                        disabled={this.state.invalid}
                        className="btn btn-danger offset-1 col-10 mt-2"
                        value="Confirm" />

                    </form>}
                </div>

                <div className="modal-footer">
                    <button type="button" 
                    className="btn btn-secondary" 
                    data-dismiss="modal">
                        <i className="fa fa-times"></i> Cancel
                    </button>
                    
                </div>
                </div>
            </div>
        </div>
        )
    }
}