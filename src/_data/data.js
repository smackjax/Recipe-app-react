/*
    **** Master data handling functions
    The idea is almost all data is from the local storage(except something like updates),
so local storage is always in sync.
    If there is a problem connecting to the server, whatever value couldn't be updated is
added to an array to be passed into the corresponding server function when the next server
action is taken. 
    Because of this, server calls after data is loaded(from sign in) can be completely async.
    Also because of this, whenever new data or actions are taken, the action is first added
to the backlog, then the backlog is run, and only then (if backlog is successfully cleared),
is the new data is pulled down and backlog cleared. 
    On backlog failing to clear, the entire backlog object is saved to localStorage for 
the next try. Kind of like how gitHub stores an index of changes.
*/


// Updates both localStorage and server
// IF NO CONNECTION TO SERVER
    // Adds to it's respective backlog array
    // Pushes value that couldn't complete into backlog array
    // Runs backlog on next action
    // Sends updated values first, then deletes
    // Sends entire recipe, not just updated recipe values

// localStorage functions 
import * as localData from './localData';
// Server data functions
import * as serverData from './serverData';


// Stores array of values to be saved(or deleted)
// **Account changes(username, display name, password change) are not stored for later
const backlog = {
    // Holds recipe objects to be saved/updated
    saveRecipes: [/*{:recipe}, {:recipe}*/],
    // Holds recipe ids
    deleteRecipes: [/*recipeId*/],
    // Holds friend ids
    deleteFriends: [/*friendId*/]
}

async function saveAllBacklog(token){
    // Run all backlog functions
    let failed = false;
    // If there are values to send to server
    if(backlog.saveRecipes.length > 0 || 
        backlog.deleteRecipes.length > 0 || 
        backlog.deleteFriends.length > 0){
    
        // Only attempts to run each backlog function if there are values
        // Awaits each function
        const newBacklog = {};
        if(backlog.saveRecipes.length > 0) {
            try{
                await serverData.saveRecipes(token, backlog.saveRecipes);
                newBacklog.saveRecipes = [];
            } catch (e){
                newBacklog.saveRecipes = [...backlog.saveRecipes];
                console.log("Save recipes failed");
                failed = true;
            } 
        }
        if(backlog.deleteRecipes.length > 0) {
            try{
                await serverData.deleteRecipesById(token, backlog.deleteRecipes);
                newBacklog.deleteRecipes = [];
            } catch (e){
                newBacklog.deleteRecipes = [...backlog.deleteRecipes];
                console.log("Delete recipes failed");
                failed = true;
            }
        }
        if(backlog.deleteFriends.length > 0) {
            try{
                await serverData.deleteFriendsById(token, backlog.deleteFriends);
                newBacklog.deleteFriends = [];
            } catch (e){
                newBacklog.deleteFriends = [...backlog.deleteFriends];
                console.log("Delete friends failed");
                failed = true;
            }
        }
        // Save either cleared values or save failed operations to be tried later
        localData.saveBacklog(newBacklog);
        if(failed){
            throw Error("Clearing backlog failed");
        } else {
            return true;
        }
    } else {
        // If no backlog
        return true;
    }
}

// TODO backe handleServerSyncStatus into saveBacklog, use that for backlog actions
export async function saveBacklogManually(token, handleServerSyncStatus){
    try{
        // Load any backlog actions from localStorage
        const backlogData = localData.loadBacklog() || {};
        backlog.saveRecipes = backlogData.saveRecipes || [];
        backlog.deleteRecipes = backlogData.deleteRecipes || [];
        backlog.deleteFriends = backlogData.deleteFriends || [];

        // Run backlog actions to update server
        const saveResult = await saveAllBacklog(token);
        console.log("Save result: ", saveResult);
        // If no errors then backlog is clear
        handleServerSyncStatus(true);
    } catch(err) {
        console.log( "Error from manual backlog save: ", err);
        handleServerSyncStatus(false);
        return localData.loadAllData();
    }
}


