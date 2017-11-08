/* 
STORED DATA
    recipes: [], (TODO remove this and all references. New format is pulled from friends as needed)
    friends: [],
    userInfo: {
        recipes: [{}]
        userId: '',
        username: '',
        displayName: ''
    }
    token: ''
*/

//TODO switch username,... to under user.username,...

// Paranoid about getting data string wrong
const localStorageKey = 'cookbook'; 

// Used on 'logout'
const initialVals = {
    recipes: [],
    friends: [],
    userInfo: {},
    backlog: {},
    token: "",
};

const storageKeys = {
    recipes: 'recipes',// TODO will be removed
    friends: 'friends',
    userInfo: 'userInfo',
    backlog: 'backlog',
    token: 'token'
};


// Turns string into it's master localStorage key
const masterKey = (keyString)=>localStorageKey + '-' + keyString; 

// New localStorage functions, prop specific
function getLocalData(saveKey){
    // Turns savekey into master
    const masterSaveKey = masterKey(saveKey);

    // Get localStorage data
    const localStringData = 
        localStorage.getItem(masterSaveKey);
    let localData;
    try {
        const parsedLocal = JSON.parse(localStringData);
        localData = parsedLocal;
    } 
    catch(e){
        console.log('JSON couldn\'t parse from local: ', e);
    }
    return localData;
}
function setLocalData(data, saveKey){
    const saveString = JSON.stringify(data);
    const masterSaveKey = masterKey(saveKey);
    localStorage.setItem(masterSaveKey, saveString);
}


// RECIPE FUNCTIONS (TODO only 'save' needed, and it will go to userInfo)
export function saveRecipes(arrOfRecipeObjs){
    const updatedRecipes = {};
    for(let recipe of arrOfRecipeObjs){
        updatedRecipes[recipe.id] = recipe;
    };
    const userInfo = loadUserInfo();
    const newRecipes = {
        ...userInfo.recipes,
        ...updatedRecipes
    };
    const newUserInfo={
        ...userInfo,
        recipes: newRecipes
    };
    saveUserInfo(newUserInfo);
    return newUserInfo;
}

export function deleteRecipes(recipeIds){
    const userInfo = loadUserInfo();
    // Deletes each recipe id in recipeIds from newRecipes
    const newRecipes = {...userInfo.recipes};
    for(let id of recipeIds){
       delete newRecipes[id];
    };
    const newUserInfo={
        ...userInfo,
        recipes: newRecipes
    };
    saveUserInfo(newUserInfo);
    return newUserInfo;
}


// FRIEND FUNCTIONS
export function saveFriends(arrOfFriendObjs){
    setLocalData(arrOfFriendObjs, storageKeys.friends);
}
export function loadFriends(){
    return getLocalData(storageKeys.friends);
}

export function deleteFriendsByIds(friendIdArray){
    // Get current friend array
    const currentFriends = loadFriends();
    // Filters out friend ids being deleted
    const newFriends = currentFriends.filter(
        friend=>!friendIdArray.includes(friend.userId)
    );
    // Saves new data to local
    saveFriends(newFriends)
    return newFriends;
}

// BACKLOG FUNCTIONS
export function saveBacklog(backlogObj){
    setLocalData(backlogObj, storageKeys.backlog);
}
export function loadBacklog(){
    return getLocalData(storageKeys.backlog);
}


// WHOLE STATE FUNCTIONS
export function saveAllData(appState, backlog){
    // Grab needed values for each peice(not needed, but neater)
    const newRecipes = appState.recipes;
    const newFriends = appState.friends;
    const newUserInfo = appState.userInfo;
        
    // Saves each app piece under it's own localStorage
    saveRecipes(newRecipes);
    saveFriends(newFriends);
    setLocalData(newUserInfo, storageKeys.userInfo);
    setLocalData(backlog, storageKeys.backlog);
}
export function loadAllData(){
    const friends = loadFriends() || [];
    const userInfo =
        getLocalData(storageKeys.userInfo) || {};
    const backlog = 
        getLocalData(storageKeys.backlog) || {};
    
    // Builds object with all values
    const newData = {
        friends,
        userInfo,
        backlog
    }
    return newData;
}

export function saveUserInfo(newInfo){
    setLocalData({...newInfo}, storageKeys.userInfo);
}

export function loadUserInfo(){
    return getLocalData(storageKeys.userInfo) || {};
}

export function saveToken(newToken){
    setLocalData(newToken, storageKeys.token);
};
export function loadToken(){
    return getLocalData(storageKeys.token) || "";
}

export function logout(){
    // Resets all data to empty type
    localStorage.clear();
    const allKeys = Object.keys(storageKeys);
    for(let key of allKeys){
        setLocalData(initialVals[key], allKeys[key]);    
    }
}