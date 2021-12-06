import recipesFullList from './data';
import { tagList } from './tags';


function filterByIngredients (input, recipe) {  
  for (let i = 0; i < recipe.length; i++) {
    const element = recipe[i];
    const ingredientLowerCase = element.ingredient.toLowerCase();    
    if (ingredientLowerCase.match(input)) {
      return true;
    }
  }
  return false;
}

export function filterRecipeByIngredientTags (recipeIngredients) {
  tagList.ingredients.forEach((ingredientTag) => {
    if (!recipeIngredients.includes(ingredientTag)) {
      return false;
    }
  })
  return true;
}
export function filterRecipeByUstensilsTags(recipeUstensils) {
  tagList.ustensils.forEach((ustensilsTag) => {
    if (!recipeUstensils.includes(ustensilsTag)) {
      return false;
    }
  })
  return true;
}

export function filterDisplayedTags(field) {
  let nodeList = document.querySelectorAll(`#${field.dataset.type}List li`);
  filterTagsMatchingWithSearchText (nodeList, field.value.toLowerCase());
}

function filterTagsMatchingWithSearchText (nodeList, searchText) {
  for (let i = 0; i < nodeList.length; i++) {
    const element = nodeList[i];
    if(element.textContent.toLowerCase().match(searchText)) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }
}

export function displayAllDropdownTags(fieldType) {
  let nodeList = document.querySelectorAll(`#${fieldType}List li`);
  for (let i = 0; i < nodeList.length; i++) {
    const element = nodeList[i];
    element.style.display = 'block';
  }
}

/**
 * @description Filter recipes by removing the recipes that don't match the searchquery
 * @returns {Object}
 */
export function updateFilteredRecipes() {
  console.log('tagList', tagList);
  console.log('tagList.ingredients', tagList.ingredients);
  console.log('tagList.ustensils', tagList.ustensils);
  console.log('tagList.appliance', tagList.appliance);
  const mainSearchField = document.getElementById('mainField');
  let currentFilteredRecipes = [...recipesFullList];
  const searchWithTextField =  mainSearchField.value.length > 2;
  for (let i = 0; i < currentFilteredRecipes.length; i++) {
    const recipe = currentFilteredRecipes[i];
    if(
        (
          searchWithTextField && 
          !recipe.name.toLowerCase().match(mainSearchField.value) &&
          !recipe.description.toLowerCase().match(mainSearchField.value) && 
          !filterByIngredients(mainSearchField.value, recipe.ingredients)         
        ) || 
        (tagList.ingredients.size > 0 && !filterRecipeByIngredientTags(recipe.ingredients)) ||
        (tagList.appliance && recipe.appliance != tagList.appliance) ||
        (tagList.ustensils.size > 0 && !filterRecipeByUstensilsTags(recipe.ustensils)) 
      ) {
        currentFilteredRecipes.splice(i, 1);
        i--;
    }
  }
  console.log('currentFilteredRecipes : ', currentFilteredRecipes);
  return currentFilteredRecipes;
}
