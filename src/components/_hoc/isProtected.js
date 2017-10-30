import React from 'react';
import { Redirect } from 'react-router-dom';

export default (props)=>{
    /* From react 'authorized' example.
        Takes path to render and token. 
        if 
    */
    // props.token
    // props.componentToRender
    // props.routePath(where user navigated from)

    // If no token, redirect to login
    if(!token){  return  <Redirect to='/login' />; }

    // If there is a token, return protected component
    return  props.componentToRender;
}