import React from 'react';


export default class EZSelectOption extends React.Component{
    // props.open ( from 'select' parent ) 
    // props.onChange( from 'select' parent )
    // props.name( from 'select' parent )

    
    // props.value
    // ?props.id
    // ?props.className


    static defaultProps={
        isSelectOption: true
    }

    render(){
        return (
            <label 
            id={this.props.id}
            className={this.props.className}
            >
                <input type="radio"
                onClick={this.props.onChange || this.props.onClick}
                name={this.props.name}
                disabled={this.props.disabled}
                value={this.props.value || ""}
                style={{display: "none"}}
                data-index={this.props.childIndex}
                />

                {this.props.children}
            </label>
        )
    }
}