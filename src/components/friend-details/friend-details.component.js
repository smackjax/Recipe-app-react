import React from 'react';
import {recipesIntoArray, getAllRecipes} from '../../App-state-functions';
import FriendDetailsHeader from './_header/friend-details.header.js';
import FriendInfoBlock from './info-block/info-block.component';
import RecipeList from '../_recipe-list/recipe-list.component';


export default (props)=>{
    // props.friend
    // props.handleDelete()
    
    const handleDelete=()=>{
        props.handleDelete(props.friend.userId);
    };
    const recipes = getAllRecipes([props.friend]);
    return (
        <div className="friend-details-page">
            <FriendDetailsHeader
            username={props.friend.username}   
            handleDelete={handleDelete}
            />
            <FriendInfoBlock 
            username={props.friend.username}
            displayName={props.friend.displayName} />

            <hr/>
            <RecipeList
            usersArray={[props.friend]}
            recipes={recipes}
            />
        </div>
    )
}