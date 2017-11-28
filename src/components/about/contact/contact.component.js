import React from 'react';
import './contact.style.css';
export default (props)=>{
    return (
        <div className="justify-content-center row justify-content-center">
            <div className="contact-card col-12 ">
            <div className="card">

                <div className="card-body">
                    <h4 className="card-title">
                        Contact
                    </h4>
                    <p className="card-text">
                        If you have any feedback or requests, feel free to drop a line
                    </p>
                    </div>

                <ul className="list-group list-group-flush">

                    <a href="mailto:max@maxbernard.design?Subject=Recipe%20app" target="_top"  className="list-group-item">
                        <i className=" fa fa-envelope"></i> Max@MaxBernard.design 
                    </a>


                    <a href="https://www.maxbernard.design" rel="noopener noreferrer" target="_blank" className="list-group-item">
                        <i className="fa fa-globe"></i> MaxBernard.Design
                    </a>

                </ul>
                
            </div>
        </div>
        </div>
    )
}