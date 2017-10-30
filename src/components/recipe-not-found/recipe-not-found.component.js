import React from 'react';
import {Link} from 'react-router-dom';

export default (props)=>{
    return(
        <Link className="btn btn-primary btn-sm col-4 offset-4" to="recipe-list">
        <i className="fa fa-list"></i>
        </Link>
    )
}