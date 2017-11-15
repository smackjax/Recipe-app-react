import React from 'react';
import uniqid from 'uniqid';

// Components 
import RecipeDetailsHeader from './_header/recipe-details-header.component';
import RecipeTypeSelect from '../_recipe-type-select/recipe-type-select.component';

import Name from './name/name.component';
import CookTime from './cook-time/cook-time.component';
import OvenTemp from './oven-temp/oven-temp.component';
import Ingredients from './ingredients/ingredients.component';
import Steps from './steps/steps.component';

// Style 
import './recipe-details.style.css';

class RecipePage extends React.Component{
    /*
    props:
        handleSave(newRecipe)
        handleDelete(recipeId)
        isNew: bool, (for new recipe creation)
        myUserId,
        canEdit: bool,
        recipe ={ id, 
            name, 
            ovenTemp: string,
            ingredients: string[],
            steps: string[]
        }
    */

    state={
        editing: true,
        id: '',
        ownerId: '',
        name: 'New recipe',
        recipeType: '',
        ovenTemp: '',
        cookTime: '',
        ingredients: [],
        steps: []
    }
    
    // Set whether recipe is new or retrieved
    componentDidMount(){
        const recipe = this.props.recipe;
        if(recipe) {
            this.setState({
                ...recipe,
                editing: false,
            });
        } else {
            const newId = uniqid('r-');
            this.setState({
                isNew: true,
                id: newId,
                ownerId: this.props.myUserId
            });
        } 
    }

    startEditing(){
        this.setState({editing: true});
    }
    stopEditing(){
        this.setState({
            editing: false,        
            isNew: false
        });
    }
    saveRecipe(){
        this.stopEditing();

        // Creates new recipe from relevant state
        // *Note: destructuring was tempting, but was more verbose.
        // I think this looks a lot cleaner
        const newRecipe = { 
            id : this.state.id,
            ownerId: this.state.ownerId,
            name: this.state.name,
            ovenTemp : this.state.ovenTemp,
            cookTime : this.state.cookTime,
            ingredients : this.state.ingredients,
            steps : this.state.steps,
            recipeType : this.state.recipeType
        };

        // Sends new recipe to for app state/Local data/Server Data
        this.props.handleSave(newRecipe);
    }

    deleteRecipe(){
      this.props.handleDelete(this.state.id);
    }

    handleName(e){ this.setState({ name: e.target.value }) }
    handleRecipeType(e){ this.setState({ recipeType: e.target.value }) }
    handleOvenTemp(e){ this.setState({ovenTemp: e.target.value}) }
    handleCookTime(e){ this.setState({cookTime: e.target.value}) }
    

    render(){
        const setState = this.setState.bind(this);
        const editing = this.state.editing;
        return (
            <div>
                {<RecipeDetailsHeader 
                editing={this.state.editing}

                isNew={this.props.isNew}
                handleCancel={this.stopEditing.bind(this)}                
                handleSave={this.saveRecipe.bind(this)}
                newRecipeId={this.state.id}
                
                canEdit={this.state.ownerId === this.props.myUserId}
                handleEdit={this.startEditing.bind(this)}
                handleDelete={this.deleteRecipe.bind(this)}
                />}

                <div className="container-fluid recipe-details-page">

                    <hr />
                    
                    <Name 
                    name={this.state.name}
                    recipeType={this.state.recipeType}
                    editing={editing}
                    onChange={this.handleName.bind(this)}/>

                    { editing && (
                        <RecipeTypeSelect 
                        placeholder="Choose recipe type"
                        currentType={this.state.recipeType}
                        onChange={this.handleRecipeType.bind(this)}
                        className="mb-3"
                        />
                    )}

                    { // Cook time
                        (this.state.cookTime || editing) &&
                        <CookTime 
                        cookTime={this.state.cookTime}
                        editing={editing}
                        onChange={this.handleCookTime.bind(this)}        
                        />
                    }

                    { // If ovenTemp set OR are editing
                        (this.state.ovenTemp || editing) &&
                        <OvenTemp 
                        onChange={this.handleOvenTemp.bind(this)}
                        editing={editing}
                        ovenTemp={this.state.ovenTemp}
                        />
                    }
       
                    <hr />

                    <Ingredients 
                    ingredients={this.state.ingredients}
                    editing={editing}
                    setState={setState}/>

                    <hr />
                    <Steps 
                    steps={this.state.steps}
                    editing={editing}
                    setState={setState}/>
                </div>
            </div>
        )
    }
}
export default RecipePage;
