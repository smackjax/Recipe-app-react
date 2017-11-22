import React from 'react';

import {getAllRecipes} from '../../App-state-functions';

import RecipeFilters from './recipe-filters/recipe-filters.component';
import RecipeNav from './nav/recipe-list-nav.component';
import RecipeList from '../_recipe-list/recipe-list.component';
import NewRecipeBtn from './new-recipe-btn/new-recipe-btn.component';

export default class RecipeDash extends React.Component {
    // props.userInfo
    // props.friends [{},{},...]

    state={
        "myRecipes" : true,
        "friendRecipes" : true
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    handleFilterChange(e){
        const stateProp = e.target.value;
        const checked = e.target.checked;
        this.setState({[stateProp]: checked});
    }

    render(){

        let usersArray = [];
        if(this.state.myRecipes){ usersArray = [this.props.userInfo] }
        if(this.state.friendRecipes){ 
            usersArray = [...usersArray, ...this.props.friends]; 
        }
        return (
        <div style={{paddingBottom: "100px"}}>
            

                <hr/>         
                
                <RecipeFilters 
                myRecipesSelected={this.state.myRecipes}
                friendRecipesSelected={this.state.friendRecipes}
                onChange={this.handleFilterChange.bind(this)}
                />

                <RecipeList 
                usersArray={usersArray}
                userId={this.props.userInfo.userId}
                />

            <NewRecipeBtn />
        </div>
        )
    }
}
