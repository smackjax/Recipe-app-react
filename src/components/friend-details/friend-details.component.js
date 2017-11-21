import React from 'react';
import {recipesIntoArray, getAllRecipes} from '../../App-state-functions';
import FriendDetailsHeader from './_header/friend-details.header.js';
import FriendInfoBlock from './info-block/info-block.component';
import RecipeList from '../_recipe-list/recipe-list.component';


export default (props)=>{
    // props.friend
    // props.handleDelete()
    window.scrollTo(0,0);
    const handleUnfollow=()=>{
        props.handleDelete(props.friend.userId);
    };
    const recipes = getAllRecipes([props.friend]);
    
    return (
        <div className="friend-details-page">
            <FriendDetailsHeader
            username={props.friend.username}   
            />
            
            <FriendInfoBlock 
            username={props.friend.username}
            displayName={props.friend.displayName} 
            handleUnfollow={handleUnfollow}/>

            <hr/>
            <RecipeList
            usersArray={[props.friend]}
            recipes={recipes}
            userId={props.friend.userId}
            />
        </div>
    )
}