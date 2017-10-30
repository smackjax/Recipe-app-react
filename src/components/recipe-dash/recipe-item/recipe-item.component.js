import React from 'react';
import {Link } from 'react-router-dom';
import './recipe-item.style.css';

export default (props)=>{
    // props.name
    // props.recipeId
    // props.key
    // props.isMine
    const isMineStyle = props.isMine ? 
        {fontWeight: 'bold'} : {};
    return(
            <Link 
            to={'/recipes/'+props.recipeId}
            className="recipe-list-item"
            style={isMineStyle} >
                {props.name}      
                <i className="fa fa-chevron-right"></i>
            </Link>
    )
}
