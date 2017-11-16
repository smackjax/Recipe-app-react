import React from 'react';
import  * as circleIcons  from '../../_resources/circle-icons/all-icons';
import getBgClass from '../../_style/getBgClass';
import {Link} from 'react-router-dom';
import './recipe-list.style.css';

export default (props)=>{
    // props.recipes
    // props.setActiveRecipe
    // ?props.userId (for ownerId comparison)
    return (
        <div className="recipe-list friend-recipes">
            {props.recipes.map((recipe, rIndx)=>{
                const type = recipe.recipeType;
                // get src for recipe-item img
                const svgSrc = circleIcons.getIconSrc(type);
                // get color class for item body
                const bgClass = getBgClass(type);
                // adds class if this recipe was created by user
                const ownedClass = 
                    props.userId && props.userId === recipe.ownerId ? 
                        "recipe-is-mine" : "";

                return <Link
                key={'recipe' + rIndx}
                to={"/recipes/"+recipe.id}
                className={"recipe-list-item " + ownedClass } >

                    <div className={"recipe-list-item-body " + bgClass}>
                        <img 
                        alt=""
                        src={svgSrc} 
                        className="recipe-list-item-svg" />
                        {recipe.name}
                    </div>

                    <div className="recipe-list-item-footer">Test display name</div>
                </Link>
            })}
        </div>
    )
}