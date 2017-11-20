import React from 'react';

export default (props)=>{
    // Opens confirm logout modal
    return (
        <div className="row">
            <button 
            data-toggle="modal" data-target="#confirmLogoutModal"
            className="btn btn-block bg-blue offset-2 col-8 mt-2 col-sm-6 offset-sm-3">
                LOGOUT
            </button>
        </div>
    )
}