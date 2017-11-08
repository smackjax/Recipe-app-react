import React from 'react';
import uniqid from 'uniqid';
import './dropdown.style.css';

export default class DropdownComponent extends React.Component{
    // props.open
    constructor(){
        super();
        this.adjustHeight = this.adjustHeight.bind(this);
    }
    state={
        dropdownId: '',
        currentHeight: '0px'
    }
    componentDidMount(){
        const newDropId = uniqid('dropdown-');
        this.setState({
            dropdownId: newDropId
        }, ()=>{
            this.adjustHeight(this.props.open);
        });
    
    }
    componentWillReceiveProps(newProps){
        this.adjustHeight(newProps.open);
    }

    adjustHeight(isOpen){
        const dId = this.state.dropdownId;
        const dropdownElem = document.getElementById(dId);
        let maxOpenHeight = '0px';
        if(dropdownElem){
            maxOpenHeight = dropdownElem.scrollHeight + "px";
        }
        // If 'open' set the dropdown max height to maximum
        const newDropHeight = isOpen ? 
            maxOpenHeight :
                '0px';
        
        this.setState({ currentHeight: newDropHeight }); 
    }

    render(){
        const maxHeight = {maxHeight: this.state.currentHeight};
        const dropClasses = "ez-dropdown " + (this.props.className || "" );
        return (
            <div 
            className={dropClasses} 
            style={maxHeight} 
            id={this.state.dropdownId}>
                {this.props.children}
            </div>
        )
    }
}