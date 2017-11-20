import React from 'react';
import {MainNav, SettingsBtn, FriendsBtn} from '../../_main-nav/_components';
import logo from '../../../_resources/logo.svg';
import './recipe-list-nav.style.css';

export default (props)=>{
    return (
        <MainNav>            
           <SettingsBtn />
            <div className="recipe-z-logo-wrapper">
                <img src={logo}  alt="App logo"/>
            </div>
            <FriendsBtn />
        </MainNav>
    )
}