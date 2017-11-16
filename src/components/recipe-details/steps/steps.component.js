import React from 'react';

import DynamicHeightTextarea from './dynamic-textarea.component';

import './steps.style.css';

export default class RecipeSteps extends React.Component {
    // props.invalid
    // props.steps
    // props.editing
    // props.onChange
    state={
        steps: []
    }

    // Adds blank string value to steps for 'new' step
    componentWillReceiveProps(newProps){
        const newSteps = [...newProps.steps, ""];
        this.setState({steps: newSteps});
    }

    handleEdit(e){
        const newString = e.target.value;
        const stepIndex = e.target.dataset.stepindex;
        const newSteps = [...this.props.steps];
        newSteps[stepIndex] = newString;
        
        this.props.onChange(newSteps)
    }

    handleDelete(e){
        const stepIndex = e.target.dataset.stepindex;
        const newSteps = [...this.props.steps];
        newSteps.splice(stepIndex, 1);
        this.props.onChange(newSteps);
    }

    render(){
    return (
        <div className="container">
            <div className="row recipe-section-header">
                <div
                style={this.props.invalid ? {color: "#d9534f"}: {}}
                className="col-12 mb-2">
                    <h5>COOKING STEPS</h5>
                </div>
            </div>
            
            { this.state.steps.map((step, stepIx)=>{
                const isLast = (stepIx === this.state.steps.length -1);
                return this.props.editing ?
                // If editing
                <div 
                key={"step-edit-"+stepIx}
                className="row mb-3">      

                    { !isLast &&
                    <button 
                    onClick={this.handleDelete.bind(this)}
                    data-stepindex={stepIx}
                    className="col-2 btn btn-sm btn-outline-danger mb-1">
                        <i className="fa fa-times"></i>
                    </button>}

                    <div className={"col-2 center-v " + (!isLast ? "offset-1" : "")}>
                        <b>{isLast ? "New" : (stepIx + 1)}</b>
                    </div>

                    <DynamicHeightTextarea 
                    style={this.props.invalid ? {borderColor: "#d9534f"}: {}}
                    onChange={this.handleEdit.bind(this)}
                    value={step}
                    className="col-12 form-control"
                    stepIndex={stepIx}
                    placeholder={isLast ? "New step" : "Deleted if left blank"}
                    />
                </div> :

                // Not editing
                <div key={"step"+stepIx} className="row recipe-step mb-2">
                    <div className="col-12">
                        <p><b>{(stepIx + 1)}.</b> {step}</p>
                    </div>
                </div>
            })}
               

        </div>
    )}
    
}


    // Removing (move) buttons for now,
    // there is a problem with these methods
    // handleMove(stepIndex, direction){
        
    //         const newIndex = stepIndex + direction;
    //         const newSteps = [...this.props.steps];

    //         const newStepString = newSteps.splice(stepIndex, 1)[0];
    //         newSteps.splice(newIndex, 0, newStepString);
            
    //         this.props.onChange(newSteps);
    // }

    // moveUp(e){
    //     const stepIndex = parseInt(e.target.dataset.stepindex, 10);
    //     this.handleMove(stepIndex, -1);
    // }
    // moveDown(e){
    //     const stepIndex = parseInt(e.target.dataset.stepindex, 10);
    //     this.handleMove(stepIndex, 1);
    // }
