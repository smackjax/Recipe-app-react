import React from 'react';
import Dropdown from '../../../_dropdown/dropdown.component';
 
export default (props)=>{
    // props.open
    return (
        <Dropdown 
        open={props.open}>
            <div className="alert alert-danger">
                Cannot be blank.
            </div>
        </Dropdown>
    )
}