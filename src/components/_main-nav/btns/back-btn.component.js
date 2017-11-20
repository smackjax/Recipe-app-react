import React from 'react';
import {withRouter } from 'react-router-dom';

export default withRouter((props)=>(
    <button
    onClick={props.history.goBack}
    className="btn main-nav-btn btn-app"
    >
        <i className="fa fa-chevron-left"></i>
    </button>
))