import React from 'react';
import {recipesIntoArray} from '../../App-state-functions';
import FriendDetailsHeader from './_header/friend-details.header.js';
import FriendInfoBlock from './info-block/info-block.component';
import RecipeList from '../_recipe-list/recipe-list.component';
import RemoveFriendBtn from './remove-friend-btn/remove-friend-btn.component';

export default (props)=>{
    
    // props.friend
    // props.history
    // props.handleDelete()
    
    const handleDelete=()=>{
        props.handleDelete(props.friend.userId);
    };
    const recipes = recipesIntoArray(props.friend.recipes);
    return (
        <div className="friend-details-page">
            <FriendDetailsHeader 
            history={props.history}
            />
            <FriendInfoBlock 
            username={props.friend.username}
            displayName={props.friend.displayName} />
            <RemoveFriendBtn 
            onClick={handleDelete}/>
            <hr/>
            <RecipeList 
            recipes={recipes}
            />
        </div>
    )
}