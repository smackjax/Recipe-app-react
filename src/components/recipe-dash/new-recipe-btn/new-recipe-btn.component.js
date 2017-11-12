import React from 'react';
import { Link } from 'react-router-dom';
import './new-recipe-btn.style.css';


export default (props)=>{
    return(
        <Link
        to='/recipes/new'
        className="new-recipe-btn">
            <i className="fa fa-plus"></i> &nbsp;&nbsp;New
        </Link>
    )
}