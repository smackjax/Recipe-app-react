import React from 'react';
import { Link } from 'react-router-dom';
import './new-recipe-btn.style.css';


export default (props)=>{
    return(
        <div className="new-recipe-btn-wrapper">
        <Link
        to='/recipes/new'
        className="btn btn-app new-recipe-btn bg-recipe">
            <i className="fa fa-plus"></i>
        </Link>
        </div>
        
    )
}