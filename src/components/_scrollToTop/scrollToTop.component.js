import React from 'react';

export default class ScrollToTop extends React.Component{
    // props.scrollSwitch

    componentDidMount(){

            window.scrollTo(0, 0);
        
    }

    componentwillReceiveProps(newProps){
        if(newProps.scrollSwitch !== this.props.scrollSwitch){
            window.scrollTo(0, 0);
        }
    }
    render(){
        return this.props.children || <span>span</span>;
    }
}