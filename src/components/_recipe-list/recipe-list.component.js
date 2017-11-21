import React from 'react';
import {getAllRecipes} from '../../App-state-functions';

import LoadingSpinner from '../_loading-spinner/loading-spinner.component';
import RecipeTypeSelect from '../_recipe-type-select/recipe-type-select.component';
import RecipeSearch from './recipe-search/recipe-search.component';
import RecipeCard from './recipe-item-card/recipe-item-card.component';
import './recipe-list.style.css';

export default class RecipeList extends React.Component{
    // props.usersArray
    // props.recipes
    // props.setActiveRecipe
    // ?props.userId (for ownerId comparison)

    state={
        // Holds total built list
        allRecipes: [],
        // Holds extracted list based on filters
        extractedRecipes: [],

        // Holds final recipes to display
        activeRecipes: [],
        currentSearch: "",
        loadingRecipes: true,
        loadRecipesFailed: false,
    }
    
    componentDidMount(){
        if(this.props.usersArray && this.props.usersArray.length > 0){
            this.setRecipes(this.props.usersArray);
        } else if(this.props.recipes){
            this.setState({recipeList: this.props.recipes},
            ()=>{this.setLoading(false)})
        } else {
            this.setState({loadRecipesFailed: true},
            ()=>{ this.setLoading(false) });
        }
    }

    componentWillReceiveProps(newProps){
        this.setRecipes(newProps.usersArray);
    }

    async setRecipes(usersArray){
        // Start loading spinned
        this.setLoading(true);       
            // Get master recipe list
            getAllRecipes(usersArray)
            .then(allRecipes=>{
            // Sort all recipes
            const sortedRecipes = 
                this.alphabetizeRecipes(allRecipes);
            
            // Set both 'all' and 'active' lists
            this.setState({ 
                allRecipes: sortedRecipes,
                extractedRecipes: [...sortedRecipes],
                activeRecipes: [...sortedRecipes],
            }, 
            // stops loading spinner
            ()=>{ this.setLoading(false) });
        })
        .catch(err=>{
            // Set 'failed' flag and stop spinner
            this.setState({loadRecipesFailed: true},
            this.setLoading(false));
            console.log("Error in RecipeList: ", err);
        })
    }


    // Shows/hides loading spinner
    setLoading(status){ 
        this.setState({loadingRecipes: status}); }

    // Sets active recipes based on meal type
    extractRecipesOfType(e){

        const type = e.target.value;
        // Should never get a value that doesn't exist,
        // because the same 'select' component is used to set values
        if(type === 'all'){
            const allRecipes = [...this.state.allRecipes];
            this.setState({     
                extractedRecipes: allRecipes,
                activeRecipes: [...allRecipes],
                currentSearch: ""
            });
        } else {
            const typedRecipes = this.state.allRecipes.filter(
                recipe=>recipe.recipeType === type
            );
            this.setState({
                extractedRecipes: typedRecipes,
                activeRecipes: [...typedRecipes],
                currentSearch: ""
            });
        }
    }

    // Returns list alphabetized by name
    alphabetizeRecipes(recipeList){
        return [...recipeList].sort(
            (rOne, rTwo)=>{
                const nameOne = rOne.name.toUpperCase();   
                const nameTwo = rTwo.name.toUpperCase();
                return (nameOne < nameTwo) ? -1 :
                        (nameOne > nameTwo ) ? 1 :
                            0
            }
        )
    }

    searchByName(e){
        const searchString = e.target.value;
        this.setState({currentSearch: searchString});

        if(searchString.trim() !== ""){
            const recipesToSearch = this.state.extractedRecipes;
            const newActive = recipesToSearch.filter(
                // (rOne, rTwo)=>{
                //     const contains = searchString.toUpperCase();
                //     const nameOne = rOne.name.toUpperCase();   
                //     const searchIndex = nameOne.search(contains);
                    
                //     return (searchIndex < 0 ) ? 1 : -1;
                // }

                recipe=>{
                    const contains = searchString.toUpperCase();
                    const name = recipe.name.toUpperCase();   
                    const searchIndex = name.search(contains);

                    return (searchIndex >= 0);
                }
            );
            this.setState({activeRecipes: newActive});
        } else {
            // allRecipes is alphabetized
            const extractedRecipes = [...this.state.extractedRecipes];
            this.setState({activeRecipes: extractedRecipes});
        }
        
    }

    
    render(){
        // If loading(building recipe list), show spinner
        if(this.state.loadingRecipes){
            return <LoadingSpinner />
        }
        // If there was an error getting recipes, show alert
        // NOTE: This should never happen. Ever. 
        if(this.state.loadRecipesFailed){
            return( 
            <div 
            style={{maxWidth: '300px', margin: '20px auto'}}
            className="alert alert-danger">
                Problem getting recipes
            </div>
        )}
        
        const myUserId = this.props.userId ? 
            this.props.userId : "";


        return (
            <div className="recipe-list friend-recipes">
                <div>
                    <RecipeTypeSelect 
                        placeholderTxt="All"
                        noPlaceholder
                        onChange={this.extractRecipesOfType.bind(this)}
                    />
                    <RecipeSearch 
                    value={this.state.currentSearch}
                    onChange={ this.searchByName.bind(this) }/>

                    
                </div>
                {  // If there are recipes in list
                this.state.activeRecipes.length > 0 ?
                // Map recipe items
                this.state.activeRecipes.map(
                    (recipe, rIndx)=>(
                        <RecipeCard 
                        key={'recipe' + rIndx}
                        userId={myUserId}
                        recipe={recipe} />
                    )
                ) : 
                // If there aren't recipes in list
                <div className="alert text-center">
                    <hr />
                    No recipes to show
                </div>}
            </div>
        )
    }
}