import React from 'react';

export default (props)=>{
    // props.value
    // props.name
    // props.onSubmit
    // props.onChange
    // props.placeholder
    const handleSubmit=(e)=>{
        e.preventDefault();
        const textValue = e.target[props.name].value;
        props.onSubmit(textValue);
        e.target.reset();
    }
    return (
        <div
        className="row">
            <div className="col-12">{props.currentVal}</div>
            <form className="col-12 form-inline" onSubmit={handleSubmit}>
            <div className="input-group">
                <input 
                onChange={props.onChange}
                name={props.name} type="text" className="form-control" placeholder={props.placeholder} />
                <button type="submit" className="input-group-addon btn-success" id="basic-addon1">
                    <i className="fa fa-check"></i>
                </button>
            </div>
        </form>
        </div>
    )
}