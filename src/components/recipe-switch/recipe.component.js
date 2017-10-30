import React from 'react';
import {PropTypes} from 'react';
import uniqid from 'uniqid';

// Components 
import Nav from './_nav/recipe-nav.component';
import Name from './name/name.component';
import Info from './info/info.component';
import Ingredients from './ingredients/ingredients.component';
import Steps from './steps/steps.component';


class RecipePage extends React.Component{
    /*
    props:
        recipes,
        recipeId,  
        myUserId,
        editing, 
        newRecipe?,

        recipe ={ id, 
            name, 
            ovenTemp: string,
            ingredients: string[],
            steps: string[]    
        }
        )
    */
    state={
        editing: false,
        id: uniqid('recipe-'),
        ownerId: this.props.myUserId,
        name: 'Recipe 1',
        ovenTemp: '',
        ingredients: [],
        steps: []
    }
    componentWillReceiveProps(newProps){
        const recipe = newProps.recipe;
        if(recipe){
            this.setState({
                recipe: {...recipe}                
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
        console.log('Save recipe:', newRecipe);
    }
    deleteRecipe(){
        console.log('Delete recipe id: ', this.state.id);
    }


    render(){

        const setState = this.setState.bind(this);
        const editing = this.state.editing;
        return (
            <div className="container-fluid">
                <Nav 
                canEdit={true}
                handleSave={this.saveRecipe.bind(this)}
                handleDelete={this.deleteRecipe.bind(this)}
                handleEdit={this.startEditing.bind(this)}
                handleCancel={this.stopEditing.bind(this)}
                editing={editing} />

                <Name 
                name={this.state.name}
                editing={editing}
                setState={setState}/>

                <Info 
                ovenTemp={this.state.ovenTemp}
                editing={editing}
                setState={setState}/>

                <Ingredients 
                ingredients={this.state.ingredients}
                editing={editing}
                setState={setState}/>

                <Steps 
                steps={this.state.steps}
                editing={editing}
                setState={setState}/>
            </div>
        )
    }
}
export default RecipePage;
