import React from 'react';

import {getAllRecipes} from '../../App-state-functions';

// Page navbar
// import RecipeNav from './nav/recipe-list-nav.component';
import LoadingSpinner from '../_loading-spinner/loading-spinner.component';
import RecipeNav from '../_main-nav/main-nav.component';
import RecipeList from '../_recipe-list/recipe-list.component';
import RecipeSearch from './recipe-search/recipe-search.component';
import RecipeTypeSelect from '../_recipe-type-select/recipe-type-select.component';
import RecipeFilters from './recipe-filters/recipe-filters.component';
import NewRecipeBtn from './new-recipe-btn/new-recipe-btn.component';

export default class RecipeDash extends React.Component {
    // props.userInfo
    // props.friends [{},{},...]


    state={
        extractingRecipes: true,
        allRecipes: [],
        activeRecipes: [],
        activeFilters: [],
    }

    componentDidMount(){
        // Extracts all recipes from list
        // Made async to show loading spinner
            // in case it takes some time with a bigger list

        const allUsers = [
            this.props.userInfo,
            ...this.props.friends
        ];
        const activeFilters =  ['personal', 'following']
        getAllRecipes(allUsers)
        .then((extractedRecipes)=>{
            // Sets both filters on at first
            
            this.setState({
                // Holds all recipes from this user and all 'friends'
                allRecipes: extractedRecipes,
                // Holds recipes being shown
                activeRecipes: extractedRecipes,
                // Active filters filtering allRecipes
                activeFilters,
                // Set done loading
                extractingRecipes: false
            });
            
        })
        .catch(e=>{
            this.setState({
                activeFilters,
                extractingRecipes: false
            });
        });
    }

    // Handles loading spinner state
    setBuildingRecipes(status){
        this.setState({extractingRecipes: status});
    }

    getRecipesFromFilters(filters){
        let newRecipes = [];
        // Gets personal recipes
        if(filters.includes('personal')){
            newRecipes = 
                this.state.allRecipes.filter(r=>r.ownerId === this.props.userInfo.userId);
        }
        // Gets friend recipes
        if(filters.includes('following')){
            newRecipes = [...newRecipes,
                ...this.state.allRecipes.filter(r=>r.ownerId !== this.props.userInfo.userId)];
        }
        return newRecipes;
    }

    setFilter(e){
        const isChecked = e.target.checked;
        const newFilters = isChecked ? 
            [...this.state.activeFilters, e.target.value] :
            this.state.activeFilters.filter((f)=>f !== e.target.value);
        const newRecipeList = this.getRecipesFromFilters(newFilters);
        this.setState({
            activeFilters: newFilters,
            activeRecipes: newRecipeList
        });
    }
    
    // TODO needs work. Two recipes with similar don't go to top
    sortAllBySearch(searchString){
        const newList = [...this.state.allRecipes];
        newList.sort((r1, r2)=>{
            const position1 = r1.name.toLowerCase().search(searchString.toLowerCase());
            const position2 = r2.name.toLowerCase().search(searchString.toLowerCase());
            if(position1 >= 0 && position2 >=0 ){return -1}
            if(position1 < 0 && position2 >= 0 ){return 1}
            if((position1 >= 0 && position2 >= 0) || (position1 < 0 && position2 < 0)){ return 0 }
            else{return 0}
        }); 
        this.setState({
            activeRecipes: newList
        });
    }
    
    handleTypeChange(e){
        console.log("Type: ", e.target.value);
    }

    render(){

        return (
        <div>
            <RecipeNav />
            <div className="container-fluid"
            style={{paddingBottom: "100px"}}
            >
                <hr/>
                <RecipeSearch 
                onChange={this.sortAllBySearch.bind(this)}
                />
                <RecipeFilters
                onChange={this.setFilter.bind(this)}
                activeFilters={this.state.activeFilters}
                />
                <RecipeTypeSelect
                onChange={this.handleTypeChange.bind(this)} />
                <hr />           

                {this.state.extractingRecipes ?  // Building recipe list
                    <LoadingSpinner />
                : this.state.activeRecipes && this.state.activeFilters.length > 0 ?
                    <RecipeList 
                    recipes={this.state.activeRecipes}
                    userId={this.props.userInfo.userId}
                    />
                 : // If no recipes in list
                <div className="row">
                    <div className="offset-1 col-10">
                        <h5  style={{color: '#333'}}>
                            No recipes found
                            {this.state.activeFilters.length === 0 && <span><br />(no filters selected)</span>}
                        </h5>
                    </div>
                </div>
            }
            </div>
            <NewRecipeBtn />
        </div>
        )
    }
}
