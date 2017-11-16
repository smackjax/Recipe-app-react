import React from 'react';

export default class Ingredients extends React.Component {
    // props.invalid
    // props.setState
    // props.onChange
    // props.editing
    // props.ingredients

    // Ingredient Handling

    state={
        ingredients: [],
    }

    // Adds a new empty string to incoming ingredients list, 
    // for initializing new ingredient
    componentWillReceiveProps(newProps){
        const newIngredients = [...newProps.ingredients, ""];
        this.setState({ ingredients: newIngredients });
    }


    handleChange(e){
        // data attributes must be lowercase
        const ingIndex = e.target.dataset["ingindex"];
        const ingString = e.target.value;
        // Uses prop ingredients instead of 'state' 
        // to not have to delete added 'new recipe' input
        const newIngs = [...this.props.ingredients];
        newIngs[ingIndex] = ingString;
        this.props.onChange(newIngs);
    }

    handleDelete(e) {
        const ingIndex = e.target.dataset["ingindex"];
        const newIngs = [...this.props.ingredients];
        newIngs.splice(ingIndex, 1);
        this.props.onChange(newIngs);
    }


    render(){

        const invalidStyle = this.props.invalid ?
            {borderColor: "#d9534f"} : {};
        return(
            <div className="container-fluid">
                <div className="row recipe-section-header">
                    <div
                    style={this.props.invalid ? {color: "#d9534f"}: {}}
                    className="col-12">
                        <h5>INGREDIENTS</h5>
                    </div>
                </div>
                 
                { // Ingredients while not editing 
                !this.props.editing && 
                <ul className="list-group">
                    { this.props.ingredients.map((ing, ingIx)=>(
                        <li
                        key={'ingredient'+ingIx}
                        className="row list-group-item">              
                            {ing}
                        </li>
                    ))}
                </ul>
                }

                <div className="row no-gutters mt-1 mb-1">
                { // Ingredients while editing
                this.props.editing && 
                    this.state.ingredients.map((ing, ingIx)=>{
                    const isLast = (ingIx === this.state.ingredients.length - 1);
                    return (
                    <div 
                    key={'ingredient'+ingIx}
                    className="input-group col-12 mb-3">
                        { !isLast &&(
                        <span className="input-group-btn">
                            <button 
                                data-ingindex={ingIx}
                                onClick={this.handleDelete.bind(this)}
                                className="btn btn-sm btn-danger">
                                    <i className="fa fa-times"></i>
                            </button>
                        </span>
                        )}
                            
                        <input type="text"
                        style={invalidStyle}
                        placeholder={isLast ? "New ingredient" : "Deleted if left blank" }
                        data-ingindex={ingIx}
                        onChange={this.handleChange.bind(this)}
                        className="form-control"
                        value={ing}
                        />
                        
                        { isLast &&(
                        <span 
                        className="input-group-addon">
                            <i className="fa fa-plus"></i>
                        </span>
                        )}
                    </div>
                    )
                })
                }
                </div>
            </div>
        )
    }
}
