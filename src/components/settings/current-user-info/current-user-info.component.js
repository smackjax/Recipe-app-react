import React from 'react';

export default (props)=>{
    // props.userInfo
    // props.className
    const emailTotal = props.userInfo.email || "(none)";
    const emailSplit = emailTotal.split("@");
    const emailAddress = emailSplit[0];
    const emailDomain = emailSplit[1] || "";
    return (
        <div className="col-12 mt-4">
            <ul className="list-group"> 
                <li className="list-group-item bg-info text-white">
                    <b>YOUR INFO</b>
                </li>
                <li className="list-group-item">
                    Username: <br/>
                    <b>{props.userInfo.username}</b>
                </li>
                <li className="list-group-item">
                    Email: <br/> 
                    <b>{emailAddress}<span className="d-none d-sm-inline-block">@{emailDomain}</span></b>
                </li>
                <li className="list-group-item">
                    Display Name: <br/>
                    <b>{props.userInfo.displayName}</b>
                </li>
            </ul>
        </div>
    )
}