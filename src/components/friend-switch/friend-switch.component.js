import React from 'react';
import FriendDash from '../friend-dash/friend-dash.component';
import FriendDetails from '../friend-details/friend-details.component';


export default (props)=>{
    //props.history
    // props.recipes
    // props.friends
    // props.handleDelete
    // props.handleSearch

    const friendsInfo = 
    props.friends.map((friend)=>{
        const friendRecipes = {};
        for(let recipe of props.recipes){
            if(recipe.ownerId === friend.id){
                friendRecipes[recipe.id] = {...recipe};
            }    
        }
        return {
            ...friend,
            recipes: friendRecipes,
        }
    });

    const handleSearch=(searchName)=>{
        props.handleSearch(searchName);
    }

    let selectedFriend = false;
    if(props.username && friendsInfo.length > 0){
        selectedFriend = 
        friendsInfo.find(friend=>friend.username === props.username);
    }
    
    if(selectedFriend){
        return <FriendDetails 
                history={props.history}
                handleDelete={props.handleDelete}
                friend={selectedFriend} /> 
    } else {
        return <FriendDash 
                friends={friendsInfo}
                handleSearch={handleSearch}
                />
    }

        
}