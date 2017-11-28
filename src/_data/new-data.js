
// Updates both localStorage and server

// localStorage functions 
import * as localData from './localData';
// Server data functions
import * as serverData from './serverData';


// Loads all data
// ** does not return any JWT, only info for user already logged in
// Successful server response returns: 
// { userInfo: {}, friendsInfo: [{},{},...]}
export function loadAllData(token, handleServerSyncStatus){
    return serverData.getUserData(token)
}


// RECIPE FUNCTIONS
export function saveRecipe (token, newRecipe, handleServerSyncStatus){
    return serverData.saveRecipes(token, [newRecipe]);
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
    return serverData.deleteFriendsById(token, [friendId]);
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

