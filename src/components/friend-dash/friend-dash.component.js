import React from 'react';
import * as dataFuncs from '../../_data/data';

import FriendsNav from './nav/friends-nav.component';

import FriendSearch from './friend-search/friend-search.component';
import AddFriendResult from './add-friend-result/add-friend-result.component';
import FriendCount from './friend-count/friend-count.component';
import FriendItem from './friend-item/friend-item.component';

export default class FriendDash extends React.Component{
    // props.recipes
    // props.friends
    // props.token
    // props.addFriend
    state={
        findingFriend: false,
        friendFound: false,
        friendNotFound: false
    }

   handleSearch (searchString){
       this.setState({findingFriend: true}); 
        dataFuncs.addFriend(
            this.props.token,
            searchString
        ).then(newFriendData=>{
            console.log(newFriendData);
            if(!newFriendData){
                throw Error("Friend not found");    
            } 
            this.setState({
                findingFriend: false,
                friendFound: true
            });
            this.props.addFriend(newFriendData);
        }).catch (err=>{
            this.setState({
                findingFriend: false,
                friendNotFound: true
            });
        })
    }

    dismissAlerts(){
        this.setState({
            friendFound: false, 
            friendNotFound: false
        })
    }

     // Sort friend list alphabetically
    sortFriends (friendList ){
        return [...friendList].sort(
            (fOne, fTwo)=>{
                const nameOne = fOne.displayName.toUpperCase();
                const nameTwo = fTwo.displayName.toUpperCase();

                return  (nameOne < nameTwo) ? -1 : 
                        (nameOne > nameTwo ) ? 1 :
                            0
            }
        )
    }

   render(){
        const sortedFriends = this.sortFriends(this.props.friends);
        return(
            <div className="page friend-page">
                <hr />

                <FriendSearch 
                handleSearch={this.handleSearch.bind(this)} />

                <AddFriendResult 
                searchFailed={this.state.friendNotFound}
                dismiss={this.dismissAlerts.bind(this)}
                />

                <FriendCount 
                className="mb-4"
                count={this.props.friends.length} />

                {sortedFriends.map((friend, fIndx)=>(
                    <FriendItem 
                    key={'f-'+fIndx}
                    friend={friend} />
                ))}
            </div>
        )
   }
    
}

