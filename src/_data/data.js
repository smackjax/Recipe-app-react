// Updates both localStorage and server
// Always saves updates to localStorage
// IF NO CONNECTION TO SERVER
    // Adds to it's respective backlog array
    // Stores backlog values under keys that match function names on dataFuncMap
    // Runs backlog on connection established
    // Sends updated values first, then deletes
    // Sends entire recipe, not just updated recipe values

// localStorage functions 
import * as localData from './localData';
// Server data functions
import * as serverData from './serverData';

// maps backlog props to corresponding server function
const dataFuncMap={
    // All return bool(for 'completed')
    // All are promises
    saveRecipes: serverData.saveRecipes,
    deleteRecipes: serverData.deleteRecipesById,
    deleteFriends: serverData.deleteFriendsById
}

// Stores array of values to be saved(or deleted)
// Saves array under a key name on dataFuncMap
// On running, cycles through data and calls its corresponding serverFunction(on dataFuncMap)
// * Account changes(username, display name, password change) are not stored for later
const backlog = {
    // Holds recipe objects to be saved/updated
    saveRecipes: [/*{:recipe}, {:recipe}*/],
    // Holds recipe ids
    deleteRecipes: [/*recipeId*/],
    // Holds friend ids
    deleteFriends: [/*friendId*/]
}

// All of these return promises
async function saveRecipeBacklog(token){ 
        const saveFunc = dataFuncMap.saveRecipes;
        return saveFunc(token, backlog.saveRecipes);
}
async function deleteRecipeBacklog(token){
    const deleteFunc = dataFuncMap.deleteRecipes;
    return deleteFunc(token, backlog.saveRecipes);
}
async function deleteFriendBacklog(token){
    const deleteFunc = dataFuncMap.deleteFriends;
    return deleteFunc(token, backlog.deleteFriends);
}

async function saveAllBacklog(token){
    // Run all backlog functions
    return new Promise((resolve, reject)=>{
        const actionList = [];
        // Only attempts to run the list if there is data to update
        // TODO This is sketchy...
        if(backlog.saveRecipes.length > 0) actionList.push(saveRecipeBacklog(token));
        if(backlog.deleteRecipes.length > 0) actionList.push(deleteRecipeBacklog(token));
        if(backlog.deleteFriends.length > 0) actionList.push(deleteFriendBacklog(token));
        Promise.all(actionList)
        .then(success=>{
            console.log("Success from saveAllBacklog: ", success);
            resolve(true)})
        .catch(failure=>reject(false));
    });
}



// Loads all data
export async function loadAllData(token, handleNewData, setLoading){
    let backlogClear = true;
    const useLocalData = ()=>{
        handleNewData(localData.loadAllData());
        setLoading(false);
    }

    try{
        // Load any backlog actions from localStorage
        const backlogData = localData.loadBacklog() || {};
        backlog.saveRecipes = backlogData.saveRecipes || [];
        backlog.deleteRecipes = backlogData.deleteRecipes || [];
        backlog.deleteFriends = backlogData.deleteFriends || [];
        // Run backlog actions to update server
        // Awaits completion so local changes aren't overridden
        const success = await saveAllBacklog(token);
        // If no errors in 'success'(result of promise), then backlog is clear
        backlogClear = true;
    } catch(err) {
        console.log('Problem clearing backlog: ', err);
        useLocalData();
        backlogClear = false;
    }

    // If no backlog actions need to be taken, load data from server
    if(backlogClear){
        // Load all data from server
        setLoading(true);
        serverData.getUserData()
        .then( allUserData => {
            // This info refreshes current info, in case of change
                // but an id JWT is only obtained through login
            const user = allUserData.userInfo;
            const userInfo = {
                userId: user.userId,
                username: user.username,
                displayName: user.displayName
            };

            // Extracts all user and friend recipes into this array
            const recipes = [];
            const userRecipeIds = Object.keys(user.recipes);
            for(let uRId of userRecipeIds){
                recipes.push(user.recipes[uRId]);
            }
            
            // Builds info obj for each friend
            const friends = [];
            for(let friend of allUserData.friendsInfo){
                const friendInfo = {
                    userId: friend.userId,
                    username: friend.username,
                    displayName: friend.displayName
                }
                friends.push(friendInfo);
                const recipeIds = Object.keys(friend.recipes);
                for(let rId of recipeIds){
                    recipes.push(friend.recipes[rId]);
                }
            }

            // Passes all info into func that will setState with the info needed
            const formattedServerData = {
                userInfo,
                friends,
                recipes
            }
            // Set app state to new data
            handleNewData(formattedServerData); 
            setLoading(false);
        })
        .catch(err=>{
            // If there's an error getting data from server, use localStorage
            // TODO flip flag in app state to show not in sync with server
            console.log('Problem getting user data: ', err);
            useLocalData();
        });    
    } else { 
        // If backlog is not clear
        useLocalData();
    }
}


