import recipesFullList from './data';
import { tagsSearchObject } from './tags';

// export function inputFilter (input, recipe) {
//   if (filterByText(input, recipe) || filterByIngredients(input, recipe) || filterByAppliance(input, recipe)) {
//     return true;
//   }
//   return false;
// }

// export function updateFilter (input, recipe, category) {
//   if (category === 'ingredients') {
//     return filterByIngredients(input, recipe);
//   }
//   if (category === 'appliance') {
//     return filterByAppliance(input, recipe);
//   }
//   if (category === 'ustensils') {
//     return filterByUstensils(input, recipe);
//   }  
//   return false;
// }

// function filterByText(input, recipe) {  
//   const name = recipe.name.toLowerCase();
//   const desc = recipe.description.toLowerCase();
//   if ((name.match(input)) || (desc.match(input))) {
//     return true;
//   }
//   return false;
// }
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
// function filterByAppliance (input, recipe) {
//   const appliance = recipe.appliance.toLowerCase();    
//   if (appliance.match(input)) {
//     return true;
//   }
//   return false;
// }
// function filterByUstensils (input, recipe) {
//   for (let i = 0; i < recipe.length; i++) {
//     const element = recipe[i];
//     const ustensilLowerCase = element.toLowerCase();    
//     if (ustensilLowerCase.match(input)) {
//       return true;
//     }
//   }
//   return false;
// }

// /**
//  *@description reset current filteredRecipes
//  * @param {Object} recipeIngredients 
//  * @returns {Object} recipeIngredients
//  */
// export function resetCurrentFilteredRecipes (currentArray) {
//   return {
//     currentArray : [...recipesFullList]
//   };
// }

export function filterRecipeByIngredientTags (recipeIngredients) {
  tagsSearchObject.ingredients.forEach((ingredientTag) => {
    if (!recipeIngredients.includes(ingredientTag)) {
      return false;
    }
  })
  return true;
}
export function filterRecipeByUstensilsTags(recipeUstensils) {
  tagsSearchObject.ustensils.forEach((ustensilsTag) => {
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

export function displayAllTags(fieldType) {
  let nodeList = document.querySelectorAll(`#${fieldType}List li`);
  for (let i = 0; i < nodeList.length; i++) {
    const element = nodeList[i];
    element.style.display = 'block';
  }
}

/**
 * @description Filter recipes by ingredient tags.
 * @returns {Object}
 *
 */
export function updateFilteredRecipes() {
  const mainSearchField = document.getElementById('mainField');
  let currentFilteredRecipes = [...recipesFullList];
  const searchWithTextField =  mainSearchField.value.length > 2;
  console.log('searchWithTextField : ', searchWithTextField);
  for (let i = 0; i < currentFilteredRecipes.length; i++) {
    const recipe = currentFilteredRecipes[i];
    if(
        (
          searchWithTextField && 
          !recipe.name.toLowerCase().match(mainSearchField.value) &&
          !recipe.description.toLowerCase().match(mainSearchField.value) && 
          !filterByIngredients(mainSearchField.value, recipe.ingredients)         
        ) || 
        (tagsSearchObject.ingredients.size > 0 && !filterRecipeByIngredientTags(recipe.ingredients)) ||
        (tagsSearchObject.ustensils.size > 0 && !filterRecipeByUstensilsTags(recipe.ustensils)) ||
        (tagsSearchObject.appliance && recipe.appliance != tagsSearchObject.appliance)
      ) {
        currentFilteredRecipes.splice(i, 1);
        i--;
    }
  }
  console.log("currentFilteredRecipes : ", currentFilteredRecipes);
  return currentFilteredRecipes;
}