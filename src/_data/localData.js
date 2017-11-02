/* 
STORED DATA
    recipes: [],
    friends: [],
    userId: '',
    username: '',
    displayName: '',
    verified: true,
    jwt: ''
*/

//TODO switch username,... to under user.username,...

// Paranoid about getting data string wrong
const localStorageKey = 'cookbook'; 

const storageKeys = {
    // These key strings have to match main state props on app
    recipes: 'recipes',
    friends: 'friends',
    userInfo: 'userInfo',
    backlog: 'backlog'
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
        console.log('JSON couldn\'t parse from local');
    }
    return localData;
}
function setLocalData(data, saveKey){
    const saveString = JSON.stringify(data);
    const masterSaveKey = masterKey(saveKey);
    localStorage.setItem(masterSaveKey, saveString);
}

// Generic delete for arrays of objects lists
function deleteByIds(idsToDelete, saveKey){
    const currentItems = getLocalData(saveKey);
    const newItems = currentItems.filter(
        cItem=>!idsToDelete.includes(cItem.id)
    );
    setLocalData(newItems, saveKey);
    return newItems;
}

// RECIPE FUNCTIONS
export function saveRecipes(arrOfRecipeObjs){
    const key = masterKey(storageKeys.recipes);
    setLocalData(arrOfRecipeObjs, key);
}
export function loadRecipes(){
    const key = masterKey(storageKeys.recipes);
    return getLocalData(key);
}
export function deleteRecipeIds(recipeIdArray){
    const newRecipes = 
        deleteByIds(recipeIdArray, storageKeys.recipes);
    return newRecipes;
}


// FRIEND FUNCTIONS
export function saveFriends(arrOfFriendObjs){
    const key = masterKey(storageKeys.friends);
    setLocalData(arrOfFriendObjs, key);
}
export function loadFriends(){
    const key = masterKey(storageKeys.friends);
    return getLocalData(key);
}
export function deleteFriendsByIds(friendIdArray){
    const newFriends = 
        deleteByIds(friendIdArray, storageKeys.friends);
    return newFriends;
}
export function clearRecipesFromDeletedIds(friendIds){
    const currentRecipes = loadRecipes();
    const filteredRecipes = currentRecipes.filter(
        recipe=>!friendIds.includes(recipe.ownerId)
    );
    saveRecipes(filteredRecipes);
};

// BACKLOG FUNCTIONS
export function saveBacklog(backlogObj){
    const key = masterKey(storageKeys.backlog);
    setLocalData(backlogObj, key);
}
export function loadBacklog(){
    const key = masterKey(storageKeys.backlog);
    return getLocalData(key);
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
    setLocalData(newUserInfo, masterKey(storageKeys.userInfo));
    setLocalData(backlog, masterKey(storageKeys.backlog));
}
export function loadAllData(){
    const recipes = 
        loadRecipes() || []; //FAKDATA.recipes;
    const friends =
        loadFriends() || []; // FAKEDATA.friends;
    const userInfo =
        getLocalData(masterKey(storageKeys.userInfo)) || {}; // FAKEDATA.userInfo;
    const backlog = 
        getLocalData(masterKey(storageKeys.backlog)) || {}; // FAKEDATA.backlog;
    
    // Builds object with all values
    const newData = {
        recipes,
        friends,
        userInfo,
        backlog
    }
    return newData;
}

export function saveUserInfo(newInfo){
    const key = masterKey(storageKeys.userInfo);
    setLocalData({...newInfo}, key);
}

export function loadUserInfo(){
    const userInfo =
        getLocalData(masterKey(storageKeys.userInfo)) || {};
    return userInfo;     
}