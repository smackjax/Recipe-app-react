import React from 'react';

export default class DeleteAccountModal extends React.Component {
    state={
        invalid: true
    }
    handleChange(e){
        const pass = e.target.value;
        if(pass.trim() !== ''){
            this.setState({invalid: false})
        } else {
            this.setState({invalid: true})
        }
    }

    handleSubmit(e){
        e.preventDefault();
        e.target.reset();
        this.setState({invalid: true});
        console.log('Submitted');
    }

    render(){
        return (
            <div className="modal fade" id="closeAccountModal" tabIndex="-1" role="dialog" aria-labelledby="closeAccountModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                    <h5 className="modal-title font-danger" id="closeAccountModal"><i className="fa fa-life-bouy"></i> WARNING</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    This will delete your account, including all your recipes.<br />
                    Whoever is following you will not keep them.<br />
                    <span className="text-danger font-weight-bold">This cannot be undone!</span>
                    <hr />
                    If you're sure, please confirm with your password.
                    <form 
                    onSubmit={this.handleSubmit.bind(this)}
                    className="row">
                        <input type="password" 
                        name="passConfirm"
                        onChange={this.handleChange.bind(this)}
                        placeholder="Password here"
                        className="form-control offset-1 col-10 mt-3"/>
                        <button
                        disabled={this.state.invalid}
                        type="submit"
                        data-dismiss="modal"
                        className="btn btn-danger offset-1 col-10 mt-2">
                            <i className="fa fa-trash"></i> Delete
                        </button>

                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal"><i className="fa fa-times"></i> Cancel</button>
                    
                </div>
                </div>
            </div>
        </div>
        )
    }
}