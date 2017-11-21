import React from 'react';
import { withRouter } from 'react-router-dom';
export default withRouter((props)=>{
    // props.history
    // props.handleUnfollow
    // props.username

    const handleConfirm=()=>{
    // data-dismiss stops event propagation
        props.handleUnfollow();
        props.history.replace("/friends");
    }
    return(
        <div id="confirmUnfollowModal" className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title text-danger">
                Unfollow{props.userName? (" " + props.userName) : ""}?</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
            <div className="modal-body">
              <p>You won't be able to see their recipes anymore.</p>
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
                className="btn btn-danger ">
                    <i className="fa fa-check"></i> Stop following
                </button>
            </div>

          </div>
        </div>
      </div>
    )
})
