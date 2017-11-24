import React from 'react';
import Contact from './contact/contact.component';

import SvgCredits from './svg-credits/svg-credits.component';
import Copyright from './copyright/copyright.component';

export default (props)=>{
    return(
        <div className="container about-page">
            <hr />
            <Contact/>
            <hr />
            <h5 className="text-center">Icons by:</h5>
            <SvgCredits />
            <Copyright />
        </div>
    )
}