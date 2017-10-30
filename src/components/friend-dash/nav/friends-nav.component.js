import React from 'react';
import { Link } from 'react-router-dom';

export default (props)=>{
    const handleSubmit=(e)=>{
        e.preventDefault();
        props.onSubmit(e.target.value);
        e.target.reset();
    }
    return (
            <nav className="row mt-1 mb-1">
                <div className="col-4 mt-2 mb-2">
                    <Link
                    className="btn btn-block btn-primary"
                    to="/recipe-dash">
                        <i className="fa fa-chevron-left"></i> &nbsp;
                        <i className="fa fa-list"></i>
                    </Link>
                </div>
            </nav>
    )
}
