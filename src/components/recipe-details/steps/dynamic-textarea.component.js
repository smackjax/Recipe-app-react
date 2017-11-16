import React from 'react';

export default class EditingStepItem extends React.Component {
    // props.stepIndex
    // props.value
    // props.onChange
    // props.className

    handleChange(e){
        this.props.onChange(e);
    }
    componentDidMount(){ 
        const textElement =
            document.getElementById('step-text-area' + this.props.stepIndex);
        textElement.style.minHeight = 
            textElement.scrollHeight + 'px';
    }
    componentDidUpdate(){
        const textElement =
            document.getElementById('step-text-area' + this.props.stepIndex);
        textElement.style.minHeight = 
            textElement.scrollHeight + 'px';
    }


    render(){
        const areaId = 'step-text-area' + this.props.stepIndex;
        return (
            <textarea 
            style={this.props.style || {}}
            id={areaId}
            data-stepindex={this.props.stepIndex}
            onChange={this.handleChange.bind(this)}
            placeholder={this.props.placeholder}
            value={this.props.value}
            className={"step-text-area " + this.props.className}></textarea>
        )
    }
}