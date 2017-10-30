import React from 'react';
import FriendDetailsHeader from './_header/friend-details.header.js';
import FriendInfoBlock from './info-block/info-block.component';
import RecipeList from '../_recipe-list/recipe-list.component';

export default (props)=>{
    // props.friend: {all friend info}
    // props.history
    console.log(props.friend);
    const friendRecipeIds = Object.keys(props.friend.recipes);
    const friendRecipes = friendRecipeIds.map(rId=>{return {...props.friend.recipes[rId]} })
    return (
        <div className="friend-details-page">
            <FriendDetailsHeader 
            history={props.history}
            />
            <FriendInfoBlock 
            username={props.friend.username}
            displayName={props.friend.displayName}
            />'
            <hr/>
            <RecipeList 
            recipes={friendRecipes}
            />
        </div>
    )
}