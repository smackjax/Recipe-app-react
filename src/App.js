import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {
  Route, 
  Redirect, 
  Switch
} from 'react-router-dom';

// Data functions
import * as dataFuncs from './_data/data.js';

// App state functions
import * as appFuncs from './App-state-functions';

// Initial state
import initialAppState from './_data/initialState.js';

// Components
import MainNav from './components/nav/nav.component';

import FullscreenSpinner from './components/_full-screen-spinner/full-screen-spinner.component';

import LoginComponent from './components/login/login.component';
import RecipeSearch from './components/recipe-search/recipe-search.component';
import RecipeDash from './components/recipe-dash/recipe-dash.component';
import FriendSwitch from './components/friend-switch/friend-switch.component';
import SettingsPage from './components/settings/settings.component';
import AboutPage from './components/about/about.component';

import './Animations.css';
import './App.css';
import './colors.css';



class App extends Component {
  state={...initialAppState }

  constructor(props){
    super(props);
    // Binds functions to be used in async ways
    this.setAppData = this.setAppData.bind(this);
    this.handleLoadingSpinner = this.handleLoadingSpinner.bind(this);
  }

  componentDidMount(){
    // Makes spinner appear until all data loaded
    this.handleLoadingSpinner(true);
     // Load data if local token
    const JWT = dataFuncs.loadToken();
    if(JWT){
      this.setState({token: JWT});

      // Load all data from the serve(or cache)
      // TODO handle a 401(bad token) response
      dataFuncs.loadAllData(JWT)
      .then((appData)=>{
        this.setAppData(appData);
      })
      .catch(error=>{
        this.handleLoadingSpinner(false);
        console.log("Error from App compDidMount: ", error);
      });
      
    }
  }

  handleLoadingSpinner(status){
    this.setState({loadingData: status})
  }


  // Updates relevant state with any new data coming in
  setAppData(data){
    try{
      // If no values passed in, won't try to update that piece of state
      const newVals = {};
      if(data.friendsInfo) {
        newVals.friends = 
          appFuncs.allFriendRecipesToArrays(data.friendsInfo);
      }
      // Preserve current values not in new userInfo(TODO may not be needed anymore)
      if(data.userInfo){
        newVals.userInfo = {
          ...this.state.userInfo,
          ...data.userInfo
        };
      }
      if(data.token){
        newVals.token = data.token;
      }
    this.setState({...newVals},
    ()=>{
      this.handleLoadingSpinner(false);
    });
    }catch(e){
      this.handleLoadingSpinner(false);
      console.log("Problem from setAppData: ", e);
    }
  }
  
  // Saves JWT and loads data
  async loginUser(newVals){
    // Start spinner
    this.handleLoadingSpinner(true);
    
    // Save new token to localStorage
    dataFuncs.saveToken(newVals.token);

    // Deletes token from userInfo
    const parsedInfo = {...newVals };
    delete parsedInfo.token;

    // Then saves userInfo to Local
    dataFuncs.saveUserInfo(parsedInfo);

    const appData = 
      await dataFuncs.loadAllData(
        newVals.token
    );
    // Adds token to save to state
    appData.token = newVals.token;
    this.setAppData(appData);
  }

  // resets all data and clears local
  logoutUser(){
    this.setState({...initialAppState});
    dataFuncs.logoutUser();
  }

  // **Recipe Data Handling Funcs
  async saveRecipe(newRecipe){
    this.handleLoadingSpinner(true);
    try {
      await dataFuncs.saveRecipe(
        this.state.token, 
        newRecipe
      );
      const newRecipes = {...this.state.userInfo.recipes, [newRecipe.id]: newRecipe};
      const newInfo = { ...this.state.userInfo, recipes: newRecipes };
      this.setState({userInfo: newInfo});
    } catch (err){
      console.log("Error in saveRecipe: ", err);
    }
    this.handleLoadingSpinner(false);
  }

  async deleteRecipe(recipeId){
    this.handleLoadingSpinner(true);
    try {
      await dataFuncs.deleteRecipe(
        this.state.token,
        recipeId
      );
      // Spread current recipes into new object
      const newRecipes = {...this.state.userInfo.recipes}
      // Delete recipe
      delete newRecipes[recipeId];
      // Assign new recipes to new info
      const newInfo = {...this.state.userInfo, recipes: newRecipes };
      this.setState({userInfo: newInfo});
    } catch (err) {
      console.log("Error from deleteRecipe: ", err);
    }
    this.handleLoadingSpinner(false);
  }

  // **Friend data handling
  addFriend(newFriendData){
      const newFriends = [
        ...this.state.friends,
        newFriendData
      ];
      this.setState({friends: newFriends});
  }

  async deleteFriend(deleteId){
    // Loader overlays whole app
    this.handleLoadingSpinner(true);
    try {
      await dataFuncs.deleteFriend(this.state.token, deleteId);
      const newFriends = 
        this.state.friends.filter(friend=>friend.userId !== deleteId);
      this.setState({friends: newFriends});
    } 
    catch(err){
      console.log("Error from deleteFriend: ", err);
    }
    this.handleLoadingSpinner(false);
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
      return <LoginComponent
      saveUserInfo={this.loginUser.bind(this)}/> 
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
        // Renders either friend dash or friend details,
        // depending on whether friend username param is populated, 
        // and exists in list
      return <FriendSwitch
              history={routeInfo.history}
              username={username}
              friends={this.state.friends} 
              token={this.state.token}
              addFriend={this.addFriend.bind(this) } 
              handleDelete={this.deleteFriend.bind(this)} />
    }

    const  PreloadedSettings=()=>{
      return <SettingsPage 
              userInfo={this.state.userInfo}
              token={this.state.token}
              inSync={this.state.serverSynchronized}

              updateUsername={this.updateUsername.bind(this)}
              updateDisplayName={this.updateDisplayName.bind(this)}
              updateEmail={this.updateEmail.bind(this)}

              logout={this.logoutUser.bind(this)} 
              />
    }

    const ToDash=()=><Redirect to='/recipe-dash' />

    // If there is a state.token (signed in), carry on
    return (
      <div>
        { this.state.loadingData &&
          <FullscreenSpinner />
        }
        <MainNav />
        <Switch>
          <Route path="/recipe-dash" render={PreloadedRecipeDash} />
          <Route path="/recipes/:id" render={PreloadedRecipeSearch} />
          <Route path="/friends/:username" component={PreloadedFriendSwitch} />
          <Route path="/friends" component={PreloadedFriendSwitch} />
          <Route path="/settings" render={PreloadedSettings} /> 
          <Route path="/info" component={AboutPage} />
          <Route component={ToDash} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
