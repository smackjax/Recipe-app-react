import {loadData, data } from '../../_data/data';

import React from 'react';

// Page navbar
// import RecipeNav from './nav/recipe-list-nav.component';
import RecipeNav from '../_main-nav/main-nav.component';
import RecipeList from '../_recipe-list/recipe-list.component';
import RecipeSearch from './recipe-search/recipe-search.component';
import RecipeFilters from './recipe-filters/recipe-filters.component';
import NewRecipeBtn from './new-recipe-btn/new-recipe-btn.component';
import RecipeItem from './recipe-item/recipe-item.component';


export default class RecipeDash extends React.Component {
    // props.recipes
    // props.myUserId
    // ?props.friendId? 
    state={
        recipeList: [],
        activeFilters: [],
    }

    // Generates list to be built based on friendId
    componentDidMount(){
        const recipeList = 
            this.props.username ? 
                this.getRecipesFromUsernames([this.props.username]) :
                    [...this.props.recipes];
        const activeFilters = this.props.username ?
            [] : ['personal', 'following']
        this.setState({
            recipeList: recipeList,
            activeFilters
        });
    }

    getRecipesFromUsernames(usernameList){
        const idList = this.props.friends.map((friend)=>{
            if(usernameList.includes(friend.username)){
                return friend.id;
            }
        });
        return this.getRecipesFromIds(idList);
    }

    getRecipesFromIds(idList){
        const recipesToDisplay = 
            this.props.recipes.filter(recipe=>idList.includes(recipe.ownerId));
        return recipesToDisplay;
    }
    getRecipesFromFilters(filters){
        let newRecipes = [];
        if(filters.includes('personal')){
            newRecipes = [...newRecipes, 
                ...this.props.recipes.filter(r=>r.ownerId === this.props.myUserId)];
        }
        if(filters.includes('following')){
            newRecipes = [...newRecipes,
                ...this.props.recipes.filter(r=>r.ownerId !== this.props.myUserId)];
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
            recipeList: newRecipeList
        });
    }
    sortAllBySearch(searchString){
        const newList = [...this.props.recipes];
        newList.sort((r1, r2)=>{
            const position1 = r1.name.toLowerCase().search(searchString.toLowerCase());
            const position2 = r2.name.toLowerCase().search(searchString.toLowerCase());
            if(position1 >= 0 && position2 >=0 ){return -1}
            if(position1 < 0 && position2 >= 0 ){return 1}
            if((position1 >= 0 && position2 >= 0) || (position1 < 0 && position2 < 0)){ return 0 }
        }); 

        this.setState({
            recipeList: newList
        });
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

                <hr />           

                {this.state.recipeList.length > 0 ?
                    <RecipeList 
                    recipes={this.state.recipeList}
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
