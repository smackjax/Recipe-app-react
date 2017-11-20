import React from 'react';

export default (props)=>{
    // props.logout

    const handleConfirm=()=>{
    // data-dismiss stops event propagation
        props.logout();
    }
    return(
        <div id="confirmLogoutModal" className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title text-info">Want to logout?</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body">
              <p>You won't be able to get your recipes offline.</p>
            </div>
            
            <div className="modal-footer">
            <button type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal">
                    <i className="fa fa-times"></i> Cancel
                </button>

                <button type="button" 
                onClick={handleConfirm}
                data-dismiss="modal"
                className="btn btn-info ">
                    <i className="fa fa-check"></i> Logout
                </button>
            </div>

          </div>
        </div>
      </div>
    )
}

