import axios from 'axios';
const api = axios.create({
    baseURL: "http://localhost:1337/api",
    timeout: 5000,
    headers: {"Content-Type" : "application/json"}
});

// All functions return an axios request(a Promise)
// axios defaults to json

// TODO change server to handle/only take arrays

// ** Login/create new
// Returns only this user's info
export const createNewUser = (username, displayName, password)=>{
    const reqBody = {
        username,
        displayName, 
        password
    };
    return api.post('/login/new-user', reqBody);
}
export const loginExistingUser = (username, password)=>{
    const reqBody = {
        username,
        password
    };
    return api.post('/login/existing', reqBody);
}

// ** Get data(from sign in or opening app if logged in)
// Returns all user data(including recipes and friend info)
export const getUserData = (token)=>{
    return api.post('/user', {}, { 
        headers: {"Authorization" : "Bearer " + token}
    });
}

// ** Recipes
export const saveRecipes = (token, recipeObjArray)=>{
    const reqBody = {
        newRecipes: recipeObjArray
    };
    return api.post('/recipes/', reqBody, { 
        headers: {"Authorization" : "Bearer " + token}
    });
};
                                                                                                                                 
export const deleteRecipesById = (token, recipeIds)=>{
    const reqBody = {
        recipeIds
    };
    return api.delete('/recipes/', reqBody, { 
        headers: {"Authorization" : "Bearer " + token}
    });
};

// Friends
export const followByUsername = (token, friendUsername)=>{
    const reqBody = {
        friendUsername
    };
    api.post('/friends/', reqBody, {
        headers: {"Authorization" : "Bearer " + token}
    });
}
export const deleteFriendsById = (token, friendIds)=>{
    const reqBody = {
        friendIds
    };
    api.delete('/friends/', reqBody, {
        headers: {"Authorization": "Bearer " + token}
    });
};

// User info
export function updateUsername(token, newUsername){
    const reqBody = {
        newUsername
    };
    api.post('/user/update-username', reqBody, { 
        headers: {"Authorization" : "Bearer " + token}
    });
}
export function updateDisplayName(token, newDisplayName){
    const reqBody = {
        newDisplayName
    };
    api.post('/user/update-username', reqBody, { 
        headers: {"Authorization" : "Bearer " + token}
    });
}
export function updatePassword(token, newPassword){
    const reqBody = {
        newPassword
    };
    api.post('/user/update-username', reqBody, { 
        headers: {"Authorization" : "Bearer " + token}
    });
}

