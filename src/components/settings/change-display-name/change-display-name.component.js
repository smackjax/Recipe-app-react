import React from 'react';

export default class ChangeDisplayName extends React.Component{
    state={
        invalid: true
    }

    handleDisplayNameChange(e){
        const newName = e.target.value;
        if(newName.length === 0){
            this.setState({invalid: true});
        } else {
            this.setState({invalid: false});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const newDisplayName = e.target[this.props.name].value;
        this.props.onSubmit(newDisplayName);
        e.target.reset();
    }
    render(){
        const btnClass = this.state.invalid ? 
            'btn btn-secondary' : 
            'btn btn-success';
        return (                
            <form className="row " onSubmit={this.handleSubmit.bind(this)}>
                <div
                className="col-12 mt-2">
                    <label htmlFor="change-display-name-input">Change display name</label>
                    <div className="input-group">
                        <input 
                        onChange={this.handleDisplayNameChange.bind(this)}
                        name={this.props.name} 
                        id="change-display-name-input"
                        type="text" 
                        className="form-control" 
                        placeholder={this.props.placeholder} />
                        
                        <span
                        className="input-group-btn">
                            <button
                            type="submit" 
                            disabled={this.state.invalid}
                            className={btnClass} >
                                <i className="fa fa-check"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </form>
            
        )
    }
}