// Loads all data
// ** does not return any JWT, only info for user already logged in
// Successful server response returns
// { userInfo: {}, friendsInfo: [{},{},...]}
export async function loadAllData(token, handleServerSyncStatus){
    let backlogClear = true;
    // Loads unfinished/runs backlog actions
    try{
        // Load any backlog actions from localStorage
        const backlogData = localData.loadBacklog() || {};
        backlog.saveRecipes = backlogData.saveRecipes || [];
        backlog.deleteRecipes = backlogData.deleteRecipes || [];
        backlog.deleteFriends = backlogData.deleteFriends || [];

        // Run backlog actions to update server
        // Awaits completion so local changes aren't overridden
        await saveAllBacklog(token);
        // If no errors then backlog is clear
        handleServerSyncStatus(true);
    } catch(err) {
        console.log('Problem clearing backlog: ', err);
        backlogClear = false;
        handleServerSyncStatus(false);
        return localData.loadAllData();
    }

    // If no backlog actions need to be taken, load data from server
    if(backlogClear){
        try{
            // Load all data from server based on JWT
            const allUserData = 
                await serverData.getUserData(token)
            // This user info refreshes current info, in case of change
                // *** but an id JWT is only obtained through login  
            const userInfo = allUserData.userInfo;
            const friends = allUserData.friendsInfo;
            
            localData.saveUserInfo(userInfo);
            localData.saveFriends(friends);
            
            const formattedServerData = {
                userInfo,
                friends
            };
            // Set app state to new data
            return formattedServerData; 
        
        } catch(err){
            // If there's an error getting data from server, use localStorage
            // TODO flip flag in app state to show not in sync with server
            console.log('Problem getting user data: ', err);
            return localData.loadAllData();
        }   
    } else { 
        // If backlog is not clear
        return localData.loadAllData();
    }
}


// RECIPE FUNCTIONS
export function saveRecipe (token, newRecipe, handleServerSyncStatus){
    // Add recipe to backlog after filtering for duplicates
    const filteredSaveList = backlog.saveRecipes.filter(
        recipe=>recipe.id !== newRecipe.id
    );
    backlog.saveRecipes = [...filteredSaveList, newRecipe]; 
    
    // Saves any backlog async
    saveAllBacklog(token)
    .then(success=>{ 
        handleServerSyncStatus(true); 
    }).catch(err=>{
        console.log("Error saving recipes. result from saveRecipe: ", err);
        handleServerSyncStatus(false);
    });

    // ** Saves localStorage
    // ** Always saves to and uses localStorage
    // Set local data (userInfo.recipes) to updated list
    const updatedUserInfo = 
        localData.saveRecipes([newRecipe]);

    // Return updated list
    return updatedUserInfo;
}

export function deleteRecipe(token, recipeId, handleServerSyncStatus){
    // Add recipeId to backlog after filtering for duplicates
    const newDeleteList = 
        [...backlog.deleteRecipes.filter(cRId=>cRId !== recipeId), recipeId];
    backlog.deleteRecipes = newDeleteList; 

    // Saves any backlog async
    saveAllBacklog(token)
    .then(success=>{ 
        handleServerSyncStatus(true); 
    }).catch(err=>{
        console.log("Error from data.deleteRecipe: ", err);
        handleServerSyncStatus(false);
    });

    // ** Local storage logic
    // ** Always updates and uses localStorage
    // Get current list
    const updatedUserInfo = 
        localData.deleteRecipes(newDeleteList);

    // Return updated list
    return updatedUserInfo;
}

export async function addFriend(token, username){
    try{
        const newFriend = await serverData.followByUsername(token, username);
        return newFriend;
    } catch(err){
        console.log("Server err searching for friend: ", err);
    };
}

export async function deleteFriend(token, friendId, handleServerSyncStatus){
    // Add friendId to backlog after filtering for duplicates
    const newDeleteList = backlog.deleteFriends.filter(cFId=>cFId !== friendId);
    backlog.deleteFriends = [...newDeleteList, friendId]; 
    
    // Saves backlog
    // Doesn't matter if it succeeds or fails, localStorage will keep app functional
    // await for catch statement
    try{ 
        await saveAllBacklog(token);
        handleServerSyncStatus(true);
    } catch(err){ 
        console.log("Error deleting 'friend': ", err);
        handleServerSyncStatus(false);
    }

    try{
        // Removes friend from local data
        const newFriends = localData.deleteFriendsByIds([friendId]);
        return newFriends;
    } catch(err) {
        console.log("Error deleting friend from local: " + err);
        return [];
        
    }
}

// 'update' user info functions return success or fail 
export async function updateUsername(token, password, newUsername){
    try{
        await serverData.updateUsername(token, password, newUsername);
        localData.updateUsername(newUsername);
    }  catch(err){
        // Throw error to be caught in ui
        throw err;
    }
}
export async function updateEmail(token, password, newEmail){
    try{
        await serverData.updateEmail(token, password, newEmail);
        localData.updateEmail(newEmail);
    }  catch(err){
        // Throw error to be caught in ui
        throw err;
    }
}
export async function updateDisplayName(token, password, newDisplayName){
    try{
        await serverData.updateDisplayName(token, password, newDisplayName);
        localData.updateEmail(newDisplayName);
    }  catch(err){
        // Throw error to be caught in ui
        throw err;
    }
}
export async function updatePassword(token, currentPassword, newPassword){
    return serverData.updatePassword(token, currentPassword, newPassword);
}


export const saveUserInfo = localData.saveUserInfo; 
export const loadLocalUserInfo = localData.loadUserInfo;
export const saveToken = localData.saveToken;
export const loadToken = localData.loadToken;
export const logoutUser = localData.logout;

