import React from 'react';

export default (props)=>{
    // props.handleDelete
    return(
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel"><i className="fa fa-trash"></i> Delete recipe?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                You are about to delete this recipe. This cannot be undone!
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"><i className="fa fa-times"></i> Nope</button>
                <button
                type="button"
                data-dismiss="modal"
                onClick={props.handleDelete}
                className="btn btn-danger">
                    <i className="fa fa-trash"></i> Delete
                </button>
            </div>
            </div>
        </div>
    </div>
    )
}
