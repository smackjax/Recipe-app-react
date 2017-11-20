import React from 'react';
import {MainNav, RecipeDashBtn} from '../../_main-nav/_components';

export default (props)=>{
    return (
            <MainNav>
                <RecipeDashBtn />
                {props.children}
            </MainNav>
    )
}
