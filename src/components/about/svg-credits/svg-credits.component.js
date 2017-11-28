import React from 'react';

export default (props)=>{
    return(
        <div 
        style={{maxWidth: '350px', marginLeft: "auto", marginRight: "auto"}}
        className="row justify-content-center list-group">
            <div className="col-12 list-group-item">
                 <a href="http://www.freepik.com" title="Freepik" target="_blank" rel="noopener noreferrer"> Freepik </a>
            </div>
            <div className="col-12 list-group-item">
                <a href="http://www.onlinewebfonts.com/icon" target="_blank" rel="noopener noreferrer">Icon Fonts</a> 
            </div>

            <div className="col-12 list-group-item">
                <a href="https://www.flaticon.com/authors/roundicons-freebies" title="Roundicons Freebies" target="_blank" rel="noopener noreferrer">Roundicons Freebies</a>
            </div>
            
            <div className="col-12 list-group-item">
                <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a>
            </div>
            <div className="col-12 list-group-item">
            All licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0</a>
            </div>
        </div>
    )
}