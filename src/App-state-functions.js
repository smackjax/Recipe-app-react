export function recipesIntoArray(recipesObj){
    // Extracts recipes from object into an array of objects
    const recipes = [];
    if(recipesObj){
        const userRecipeIds = Object.keys(recipesObj);
        for(let uRId of userRecipeIds){
            recipes.push(recipesObj[uRId]);
        }
        
    }
    return recipes;
}



export function convertFriendRecipesToArray(friendObj){

    const newList = recipesIntoArray(friendObj.recipes);
    const newFriend = {...friendObj, "recipes" : newList};
    return newFriend;
}                
export function allFriendRecipesToArrays(allFriendsArr){
    const newFriends = allFriendsArr.map(friendObj=>{
        return convertFriendRecipesToArray(friendObj);
    });
    return newFriends;
}

export async function getAllRecipes(arrayOfUserObjs){
    // Takes recipe objs of passed in array into one list
    const allRecipes = arrayOfUserObjs.map(
        user=>{ 
            return userIntoRecipeArrayWithUserDetails(user)
        }
        // Flattens to one array
    ).reduce((listOne, listTwo)=>listOne.concat(listTwo), []);
    return allRecipes;
}


function userIntoRecipeArrayWithUserDetails(user){
    // Extracts recipes from object into an array of objects
    const recipesObj = user.recipes;
    const recipes = [];
    if(recipesObj){
        const userRecipeIds = Object.keys(recipesObj);
        for(let uRId of userRecipeIds){
            const recipeObj = recipesObj[uRId];
            recipeObj.userInfo = {};
            recipeObj.userInfo.displayName = user.displayName;
            recipeObj.userInfo.username = user.username;
            recipes.push(recipeObj);
        }
        
    }
    return recipes;
}