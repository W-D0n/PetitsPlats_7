import { itemSearchObject } from './tags';
/* render
  filter objectdata
*/
let filteredRecipes = [];


/**
 * @description Trigger research with input field value.
 */
// function searchBySearchField (recipesFullList) {  
//   const searchField = document.querySelector('.inputSearch');
//   // const searchField = document.querySelector('.dropdown-search__field');
//   searchField.addEventListener('input', () => {
//     if (searchField.value.length > 2) {
//       filteredRecipes = [];
//       searchRecipes(searchField.value, recipesFullList);
//       console.log('filteredRecipes : ', filteredRecipes);
//     };
//   });
// }

/**
 * @description a corriger : doit inclure description name
 * @description For each recipe in recipes array, if input string comparison is true then push into filtered array.
 * @param {string} str
 * @returns {object} filtered array
 */
function searchRecipes (str, recipesFullList) {
  const searchInput = str.toLowerCase();
  for (let i = 0; i < recipesFullList.length; i++) {
  const recipe = recipesFullList[i];
    if (filterIngredients(recipe.ingredients, searchInput)) {
      filteredRecipes.push(recipe);
    }
  }
  return filteredRecipes;
}
/** * 
 * @description FILTER
 * @param {*} arr 
 * @param {*} str 
 * @returns {object} filtered array  
 */
function filterIngredients (arr, str) {  
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    const ingredientUpperCase = el.ingredient.toUpperCase();
    
    if (ingredientUpperCase.match(str)) {
      return true;
    }
  }
  return false;
}



/**
 *@description Filter recipes by ingredient tags.
 * @param {*} ingredients 
 * @param {*} searchText 
 * @returns 
 */
/*function recipeIngredientsMatchWithSearchText(ingredients, searchText) {
  const searchTextLower = searchText.toLowerCase();
  for(let i = 0, l = ingredients.length; i < l; i++) {
    const ingredient = ingredients[i];
    if(ingredient.ingredient.toLowerCase().match(searchTextLower)) {
      console.log('true');
      return true;
    }
  }
  return false;
}

function updateFilteredRecipes(recipesFullList, searchField) {
  let currentFilteredRecipes = [...recipesFullList];
  const searchWithTextField =  searchField.length > 2;
  console.log('searchWithTextField : ', searchWithTextField);
  for (let i = 0; i < currentFilteredRecipes.length; i++) {
    const recipe = currentFilteredRecipes[i];
    console.log('searchField : ', searchField);
    console.log('recipe : ', recipe);
    console.log('recipe.name : ', recipe.name);
    console.log('recipe.name Test: ', recipe.name.toLowerCase().match(searchField));
    console.log('recipe.description : ', recipe.description.toLowerCase().match(searchField));
    console.log('recipe.ingredients : ', recipe.ingredients);
    if(
        (
          searchWithTextField && 
          !recipe.name.toLowerCase().match(searchField) &&
          !recipe.description.toLowerCase().match(searchField) && 
          !recipeIngredientsMatchWithSearchText(recipe.ingredients, searchField)          
        ) || 
        (itemSearchObject.ingredients.size > 0 && !filterRecipeByIngredientTags(recipe.ingredients)) ||
        (itemSearchObject.ustensils.size > 0 && !filterRecipeByUstensilsTags(recipe.ustensils)) ||
        (itemSearchObject.appliance && recipe.appliance != itemSearchObject.appliance)
      ) {
        currentFilteredRecipes.splice(i, 1);
        i--;
    }
  }
  console.log("currentFilteredRecipes : ", currentFilteredRecipes);
  return currentFilteredRecipes;
} */


function updateFilteredRecipes() {
  let currentFilteredRecipes = [...recipesFullList]; // clone du tableau
  if (searchfield.length > 2) {
    currentFilteredRecipes = searchRecipes(searchfield);
  }
  if (itemSearchObject.ingredients.size > 0) {
    for(let i = 0; i < currentFilteredRecipes.length; i++) {
      const recipe = currentFilteredRecipes[i];
      if (!filterRecipeByIngredientTags(recipe.ingredients)) {
        currentFilteredRecipes.splice(i, 1);
        i--;
      }
    }
  }
  if (itemSearchObject.ustensils.size > 0) {
    for(let i = 0; i < currentFilteredRecipes.length; i++) {
      const recipe = currentFilteredRecipes[i];
      if (!filterRecipeByUstensilsTags(recipe.ustensils)) {
        currentFilteredRecipes.splice(i, 1);
        i--;
      }
    }
  }
  if (itemSearchObject.appliance) {
    for(let i = 0; i < currentFilteredRecipes.length; i++) {
      const recipe = currentFilteredRecipes[i];
      if(recipe.appliance != itemSearchObject.appliance){
        currentFilteredRecipes.splice(i, 1);
        i--;
      }
    }
  }
  console.log('currentFilteredRecipes : ', currentFilteredRecipes);
  return currentFilteredRecipes;
}

function filterRecipeByIngredientTags (recipeIngredients) {
  itemSearchObject.ingredients.forEach((ingredientTag) => {
    if (!recipeIngredients.includes(ingredientTag)) {
      return false;
    }
  })
  return true;
}
function filterRecipeByUstensilsTags(recipeUstensils) {
  itemSearchObject.ustensils.forEach((ustensilsTag) => {
    if (!recipeUstensils.includes(ustensilsTag)) {
      return false;
    }
  })
  return true;
}













// export function filterRecipes(recipesFullList) {
//   searchBySearchField(recipesFullList)
//   const currentFilteredRecipes = updateFilteredRecipes(recipesFullList);
//   renderFilteredRecipes(currentFilteredRecipes);
// }

function searchFieldEvent(recipesFullList) {
  const searchField = document.querySelector('.inputSearch');
  searchField.addEventListener('input', () => {
    if (searchField.value.length > 2) {
      updateFilteredRecipes(recipesFullList, searchField.value);
    }
  });
}
export function searchEventHandlers(recipesFullList) {
  searchFieldEvent(recipesFullList);
}