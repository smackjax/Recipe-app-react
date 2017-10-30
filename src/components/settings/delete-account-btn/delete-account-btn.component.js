import React from 'react';
import DeleteAccountModal from '../delete-account-modal/delete-account-modal.component';

export default (props)=>{
    return (
        <div className="row">
            <div className="offset-2 col-8 mt-2">
                <button
                data-toggle="modal" data-target="#closeAccountModal"
                className="btn btn-block btn-outline-warning">
                    <i className="fa fa-times"></i> Close account
                </button>
            </div>
            <DeleteAccountModal/>
            
        </div>
    )
}