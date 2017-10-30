import React from 'react';
import './friend-search.style.css';

export default class FriendSearch extends React.Component{
    // handleDelete
    // props.handleSearch

    state={
        invalid: true
    }

    handleChange(e){
        const cString = e.target.value;
        if(cString.trim() !== ''){
            this.setState({invalid: false});
        } else {
            this.setState({invalid: true});
        }
    }
    
    handleSubmit(e){
        e.preventDefault();
        const searchString = 
            e.target.usernameSearch.value;
        e.target.reset();
        this.props.handleSearch(searchString);
        this.setState({invalid: true});
    }

    render(){
        const btnColorClass = this.state.invalid ? '' : ' btn-success'
        return (
        <div className="friend-searchbar">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-group">
                    <input 
                    onChange={this.handleChange.bind(this)}
                    name="usernameSearch"
                    type="text" 
                    className="form-control" 
                    placeholder="Search for username"/>
                    <span className="input-group-btn">
                        <button 
                        disabled={this.state.invalid}
                        type="submit"  
                        className={"btn" + btnColorClass}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                </div>
            </form>
        </div>
    )}
}
