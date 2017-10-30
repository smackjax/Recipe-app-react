import React from 'react';
import {Link} from 'react-router-dom';
import './main-nav.style.css';
export default (props)=>{
    return (
    <nav className="smckjx-navbar">
        <div className="smckjx-nav-wrap">
            <Link 
            to="/recipe-dash"
            className="smckjx-nav-link">
                <i className="fa fa-list"></i>
            </Link>
            <Link 
            to="/friends"
            className="smckjx-nav-link">
                <i className="fa fa-group"></i>
            </Link>
            <Link 
            to="/settings"
            className="smckjx-nav-link">
                <i className="fa fa-gear"></i>
            </Link>
        </div>
    </nav>
    )
}