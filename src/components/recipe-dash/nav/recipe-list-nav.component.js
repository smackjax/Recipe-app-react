import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../_resources/logo.svg';
export default (props)=>{
    return (
        <nav className="mb-1 mt-1 row">
            <div className="mb-2 mt-2 col-4">
                <Link 
                to="/settings"
                className="btn btn-block btn-primary" >
                    <i className="fa fa-gear"></i> 
                </Link>
            </div>
            
            <div className="offset-1 col-2">
                <img src={logo}  />
            </div>

            <div className="mt-2 mb-2 offset-1 col-4">
                <Link 
                to="/friends"
                className="btn btn-block btn-primary" >
                    <i className="fa fa-group"></i> 
                </Link>
            </div>
        </nav>
    )
}