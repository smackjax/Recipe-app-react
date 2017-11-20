import React from 'react';
import PasswordWithSubmit from '../../../_inputs/password/password-with-submit.component';
export default (props)=>{
    // props.onSubmit
    // props.name
    return (
        <div  className="container-fluid">
            <div className="row">
                <div className="col-12">
                <b>Enter your password to update info</b>
                </div>
            </div>
            <form
            className="row mt-2"
            onSubmit={props.onSubmit} >
                <div className="col-12">
                    <PasswordWithSubmit
                    {...props} />
                </div>
            </form>
        </div>
    )
}