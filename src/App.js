import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch
} from 'react-router-dom';

// Data functions
import * as dataFuncs from './_data/data.js';
import initialAppState from './_data/initialState.js';

// App state functions
import * as appFuncs from './App-state-functions';

// Components
import LoginComponent from './components/login/login.component';
import RecipeSearch from './components/recipe-search/recipe-search.component';
import RecipeDash from './components/recipe-dash/recipe-dash.component';
import FriendSwitch from './components/friend-switch/friend-switch.component';
import SettingsPage from './components/settings/settings.component';


import './Animations.css';
import './App.css';


class App extends Component {
  state={...initialAppState }


  componentDidMount(){
  // Load data if local token
  // Async so passing in function to update state when resolved
    // and function for flagging load spinner
    
    const JWT = dataFuncs.loadToken();
    if(JWT){
      this.setState({token: JWT});

      dataFuncs.loadAllData( JWT )
      .then((appData)=>{
        this.setAppData(appData);
      })
      .catch(error=>{
        console.log(error);
      });
      
    }
  }

  handleServerSyncState(status){
    this.setState({serverSynchronized: status});
  }

  // Updates relevant state with any new data coming in
  setAppData(data){
    try{
      // If no values passed in, won't try to update that piece of app state
      const newVals = {};
      if(data.friends) newVals.friends = 
        appFuncs.allFriendRecipesToArrays(data.friends);
      // Preserve current values not in new userInfo(like the JWT)
      if(data.userInfo) newVals.userInfo = {
        ...this.state.userInfo,
        ...data.userInfo
      };
    this.setState({...newVals});
    }catch(e){
      console.log("Problem from setAppData: ", e);
    }
  }
  // Controls 'loading' flag
  setLoading(isLoading){
    this.setState({serverDataLoading: isLoading});
  }

  // Saves JWT and loads data
  async loginUser(newVals){
    this.setLoading(true);
    
    // Save new token to localStorage
    dataFuncs.saveToken(newVals.token);

    // Deletes token from userInfo
    const parsedInfo = {...newVals };
    delete parsedInfo.token;
    dataFuncs.saveUserInfo(parsedInfo);

    // Update app state with new userInfo & token
    this.setState({
      userInfo: {...parsedInfo},
      token: newVals.token
    });

    const appData = 
      await dataFuncs.loadAllData(newVals.token);

    this.setState({...appData});
    this.setLoading(false);
  }

  // resets all data and clears local
  // TODO clear all data, not just userInfo
  logoutUser(){
    this.setState({...initialAppState});
    dataFuncs.logoutUser();
  }

  // **Recipe Data Handling Funcs
  saveRecipe(newRecipe){
    const updatedUserInfo =
      dataFuncs.saveRecipe(
        this.state.token, 
        newRecipe, 
        this.handleServerSyncState.bind(this));
    this.setState({userInfo: updatedUserInfo})
  }
  deleteRecipe(recipeId){
    const newUserInfo = dataFuncs.deleteRecipe(
      this.state.token,
      recipeId,
      this.handleServerSyncState.bind(this));
    this.setState({userInfo: newUserInfo});
  }

  // **Friend data handling
  async addFriend(searchString){
    const newFriendData = await dataFuncs.addFriend(
      this.state.token, 
      searchString
    );
    if(newFriendData) {
      const newFriends = [
        ...this.state.friends,
        newFriendData
      ];
      this.setState({friends: newFriends});
    }
  }
  deleteFriend(friendId){
    dataFuncs.deleteFriend(
      this.state.token, 
      friendId,
      this.handleServerSyncState.bind(this)
    )
    .then(newFriends=>{
      this.setState({friends: newFriends});
    })
  }



  // ** Change settings functions 
  // All are run *after child component successfully updates info
  setAppUserInfo(prop, val){
    this.setState({
      userInfo : {
        ...this.state.userInfo,
        [prop] : val
      }
    })
  }
  updateUsername(newUsername){
    this.setAppUserInfo('username', newUsername);
  }
  updateDisplayName(newDisplayName){
    this.setAppUserInfo('displayName', newDisplayName);
  }
  updateEmail(newEmail){
    this.setAppUserInfo('email', newEmail);
  }
  


  render() {
    // If no state.token (not signed in), 
    // return the login page, but do NOT redirect to new path,
    // which means on successful sign in page will be whatever user was trying to access
    if(!this.state.token){ 
      return <LoginComponent saveUserInfo={this.loginUser.bind(this)}/> 
    }


    // Preloads props for routes

    // Handles searching for recipes and new recipes
    // OR sets recipe to be new
    const PreloadedRecipeSearch = (routeInfo)=>{
      return <RecipeSearch 
              cooks={[this.state.userInfo, ...this.state.friends]}
              myUserId={this.state.userInfo.userId}
              match={routeInfo.match}
              history={routeInfo.history}
              handleSave={this.saveRecipe.bind(this)}
              handleDelete={this.deleteRecipe.bind(this)} />
    }

    const PreloadedRecipeDash = (routeInfo)=>{
        return <RecipeDash 
          userInfo={this.state.userInfo}
          friends={this.state.friends}
        />
    }

    const PreloadedFriendSwitch=(routeInfo)=>{
      const username = routeInfo.match.params.username ?
        routeInfo.match.params.username : false;
      return <FriendSwitch
              history={routeInfo.history}
              username={username}
              friends={this.state.friends} 
              handleSearch={this.addFriend.bind(this) } 
              handleDelete={this.deleteFriend.bind(this)} />
    }

    const  PreloadedSettings=()=>{
      return <SettingsPage 
              userInfo={this.state.userInfo}
              token={this.state.token} 

              updateUsername={this.updateUsername.bind(this)}
              updateDisplayName={this.updateDisplayName.bind(this)}
              updateEmail={this.updateEmail.bind(this)}

              logout={this.logoutUser.bind(this)} 
              />
    }

    

    // If there is a state.token (signed in), carry on
    return (
      <Router>
        <Switch>
          <Route path="/recipe-dash" component={PreloadedRecipeDash} />
          <Route path="/recipes/:id" component={PreloadedRecipeSearch} />
          <Route path="/friends/:username" component={PreloadedFriendSwitch} />
          <Route path="/friends" component={PreloadedFriendSwitch} />
          <Route path="/settings" render={PreloadedSettings} /> 
          <Redirect from="/" to="recipe-dash"/>
        </Switch>
      </Router>
    );
  }
}

export default App;
