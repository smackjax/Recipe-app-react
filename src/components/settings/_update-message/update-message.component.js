import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
export default (props)=>{
    // props.attempting
    // props.updateSuccess
    return(
        <Dropdown 
        open={props.attempting !== null && props.updateSuccess !== null}>
            { props.updateSuccess ?
                <div className="alert alert-success col-12">
                    Update successful
                </div> : 
                <div className="alert alert-danger col-12">
                    Update failed. Please try again.
                </div>
            }
        </Dropdown>
    )
}