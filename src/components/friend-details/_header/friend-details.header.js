import React from 'react';
import {withRouter} from 'react-router-dom';
import {MainNav, BackBtn} from '../../_main-nav/_components';
import './friend-details-header.style.css';

export default withRouter((props)=>{
    // props.history
    // props.username
    // props.handleDelete

    return (
        <MainNav>
            <BackBtn />
        </MainNav>
    )
})
