import React from 'react';
import uniqid from 'uniqid';

// Components 
import EditingHeader from './_header/editing.component';
import NotEditingHeader from './_header/not-editing.component';
import RecipeDetailsHeader from './_header/recipe-details-header.component';
import Name from './name/name.component';
import Info from './info/info.component';
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
        ovenTemp: '',
        cookTime: '',
        ingredients: [],
        steps: []
    }
    
    componentDidMount(){
        const recipe = this.props.recipe;
        if(recipe){
            this.setState({
                ...recipe,
                editing: false,

            });
        } else {
            // Generates new id
            const newRecipeId = 
                'u-' + this.props.myUserId + '&' +
                    uniqid('r-');

            this.setState({
                id: newRecipeId,
                ownerId: this.props.myUserId
            });
        }

    }

    startEditing(){
        this.setState({editing: true});
    }
    stopEditing(){
        this.setState({editing: false});
    }
    saveRecipe(){
        this.stopEditing();
        const newRecipe = {
            ...this.state
        };
        delete newRecipe.editing; 

        // Redirects to recipe/(new recipe id) on save to avoid 'cancel' nav wierdness
        this.props.handleSave(newRecipe);
    }
    deleteRecipe(){
      this.props.handleDelete(this.state.id);
    }


    render(){
        const setState = this.setState.bind(this);
        const editing = this.state.editing;
        return (
            <div>

                <RecipeDetailsHeader 
                editing={this.state.editing}

                isNew={this.props.isNew}
                handleCancel={this.stopEditing.bind(this)}                
                handleSave={this.saveRecipe.bind(this)}
                newRecipeId={this.state.id}
                
                canEdit={this.state.ownerId === this.props.myUserId}
                handleEdit={this.startEditing.bind(this)}
                handleDelete={this.deleteRecipe.bind(this)}
                />

                <div className="container-fluid recipe-details-page">

                    <hr />
                    <Name 
                    name={this.state.name}
                    editing={editing}
                    setState={setState}/>

                    {// Info div only displayed if there is info
                        this.state.cookTime !== '' || 
                            this.state.ovenTemp !== '' ? (
                            <Info 
                            ovenTemp={this.state.ovenTemp}
                            cookTime={this.state.cookTime}
                            editing={editing}
                            setState={setState}/>
                        ) : ''
                    }
                    { // Only works outside of component
                        this.state.cookTime !== '' || 
                        this.state.ovenTemp !== '' ? (
                            <hr />
                        ) : ''
                    }
                    


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
