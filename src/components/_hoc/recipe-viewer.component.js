import React from 'react';
import { getAllRecipes } from '../../App-state-functions';
import RecipeList from '../_recipe-list/recipe-list.component';
import RecipeDetails from '../recipe-details/recipe-details.component';


// This either shows individual recipe or path component(recipe dash or 'following' user)
export default class RecipeViewer extends React.Component {
    // props.cooks (array of objects with 'recipes' prop, populates main list)
    // props.component (to return when not looking at recipe details)
    // props.componentProps ({})
    // props.userId (this user's id)
    // props.handleSave()
    // props.handleDelete()

    state={
        
        allRecipes: [],
        extractingRecipes: true,
        currentRecipe: false
    }

    // Generates list to be built based on friendId
    componentDidMount(){
        // Extracts all recipes from list
        // Made async to show loading spinner
            // in case it takes some time with a bigger list
        getAllRecipes(this.props.cooks, 
            this.setBuildingRecipes.bind(this)
        )
        .then((extractedRecipes)=>{
            // Sets both filters on at first
            const activeFilters =  ['personal', 'following']
            console.log("new recipes: ", extractedRecipes);
            this.setState({
                // Holds all recipes from this user and all 'friends'
                allRecipes: extractedRecipes,
                // Holds recipes being shown
                activeRecipes: extractedRecipes,
                // Active filters filtering allRecipes
                activeFilters
            });
        });
    }

    // Handles loading spinner state
    setBuildingRecipes(status){
        this.setState({extractingRecipes: status});
    }

    setActiveRecipe(recipe){
        this.setState({currentRecipe: recipe});
    }
    clearActiveRecipe(){
        this.setState({currentRecipe: false});
    }

    render(){
        const MainComponent = this.props.component;

        const BuiltComponent = this.state.extractingRecipes ?
            // If building list, return loading spinner in place of recipe list
            ()=><div style={{display: "flex", flexDirection: "column"}}>
                    <i style={{alignSelf: "center", fontSize: "2rem", margin: "5px 0px"}} className="fa fa-spinner animated-loading-spin"></i>
                </div> :
                // If recipes extracted built, return recipe list component
                ()=><RecipeList 
                recipes={this.state.allRecipes}   
                setActiveRecipe={this.setActiveRecipe.bind(this)}/>


        // Uses base url for 'back' button link
        if(this.state.currentRecipe){
            return <RecipeDetails
                recipe={this.state.currentRecipe}
                myUserId={this.props.userId}

                handleSave={this.props.handleSave}
                handleDelele={this.props.handleDelete}
                clearActiveRecipe={this.clearActiveRecipe.bind(this)}
            />
        }

        // Returns either recipe dashboard or 'following' details page
        return <MainComponent
            {...this.props.componentProps}
            myUserId={this.props.myUserId}
            allRecipes={this.state.allRecipes}
            recipeListComponent={BuiltComponent}
        />
    }
}