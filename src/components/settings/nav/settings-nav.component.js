import React from 'react';
import { Link } from 'react-router-dom';

export default (props)=>{
    return (

        <nav className="row mt-1 mb-1">
            <div className="col-7 mt-2 mb-2">
                <button
                className="btn btn-block btn-secondary">
                <i className="fa fa-arrow-left"></i> LOG OUT
                </button>
            </div>
            <div className="offset-1 col-4 mt-2 mb-2">
                <Link
                to="/recipe-dash"
                className="btn btn-block btn-primary">
                    <i className="fa fa-list"></i>
                </Link>
            </div>
        </nav>
    )
}