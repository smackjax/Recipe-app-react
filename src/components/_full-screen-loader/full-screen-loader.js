import React from 'react';
import LoadingSpinner from '../_loading-spinner/loading-spinner.component';
import './full-screen-loader.css';

export default (props)=>{
    return (
        <div className="full-screen-loader">
            <LoadingSpinner 
            className="fullscreen-spinner"/>
        </div>
    )
}