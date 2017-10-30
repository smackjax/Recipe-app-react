import React from 'react';

import DynamicHeightTextarea from './dynamic-textarea.component';

import './steps.style.css';


export default (props)=>{
    // *props.setState !IMPORTANT set state for the parent is passed in and used, not 'this' state
    // props.steps
    // props.editing

   const handleNewStep = (e)=>{
        e.preventDefault();
        const newStep = e.target.newStep.value.trim();
        if(newStep !== ''){
            const newSteps = [...props.steps, newStep];
            props.setState({steps: newSteps});
        }
        e.target.reset();
    }
    const handleEdit = (e)=>{
        const newString = e.target.value;
        const stepIndex = e.target.dataset.stepindex;
        const newSteps = [...props.steps];
        newSteps[stepIndex] = newString;
        
        // Set steps on PARENT
        props.setState({steps: newSteps});
    }
    const handleMove = (stepIndex, direction)=>{       
            const newIndex = stepIndex + direction;
            const newSteps = [...props.steps];
            const step = newSteps.splice(stepIndex, 1)[0];
            newSteps.splice(newIndex, 0, step);
            props.setState({
                steps: newSteps
            });
    }
    // Move functions have to be closures(preloaded) in order to work
    const moveUp = (stepIndex)=>{
        return ()=>{ handleMove(stepIndex, -1); }
    }
    const moveDown = (stepIndex)=>{
        return ()=>{ handleMove(stepIndex, 1); }
    }


    const handleDelete = (e)=>{
        const stepIndex = e.target.value;
        const newSteps = [...props.steps];
        newSteps.splice(stepIndex, 1);
        props.setState({steps: newSteps});
    }


    return (
        <div className="container">
            <div className="row recipe-section-header">
                <div className="col-12 mb-2">
                    <h5>COOKING STEPS</h5>
                </div>
            </div>
            
            { props.steps.map((step, stepIx)=>(
                props.editing ?
                // If editing
                <div 
                key={"step-edit-"+stepIx}
                className="row mb-3">      


                    <button 
                    onClick={handleDelete}
                    value={stepIx}
                    className="col-2 btn btn-sm btn-outline-danger">
                        <i className="fa fa-times"></i>
                    </button>

                    <div className="offset-1 col-2 center-v">
                        <b>{stepIx + 1}</b>
                    </div>

                    <button 
                    onClick={moveUp(stepIx)}
                    disabled={stepIx === 0}
                    className="offset-2 col-2 btn btn-secondary">
                        <i className="fa fa-chevron-up"></i>
                    </button>

                    <button 
                    onClick={moveDown(stepIx)}
                    disabled={(stepIx + 1) === props.steps.length}
                    className="offset-1 col-2 btn btn-secondary">
                        <i className="fa fa-chevron-down"></i>
                    </button>


                    <DynamicHeightTextarea 
                    onChange={handleEdit}
                    value={step}
                    className="col-12 form-control"
                    stepIndex={stepIx}
                    />
                </div>
                :  // Not editing
                <div key={"step"+stepIx} className="row recipe-step mb-2">
                    <div className="col-12">
                        <p><b>{(stepIx + 1)}.</b> {step}</p>
                    </div>
                </div>
            ))}
               
            
            { props.editing && // New step controls
            <form className="row form-inline" onSubmit={handleNewStep}>
                <textarea 
                name="newStep"
                placeholder="New step instructions..."
                rows="3" 
                className="col-12 form-control"></textarea>
    
                <button
                type="submit"
                className="offset-5 col-2 btn btn-secondary btn-sm">
                    <i className="fa fa-plus"></i>
                </button>
            </form>   
            }

        </div>
    )
}