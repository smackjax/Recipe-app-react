import React from 'react';
import FriendDash from '../friend-dash/friend-dash.component';
import FriendDetails from '../friend-details/friend-details.component';


export default (props)=>{
    // props.username(of friend to view)
    // props.history
    // props.friends
    // props.handleDelete()
    // props.handleSearch()
    const handleSearch=(searchName)=>{
        props.handleSearch(searchName);
    }

    let selectedFriend = false;
    if(props.username && props.friends.length > 0){
        selectedFriend = 
            props.friends.find(
                friend=>friend.username === props.username
            );
    }
    
    if(selectedFriend){
        return <FriendDetails 
                history={props.history}
                handleDelete={props.handleDelete}
                friend={selectedFriend} /> 
    } else {
        return <FriendDash 
                friends={props.friends}
                handleSearch={handleSearch}
                />
    }

        
}
