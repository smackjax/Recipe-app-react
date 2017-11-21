import React from 'react';
import './friend-count.style.css';
export default (props)=>{
    // props.count
    // props.className 

    return (
        <div className={"border-friend friend-count-wrapper " + props.className}>
            <div className="friend-count-icon text-friend border-friend">
                <i className="fa fa-group"></i>
            </div>
            <div className="friend-count-number text-friend">
                {props.count}
            </div>
        </div>
    )
}