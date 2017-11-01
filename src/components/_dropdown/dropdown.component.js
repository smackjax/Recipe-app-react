import React from 'react';
import uniqid from 'uniqid';


export default class DropdownComponent extends React.Component{
    // props.open
    constructor(){
        super();
        this.adjustHeight = this.adjustHeight.bind(this);
    }
    state={
        dropdownId: '',
        dropStyles: {
            overflow: 'hidden',
            maxHeight: '0px', 
            transition: 'max-height .5s ease'
        }
    }
    componentDidMount(){
        const newDropId = uniqid('dropdown-');
        this.setState({
            dropdownId: newDropId
        });
    }
    componentWillReceiveProps(newProps){
        
        this.adjustHeight(newProps.open);

    }
    adjustHeight(isOpen){
        const dId = this.state.dropdownId;
        const dropdownElem = document.getElementById(dId);
        let maxHeightStyle = '0px';
        if(dropdownElem){
            maxHeightStyle = dropdownElem.scrollHeight + "px";
        }
        // If 'open' set the dropdown max height to most possible
        const currentDropHeight = isOpen ? 
            maxHeightStyle :
                '0px';
        
        this.setState({
            dropStyles: {...this.state.dropStyles, maxHeight: currentDropHeight}
        }); 
    }

    render(){
        return (
            <div className={this.props.className} style={this.state.dropStyles} id={this.state.dropdownId}>
                {this.props.children}
            </div>
        )
    }
}