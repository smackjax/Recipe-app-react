import React from 'react';
import {Link} from 'react-router-dom';
import './recipe-list.style.css';

export default (props)=>{
    // props.recipes
    // props.setActiveRecipe
    // ?props.userId (for ownerId comparison)

    return (
        <div className="recipe-list friend-recipes">
            <div className="recipe-counter text-blue border-blue">Recipes: {props.recipes.length}</div>
            {props.recipes.map((recipe, rIndx)=>{
                const ownedClass = 
                    props.userId && props.userId === recipe.ownerId ? 
                        "recipe-is-mine" : "";
                return <Link
                key={'recipe' + rIndx}
                to={"/recipes/"+recipe.id}
                className={"recipe-list-item " + ownedClass } >
                    {recipe.name}
                    <i className="fa fa-chevron-right"></i>
                </Link>
            })}
        </div>
    )
}