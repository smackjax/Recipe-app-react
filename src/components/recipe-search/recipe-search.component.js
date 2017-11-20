import React from 'react';
import {Redirect} from 'react-router-dom';
import { getAllRecipes } from '../../App-state-functions';
import RecipeDetails from '../recipe-details/recipe-details.component';
import LoadingSpinner from '../_loading-spinner/loading-spinner.component';

export default class RecipeSearch extends React.Component{
    // props.cooks (array of objects with 'recipes' prop, populates main list)
    // props.myUserId
    // props.match.params.id
    // props.history
    // props.handleSave()
    // props.handleDelete()

    state={
        isNew: false,
        allRecipes: [],
        selectedRecipe: false,
        noRecipe: false
    }

    // Sets to new recipe based on param === 'new'
    // OR generates list to be built based on userids and finds recipe id
    componentDidMount(){
        const paramRecipeId = this.props.match.params.id;
        if(paramRecipeId === "new"){
            this.setState({
                isNew: true
            })
        } else {
            // Extracts all recipes from list
            // Made async to show loading spinner
            getAllRecipes(this.props.cooks)
            .then((extractedRecipes)=>{
                const selectedRecipe = extractedRecipes.filter(
                    recipe=>{ return recipe.id === paramRecipeId}
                );
                // If this finds a recipe
                if(selectedRecipe.length > 0){
                    this.setState({
                        selectedRecipe: selectedRecipe[0]
                    });
                // If no recipe with that id
                } else {
                    this.setState({noRecipe: true});
                }
            });
        }
    }

    
    render(){
        // If there is a recipe found, display it
        if(this.state.selectedRecipe){
            return <RecipeDetails 
            recipe={this.state.selectedRecipe}
            {...this.props}
            />
        }
        if(this.state.isNew){
            return <RecipeDetails 
            isNew={this.state.isNew}
            newId
            {...this.props}
            />
        }
        // If no recipe was found, redirect to dashboard
        if(this.state.noRecipe){
            return <Redirect to="/recipe-dash" />
        }
        // Else display a loading spinner
        return <LoadingSpinner />
    }
}