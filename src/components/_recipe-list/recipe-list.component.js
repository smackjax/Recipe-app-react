import React from 'react';
import {Link} from 'react-router-dom';
import './recipe-list.style.css';

export default (props)=>{
    // props.recipes
    return (
        <div className="recipe-list friend-recipes">
            <div className="recipe-counter text-blue border-blue">Recipes: {props.recipes.length}</div>
            {props.recipes.map((recipe, rIndx)=>(
                <Link
                key={'recipe' + rIndx}
                to={"/recipes/"+recipe.id}
                className="recipe-list-item" >
                    {recipe.name}
                    <i className="fa fa-chevron-right"></i>
                </Link>
            ))}
        </div>
    )
}