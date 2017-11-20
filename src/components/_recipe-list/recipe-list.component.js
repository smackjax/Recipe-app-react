import React from 'react';
import {getAllRecipes} from '../../App-state-functions';
import  * as circleIcons  from '../../_resources/circle-icons/all-icons';
import getBgClass from '../../_style/getBgClass';
import {Link} from 'react-router-dom';

import LoadingSpinner from '../_loading-spinner/loading-spinner.component';
import './recipe-list.style.css';

export default class RecipeList extends React.Component{
    // props.usersArray
    // props.recipes
    // props.setActiveRecipe
    // ?props.userId (for ownerId comparison)

    state={
        loadingRecipes: true,
        loadRecipesFailed: false,
    }
    
    componentDidMount(){
        if(this.props.usersArray && this.props.usersArray.length > 0){
            console.log('setting recipes');
            this.setRecipes(this.props.usersArray);
        } else if(this.props.recipes){
            console.log('recipes passed in');
            this.setState({recipeList: this.props.recipes},
            ()=>{this.setLoading(false)})
        } else {
            this.setState({loadRecipesFailed: true},
            ()=>{ this.setLoading(false) });
        }
    }


    async setRecipes(){
        try{
            this.setLoading(true);
            const recipeList = await getAllRecipes(this.props.usersArray);
            // Get recipes
            this.setState({ recipeList}, 
            // stops loading spinner
            ()=>{ this.setLoading(false) });
        } catch(err){
            // Set 'failed' flag and stop spinner
            this.setState({loadRecipesFailed: true},
            this.setLoading(false));
            console.log("Error in RecipeList: ", err);
        }
    }

    setLoading(status){
        this.setState({loadingRecipes: status});
    }

    render(){

        if(this.state.loadingRecipes){
            return <LoadingSpinner />
        }
        if(this.state.loadRecipesFailed){
            return( 
            <div 
            style={{maxWidth: '300px', margin: '20px auto'}}
            className="alert alert-danger">
                Problem getting recipes
            </div>
        )}

        
        const recipeList = this.state.recipeList;
        const myUserId = this.props.userId ? 
            this.props.userId : "";
            console.log("recipeList from RecipeList: ", recipeList);
        return (
            <div className="recipe-list friend-recipes">
                {recipeList.map((recipe, rIndx)=>{
                    const type = recipe.recipeType;
                    // get src for recipe-item img
                    const svgSrc = circleIcons.getIconSrc(type);
                    // get color class for item body
                    const bgClass = getBgClass(type);
                    
                    // Stores whether current user created this recipe
                    const isMine = (myUserId === recipe.ownerId);
                    // adds class if this recipe was created by user
                    const ownedClass = 
                        isMine ? "recipe-is-mine" : "";
                    
                    
                    const username = recipe.userInfo.username;
                    return <div
                    key={'recipe' + rIndx}
                    className={"recipe-list-item " + ownedClass } >

                        <Link 
                        to={"/recipes/"+recipe.id}
                        className={"recipe-list-item-body text-light " + bgClass}>
                            <img 
                            alt=""
                            src={svgSrc} 
                            className="recipe-list-item-svg" />
                            {recipe.name}
                        </Link>

                        <Link
                        to={"/friends/"+recipe.userInfo.username}
                        className="recipe-list-item-footer">
                            {recipe.userInfo.displayName}
                        </Link>
                    </div>
                })}
            </div>
        )
    }
}