import React from 'react';
import {logoutUser} from '../../../_data/serverData';

export default (props)=>{
    // props.logout
    // props.inSync

    const handleConfirm=()=>{
      // Server call for logout always returns 200
      logoutUser()
      .catch(()=>{})
      .then(()=>{
        props.logout();
      })
      // data-dismiss(on modal) stops event propagation
      
    }

    // inSync means no data backlog to push to server
    const inSync = props.inSync;
    const headerBgColor = inSync ? " bg-info" : " bg-danger"
    
    const btnColorClass = inSync ? " btn-info" : " btn-danger";

    return(
        <div id="confirmLogoutModal" className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

      
          <div className={"modal-header"+headerBgColor}>
          <h5 className="modal-title text-light">
            {inSync ? "Are you sure?" : <span><b>WARNING</b></span> }
          </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      
                
            <div className="modal-body">
              {!inSync ? (
                <p><b>Unsaved actions</b><br/>
                  If you log out now, any changes since the last time synchronized will be lost. <br />
                </p> ):
                 <p>You won't be able to get your recipes offline.</p>
              }   
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
                className={"btn"+btnColorClass}>
                    <i className="fa fa-check"></i> Logout
                </button>
            </div>

          </div>
        </div>
      </div>
    )
}

