import React from 'react';
import LoadingSpinner from '../_loading-spinner/loading-spinner.component';
import './full-screen-spinner.css';

export default (props)=>{
    return (
        <div className="full-screen-spinner">
            <LoadingSpinner 
            className="spinner-wrap"/>
        </div>
    )
}