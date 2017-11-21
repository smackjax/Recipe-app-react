import React from 'react';
import Dropdown from '../../_dropdown/dropdown.component';
import './add-friend-result.style.css';
export default (props)=>{
    // props.searchFailed
    // props.dismiss
    return (
        <Dropdown 
        open={props.searchFailed}>
            <div className="alert alert-warning alert-dismissible friend-search-failed" role="alert">
            <button type="button" className="close" onClick={props.dismiss} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
                <b>Not found</b><br />
                Usernames are case sensitive. Please check the username and try again.
            </div>  
        </Dropdown>
    )
}