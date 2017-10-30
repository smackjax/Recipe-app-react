import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

// Data functions
import * as dataFuncs from './_data/data.js';

// Components
import  LoginComponent from './components/login/login.component';
import RecipeDash from './components/recipe-dash/recipe-dash.component';
import RecipePage from './components/recipe-details/recipe-details.component';
import RecipeSwitch from './components/recipe-switch/recipe-switch.component';
import FriendSwitch from './components/friend-switch/friend-switch.component';

import SettingsPage from './components/settings/settings.component';

import './App.css';

class App extends Component {
  state={
    serverDataLoading: false,
    serverSynchronized: true,
    recipes: [/*{:recipe}*/],
    friends: [/*{:friendInfo}*/],
    userInfo: {
      "userId" : "",
      "username" : "",
      "displayName" : "",
      "jwt" : ""
    }
  }

  componentDidMount(){
  // Load data
  // Async so passing in function to update state when resolved
    // and function for flagging load spinned
    dataFuncs.loadAllData(
      this.state.token,
      this.setAppData.bind(this),
      this.setLoading.bind(this)
    );
  }

  handleServerSyncState(status){
    this.setState({serverSynchronized: status});
  }

  // Updates relevant state with any new data coming in
  setAppData(data){
    // If no values passed in, won't try to update that piece of app state
    const newVals = {};
    if(data.recipes) newVals.recipes = data.recipes;
    if(data.friends) newVals.friends = data.friends;
    if(data.userInfo) newVals.userInfo = data.userInfo;
    console.log(data.userInfo);
    this.setState(newVals);
  }
  // Controls 'loading' flag
  setLoading(isLoading){
    this.setState({serverDataLoading: isLoading});
  }

  // Sets JWT authorization token(for sign in)
  saveUserInfo(newVals){
    // Save new token
    dataFuncs.saveUserInfo(newVals);

    // Update app state with new userInfo
    this.setState({userInfo: {...newVals}});

    // Try to update app data from server with new user info token
      // TODO
  }

  // **Recipe Data Handling Funcs
  saveRecipe(newRecipe){
    const updatedRecipes = 
      dataFuncs.saveRecipe(this.state.token, newRecipe, this.handleServerSyncState.bind(this));
    this.setState({
      recipes: updatedRecipes
    });
  }
  deleteRecipe(recipeId){
    const newRecipes = dataFuncs.deleteRecipe(recipeId);
    this.setState({recipes: newRecipes});
  }

  // **Friend data handling
  addFriend(searchString){
    const newData = dataFuncs.addFriend(searchString);
    const updateApp = this.setAppData.bind(this);
    updateApp(newData);
  }
  deleteFriend(friendId){
    const newData = dataFuncs.deleteFriend(friendId);
    const updateApp = this.setAppData.bind(this);
    updateApp(newData);
  }


  render() {
    // Preloads props
    const PreloadedRecipeDash=(routeInfo)=>{
      const username = routeInfo.match.params.username ?
        routeInfo.match.params.username : false;
      return <RecipeDash 
        recipes={this.state.recipes} 
        friends={this.state.friends}
        myUserId={this.state.userInfo.userId} 
        username={username} />
    }

    const PreloadedRecipeSwitch=(routeInfo)=>{
      const recipeId = routeInfo.match.params.id;
      return <RecipeSwitch 
              recipes={this.state.recipes}
              recipeId={recipeId} 
              
              myUserId={this.state.userInfo.userId}
              handleSave={this.saveRecipe.bind(this)}
              handleDelete={this.deleteRecipe.bind(this)} />;
    }
    const PreloadedNewRecipe=()=>{
      return <RecipePage 
              myUserId={this.state.userInfo.userId}
              isNew={true} 
              handleSave={this.saveRecipe.bind(this)}
              handleDelete={this.deleteRecipe.bind(this)}  />;
    }

    const PreloadedFriendSwitch=(routeInfo)=>{
      const username = routeInfo.match.params.username ?
        routeInfo.match.params.username : false;
      return <FriendSwitch
              history={routeInfo.history}
              username={username}
              recipes={this.state.recipes} 
              friends={this.state.friends} 
              handleSearch={this.addFriend.bind(this) } 
              handleDelete={this.deleteFriend.bind(this)} />
    }


    const  PreloadedSettings=()=>{
      return <SettingsPage 
              username={this.state.userInfo.userName} 
              displayName={this.state.userInfo.displayName} 
              id={this.state.userInfo.userId} />
    }

     // If no JWT under userInfo (not signed in), 
        // return the login page, but do NOT redirect to new path
    if(!this.state.userInfo.jwt){ 
      return <LoginComponent saveUserInfo={this.saveUserInfo.bind(this)}/> 
    }

    // If there is a JWT, carry on
    return (
      <Router>
        <Switch>
          <Redirect from="/" exact to="recipe-dash"/>
          <Route path="/recipe-dash/:username" component={PreloadedRecipeDash} />
          <Route path="/recipe-dash" component={PreloadedRecipeDash} />
          <Route path="/recipes/:id" component={PreloadedRecipeSwitch} />
          <Route path="/new-recipe" component={PreloadedNewRecipe} />
          <Route path="/friends/:username" component={PreloadedFriendSwitch} />
          <Route path="/friends" component={PreloadedFriendSwitch} />
          <Route path="/settings" component={PreloadedSettings} />

        </Switch>
      </Router>
    );
  }
}

export default App;