// RECIPE FUNCTIONS
export const saveRecipe = (token, newRecipe, handleServerSyncStatus)=>{
    // Add recipe to backlog after filtering for duplicates
    const filteredSaveList = backlog.saveRecipes.filter(
        recipe=>recipe.id !== newRecipe.id
    );
    backlog.saveRecipes = [...filteredSaveList, newRecipe]; 
    
    // Saves any backlog async
    saveAllBacklog(token)
    .then(success=>{ 
        console.log('Backlog success from saveRecipe: ', success);
        handleServerSyncStatus(true); 
    }).catch(err=>{
        console.log("Error saving recipes. result from saveRecipes: ", err);
        handleServerSyncStatus(false);
    });

    // ** Saves localStorage
    // ** Always saves to and uses localStorage
    // Get current list
    const currentRecipes = localData.loadRecipes();

    // Filters out old recipe from current list,
    // concatenates newRecipe and old list together
    const updatedRecipes = currentRecipes ?
        [{...newRecipe}, ...currentRecipes.filter(r=>r.id !== newRecipe.id)] :
            // If no local list, return array with only new recipe
            [{...newRecipe}];

    // set local data to updated list
    localData.saveRecipes(updatedRecipes);

    // Return updated list
    return updatedRecipes;
}

export function deleteRecipe(token, recipeId, handleServerSyncStatus){
    // Add recipeId to backlog after filtering for duplicates
    const newDeleteList = backlog.deleteRecipes.filter(cRId=>cRId !== recipeId);
    backlog.deleteRecipes = [...newDeleteList, recipeId]; 

    // Saves any backlog async
    saveAllBacklog(token)
    .then(success=>{ handleServerSyncStatus(true); })
    .catch(err=>{
        console.log("Error saving recipes. result from deleteRecipes: ", err);
        handleServerSyncStatus(false);
    });

    // ** Local storage logic
    // ** Always updates and uses localStorage
    // Get current list
    const currentRecipes = localData.loadRecipes();
    // Filters out old recipe from current list
    const updatedRecipes = currentRecipes ?
        [...currentRecipes.filter(r=>r.id !== recipeId)] :
            // If no local list, return empty array
            [];
    // set local data to updated list
    localData.saveRecipes(updatedRecipes);

    // Return updated list
    return updatedRecipes;
}

export async function addFriend(username, setLoadingSpinner){
    // TODO search for friend,
    // TODO switch 'loading friend' spinner in app
    try{
        await serverData.followByUsername(username);
    } catch(err){
        console.log("Couldn't find user");
    };
}

export function deleteFriend(friendId, handleNewData, handleServerSyncStatus){
    // Add friendId to backlog after filtering for duplicates
    const newDeleteList = backlog.deleteFriends.filter(cRId=>cRId !== friendId);
    backlog.deleteFriends = [...newDeleteList, friendId]; 
    // Saves any backlog async
    saveAllBacklog()
    .then(success=>{ handleServerSyncStatus(true); })
    .catch(err=>{
        console.log("Error deleting 'friend': ", err);
        handleServerSyncStatus(false);
    });

    let newData = {};
    try{
        // Removes friend from local data
        const newFriends = localData.deleteFriendsByIds([friendId]);
        // Clears their recipes from local data
        localData.clearRecipesFromDeletedIds([friendId]);
        // Reloads local data
        const newRecipes = localData.loadRecipes();
        // Updates app data 
        newData = {
            friends: newFriends,
            recipes: newRecipes
        }
    } catch(err) {
        console.log("Error deleting friend from local: " + err);
    }
    return newData;
}

// 'update' user info functions return success or fail 
export function updateUsername(token, newUsername){
    serverData.updateUsername(token, newUsername);
}
export function updateDisplayName(token, newDisplayName){
    serverData.updateDisplayName(token, newDisplayName)
    // TODO handle server responses to user update info
}
export function updatePassword(token, oldPassword, newPassword){
    serverData.updatePassword(token, oldPassword, newPassword);
}

// 
export function saveUserInfo(newInfo){
    localData.saveUserInfo(newInfo);
}

export function loadUserInfo(newInfo){
    return localData.loadUserInfo();
}

// Just saves empty object to clear values
export function logoutUser(){
    localData.saveUserInfo({});
}