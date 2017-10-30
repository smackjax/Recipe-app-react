import React from 'react';
import uniqid from 'uniqid';


export default class DropdownComponent extends React.Component{
    // props.open
    state={
        dropdownId: ''
    }
    componentDidMount(){
        const newDropId = uniqid('dropdown-');
        this.setState({
            dropdownId: newDropId
        });
    }
    render(){
        const dId = this.state.dropdownId;
        const dropdownElem = document.getElementById(dId);
        let maxHeightStyle = '0px';
        if(dropdownElem){
            maxHeightStyle = dropdownElem.scrollHeight + "px";
        }
        // If 'open' set the dropdown max height to most possible
        const currentDropHeight = this.props.open ? 
            maxHeightStyle :
                '0px';
        const dropStyle={
            overflow: 'hidden',
            maxHeight: currentDropHeight, 
            transition: 'max-height .5s ease'
        };
        return (
            <div style={dropStyle} id={this.state.dropdownId}>
                {this.props.children}
            </div>
        )
    }
    
}