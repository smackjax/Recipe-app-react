import React from 'react';
import { Link } from 'react-router-dom';
import  * as circleIcons  from '../../../_resources/circle-icons/all-icons';
import getBgClass from '../../../_style/getBgClass';

export default (props)=>{
    // props.recipe
    // props.userId
    const recipe = props.recipe;

    const type = recipe.recipeType;
    // get src for recipe-item img
    const svgSrc = circleIcons.getIconSrc(type);
    // get color class for item body
    const bgClass = getBgClass(type);
    
    // Stores whether current 'main' user(or 'friend' if viewing their list)
    // created this recipe
    const isOwnedByMain = (props.userId === recipe.ownerId);
    // adds class if this recipe was created by user
    const ownedClass = 
        isOwnedByMain ? "recipe-is-mine" : "";

    return (
    <div
    className={"recipe-list-item " + ownedClass } >
        <Link 
        to={"/recipes/"+recipe.id}
        className={"recipe-list-item-body text-light " + bgClass}>
            <img 
            alt=""
            src={svgSrc} 
            className="recipe-list-item-svg" />
            {recipe.name}
        </Link>

        { isOwnedByMain ?
            <div className="recipe-list-item-footer">
                {recipe.userInfo.displayName}
            </div> :
            <Link
            to={"/friends/"+recipe.userInfo.username}
            className="recipe-list-item-footer">
                {recipe.userInfo.displayName}
            </Link>
        }
    </div>
    )
}