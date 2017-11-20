import React from 'react';
import uniqid from 'uniqid';

// Components 
import RecipeDetailsHeader from './_header/recipe-details-header.component';
import RecipeTypeSelect from '../_recipe-type-select/recipe-type-select.component';

import Dropdown from '../_dropdown/dropdown.component';
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
        errors: [],
        editing: true,
        id: '',
        ownerId: '',
        name: "",
        recipeType: '',
        ovenTemp: '',
        cookTime: '',
        ingredients: [],
        steps: []
    }
    
    // Set whether recipe is new or retrieved
    componentDidMount(){
        // recipe also container userInfo obj
            // TODO leaving userInfo blank for 
            // now to easily check in recipe header

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
                ownerId: this.props.myUserId,
                userInfo: {}
            });
        } 
    }

    startEditing(){ this.setState({editing: true}) }
    // Sets isNew on save to change routing button
    stopEditing(){ this.setState({ editing: false, isNew: false }) }

    saveRecipe(){
        // Creates new recipe from relevant state
        const newRecipe = { 
            id : this.state.id,
            ownerId: this.state.ownerId,
            name: this.state.name,
            ovenTemp : this.state.ovenTemp,
            cookTime : this.state.cookTime,
            ingredients : this.clearEmpty(this.state.ingredients),
            steps : this.clearEmpty(this.state.steps),
            recipeType : this.state.recipeType
        };
        // Gets any error names
        const errorList = this.checkForErrors(newRecipe);
        if(errorList.length > 0){
            // If there are errors, just set state
            this.setState({
                errors: errorList,
                // spreads new values(like cleared lists)
                ...newRecipe
            });
        } else {
            // If no errors, sends new recipe for app state/Local data/Server Data
            this.stopEditing();
            this.props.handleSave(newRecipe);
        }
    }

    deleteRecipe(){ this.props.handleDelete(this.state.id) }

    // UTILITY Functions
    // clears empty strings
    clearEmpty(arr){
        return arr.filter(item=>{
            return item.trim() !== "";
        });
    }
    
    checkForErrors(recipeObj){
        // Extracts all required values
        const {name, recipeType, ingredients, steps} = recipeObj;
        
        // The error rules
        const nameError = (name === "");
        const recipeTypeError = (recipeType === "");
        const ingredientsError = (ingredients.length <= 0);
        const stepsError = (steps.length <= 0);

        // error rules with their names
        const errorTypes =[
            { name: "name",
            hasError: nameError },
            { name: "recipeType",
            hasError: recipeTypeError },
            { name: "ingredients",
            hasError: ingredientsError },
            { name: "steps",
            hasError: stepsError },
        ]

        // Only adds error names if they have an error
        const errors = errorTypes.filter(
            errorType=>errorType.hasError
        ).map(
            errorType=>errorType.name
        );
        
        return errors;
    }

    // Recipe details handling
    handleName(e){ 
        const newErrors = this.state.errors.filter(
            errorName => errorName !== "name");
        this.setState({
            errors: newErrors,
            name: e.target.value 
        });
    }
    handleRecipeType(e){ 
        const newErrors = this.state.errors.filter(
            errorName => errorName !== "recipeType"
        );
        this.setState({
            errors: newErrors,
            recipeType: e.target.value 
        });
    }
    handleOvenTemp(e){ this.setState({ovenTemp: e.target.value}) }
    handleCookTime(e){ this.setState({cookTime: e.target.value}) }
    handleIngredients(newIngList){ 
        const newErrors = this.state.errors.filter(
            errorName => errorName !== "ingredients"
        );
        this.setState({
            errors: newErrors,
            ingredients: newIngList
        }); 
    }
    handleSteps(newStepList){ 
        const newErrors = this.state.errors.filter(
            errorName => errorName !== "steps"
        );
        this.setState({
            errors: newErrors,
            steps: newStepList 
        }); 
    }

    render(){
        const setState = this.setState.bind(this);
        const editing = this.state.editing;

        const errorList = this.state.errors;

        return (
            <div>
                {<RecipeDetailsHeader 
                userInfo={this.state.userInfo}
                editing={this.state.editing}

                isNew={this.props.isNew}
                handleCancel={this.stopEditing.bind(this)}                
                handleSave={this.saveRecipe.bind(this)}
                newRecipeId={this.state.id}
                
                canEdit={this.state.ownerId === this.props.myUserId}
                handleEdit={this.startEditing.bind(this)}
                handleDelete={this.deleteRecipe.bind(this)}
                />}
                
                <Dropdown 
                open={true} >
                <div className="container">
                <div className="row">
                    {  errorList.includes('name') && (
                        <div
                        className="col-12 alert alert-danger"> 
                            Name required.
                        </div>
                    )}
                    { errorList.includes("recipeType") && (
                        <div className="col-12 alert alert-danger">
                            Recipe type required.
                        </div>
                    )}
                    { errorList.includes("ingredients") &&
                    <div className="col-12 alert alert-danger">
                        At least one ingredient required.
                    </div>
                    }
                    {errorList.includes("steps") &&
                    <div className="col-12 alert alert-danger">
                        At least one step is required.
                    </div>
                    }
                </div>
                </div>
                </Dropdown>

                <div className="container-fluid recipe-details-page">

                    <hr />
                    
                    <Name
                    invalid={this.state.errors.includes('name')}
                    placeholder="New recipe name"
                    value={this.state.name}
                    recipeType={this.state.recipeType}
                    editing={editing}
                    onChange={this.handleName.bind(this)}/>

                    { editing && (
                        <RecipeTypeSelect
                        invalid={this.state.errors.includes("recipeType")}
                        placeholderTxt="Choose recipe type"
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
                    invalid={this.state.errors.includes("ingredients")}
                    ingredients={this.state.ingredients}
                    editing={editing}
                    onChange={this.handleIngredients.bind(this)}/>

                    <hr />
                    <Steps 
                    invalid={this.state.errors.includes("steps")}
                    steps={this.state.steps}
                    editing={editing}
                    setState={setState}
                    onChange={this.handleSteps.bind(this)} />
                </div>
            </div>
        )
    }
}
export default RecipePage;
