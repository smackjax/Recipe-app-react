import React from 'react';

export default (props)=>{
    // Opens close account modal
    return (
        <div className="row">
            <button
            data-toggle="modal" data-target="#closeAccountModal"
            className="btn btn-block btn-danger offset-1 col-10 ">
                <i className="fa fa-times"></i> Close account
            </button>
        </div>
    )
}