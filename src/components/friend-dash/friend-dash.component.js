import React from 'react';
import FriendsNav from '../_main-nav/main-nav.component';
import FriendSearch from './friend-search/friend-search.component';
import FriendItem from './friend-item/friend-item.component';

export default (props)=>{
    // props.recipes
    // props.friends
    const handleSearch=(searchUsername)=>{
        props.handleSearch(searchUsername);
    }

    return(
        <div className="page friend-page">
            <FriendsNav />
            <hr />
            <FriendSearch 
            handleSearch={handleSearch} />
            <hr />

            {props.friends.map((friend, fIndx)=>(
                <FriendItem 
                key={'f-'+fIndx}
                friend={friend} />
            ))}
        </div>
    )
}