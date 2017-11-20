import React from 'react';
import Dropdown from '../../../_dropdown/dropdown.component';
 
export default (props)=>{
    // props.open
    return (
        <Dropdown 
        className="col-12"
        open={props.open}>
            <div className="alert alert-danger">
            Cannot be blank. Minimum 6 chars.
            </div>
        </Dropdown>
    )
}