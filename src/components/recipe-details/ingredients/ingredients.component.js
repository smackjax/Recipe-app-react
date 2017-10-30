import React from 'react';

export default class Ingredients extends React.Component {
    // props.setState
    // props.editing
    // props.ingredients

    // Ingredient Handling

    state={
        invalid: true,
    }
    handleChange(e){
        const newStr = e.target.value;
        if(newStr.trim().length > 0){ this.setState({invalid: false})}
        else {this.setState({invalid: true})}
    }
    handleNewIng(e){
        e.preventDefault();
        const newString = e.target.newIngredient.value;
        const newIngs = [...this.props.ingredients, newString];
        // Sets ingredients on PARENT setState
        this.props.setState({  ingredients: newIngs,   });
        // Sets THIS state
        this.setState({  invalid: true   })
        e.target.reset();
    }

    handleEdit(e) {
        // data attributes must be lowercase
        const ingIndex = e.target.dataset.ingx;
        const ingString = e.target.value;
        const newIngs = [...this.props.ingredients];
        newIngs[ingIndex] = ingString;
        this.props.setState({ingredients: newIngs});
    }
    handleDelete(e) {
        const ingIndex = e.target.dataset.ingx;
        const newIngs = [...this.props.ingredients];
        newIngs.splice(ingIndex, 1);
        this.props.setState({ingredients: newIngs});
    }

    render(){
        const btnColor = this.state.invalid ?
        "" : "btn-success";
        return(
            <div className="container-fluid">
                <div className="row recipe-section-header">
                    <div className="col-12">
                        <h5>INGREDIENTS</h5>
                    </div>
                </div>
                
                
                { // Ingredients not editing 
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
                    this.props.ingredients.map((ing, ingIx)=>(
                    <div 
                    key={'ingredient'+ingIx}
                    className="input-group col-12 mb-3">
                        <span className="input-group-btn">
                            <button 
                                data-ingx={ingIx}
                                onClick={this.handleDelete.bind(this)}
                                className="btn btn-sm btn-danger">
                                    <i className="fa fa-times"></i>
                            </button>
                        </span>
                            
                        <input type="text"
                        data-ingx={ingIx}
                        onChange={this.handleEdit.bind(this)}
                        className="form-control"
                        value={ing}
                        />
                    </div>

                ))}
                </div>
                
                { // New ingredient controls
                (this.props.editing === true) && ( 
                        <form 
                        className="row"
                        onSubmit={this.handleNewIng.bind(this)}>
                            <div className="input-group col-12">
                                <input 
                                name="newIngredient"
                                type="text" 
                                onChange={this.handleChange.bind(this)}
                                className="form-control" 
                                placeholder="New ingredient"/>
                                <span 
                                className="input-group-btn">
                                    <button 
                                    disabled={this.state.invalid}
                                    className={"btn "+btnColor}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                )}
            </div>
        )
    }
}