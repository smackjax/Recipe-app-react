import React from 'react';
import RecipeDetails from '../recipe-details/recipe-details.component';

export default (props)=>{
    const allRecipes = props.recipes;
    let selectedRecipe = false;
    for(let recipe of allRecipes){
        if(recipe.id === props.recipeId){
            selectedRecipe = {...recipe};
        }
    }

    return <RecipeDetails recipe={selectedRecipe} 
                myUserId={props.myUserId}  
                handleSave={props.handleSave}
                handleDelete={props.handleDelete}
            />
    
}