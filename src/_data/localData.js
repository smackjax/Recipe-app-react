// Used on 'logout'
const initialVals = {
    userInfo: {},
    token: "",
};

const storageKeys = {
    userInfo: 'userInfo',
    token: 'token'
};

// New localStorage functions, prop specific
function getLocalData(saveKey){
    // Get localStorage data
    const localStringData = 
        localStorage.getItem(saveKey);
    let localData;
    try {
        const parsedLocal = JSON.parse(localStringData);
        localData = parsedLocal;
    } 
    catch(err){
        console.log("JSON couldn't parse from local: ", err);
    }
    return localData;
}
function setLocalData(data, saveKey){
    const saveString = JSON.stringify(data);
    localStorage.setItem(saveKey, saveString);
}


// ** USER FUNCTIONS
export function saveUserInfo(newInfo){
    setLocalData({...newInfo}, storageKeys.userInfo);
}

export function loadUserInfo(){
    return getLocalData(storageKeys.userInfo) || {};
}

export function saveToken(newToken){
    setLocalData(newToken, storageKeys.token);
}
export function loadToken(){
    return getLocalData(storageKeys.token) || "";
}

export function updateUsername(newUsername){
    const currentInfo = getLocalData(storageKeys.userInfo) || {};
    const newInfo = {
        ...currentInfo, 
        username: newUsername
    };
    saveUserInfo(newInfo);
}
export function updateEmail(newEmail){
    const currentInfo = getLocalData(storageKeys.userInfo) || {};
    const newInfo = {
        ...currentInfo, 
        email: newEmail
    };
    saveUserInfo(newInfo);
}
export function updateDisplayName(newDisplayName){
    const currentInfo = getLocalData(storageKeys.userInfo) || {};
    const newInfo = {
        ...currentInfo, 
        displayName: newDisplayName
    };
    saveUserInfo(newInfo);
}


export function logout(){
    // Resets all data to empty type
    localStorage.clear();
    const allKeys = Object.keys(storageKeys);
    for(let key of allKeys){
        setLocalData(initialVals[key], allKeys[key]);    
    }
}