import React from 'react';

export default class EditingStepItem extends React.Component {
    // props.stepIndex
    // props.value
    // props.onChange
    // props.className
    handleChange(e){
        this.props.onChange(e);
    }
    componentDidUpdate(){
        const textElement =
            document.getElementById('step-text-area' + this.props.stepIndex);
        textElement.style.height = 
            (textElement.scrollHeight + 2) + 'px';
    }
    componentDidMount(){ 
        const textElement =
            document.getElementById('step-text-area' + this.props.stepIndex);
        textElement.style.height = 
            (textElement.scrollHeight + 2) + 'px';
    }

    render(){
        const areaId = 'step-text-area' + this.props.stepIndex;
        return (
            <textarea 
            id={areaId}
            data-stepindex={this.props.stepIndex}
            onChange={this.handleChange.bind(this)}
            placeholder="This step will be removed if left blank"
            value={this.props.value}
            className={this.props.className}></textarea>
        )
    }
}