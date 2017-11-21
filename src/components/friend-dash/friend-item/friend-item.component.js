import React from 'react';
import { Link } from 'react-router-dom';
import "./friend-item.style.css";
export default (props)=>{
    // props.friend
    const recipeCount = Object.keys(props.friend.recipes).length;

    return (
        <Link
        to={"/friends/"+props.friend.username}
        className="friend-link row btn-friend" >
            <div className="friend-photo text-friend">
                <i className="fa fa-user"></i>
            </div>
            <div className="friend-recipe-count text-friend">
                {recipeCount}
            </div> 
            <div className="friend-display-name">
                {props.friend.displayName}
            </div>
        </Link>
    )
}