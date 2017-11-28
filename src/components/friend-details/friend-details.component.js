import React from 'react';
import {getAllRecipes} from '../../App-state-functions';
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
            <hr />
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