import React from 'react';
import {NavLink} from 'react-router-dom';
import './nav.style.css';

export default (props)=>{
    return (
        <nav className="main-nav"> 
            <NavLink 
            to="/recipe-dash"
            className="main-nav-item btn border-recipe text-recipe">
                <i className="fa fa-list"></i>
            </NavLink>

            <NavLink 
            to="/friends"
            className="main-nav-item btn border-friend text-friend">
                <i className="fa fa-users"></i>
            </NavLink>

            <NavLink 
            to="/settings"
            className="main-nav-item btn border-app text-app">
                <i className="fa fa-cogs"></i>
            </NavLink>

            <NavLink 
            to="/info"
            className="main-nav-item info btn-outline-info">
                <i className="fa fa-info"></i>
            </NavLink>

        </nav>
    )
}