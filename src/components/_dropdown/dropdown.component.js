import React from 'react';
import './dropdown.style.css';

// (TODO) might be worth optimizing with shouldComponentUpdate
export default class DropdownComponent extends React.Component{
    // props.open
    constructor(){
        super();
        this.adjustHeight = this.adjustHeight.bind(this);
    }
    state={
        currentHeight: '0px'
    }
    componentDidMount(){
         this.adjustHeight(this.props.open);
    }

    // Handles prop based adjustments
    componentWillReceiveProps(newProps){
        this.adjustHeight(newProps.open);
    }

    // Handles child based adjustments(TODO test this)
    componentDidUpdate(newProps){

        this.adjustHeight(newProps.open);
    }

    adjustHeight(isOpen){
        const dropdownElem = this.dropdownElem;
        
        let maxOpenHeight = '0px';

        if(dropdownElem){
            maxOpenHeight = dropdownElem.scrollHeight + "px";
        }

        // If 'open' set the dropdown max height to maximum
        const newDropHeight = isOpen ? 
            maxOpenHeight :
                '0px';

        // prevents an infinite loop from componentDidUpdate
        if(newDropHeight !== this.state.currentHeight){
            this.setState({ currentHeight: newDropHeight });    
        }
    }

    render(){
        const maxHeight = {maxHeight: this.state.currentHeight};
        const dropClasses = "ez-dropdown " + (this.props.className || "" );
        return (
            <div 
            className={dropClasses} 
            style={maxHeight}
            ref={(dropdownElem)=>{this.dropdownElem = dropdownElem}}
            >
                {this.props.children}
            </div>
        )
    }
}