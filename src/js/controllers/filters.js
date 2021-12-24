import recipesFullList from './data';
import { tagList } from './tags';


function filterByIngredients(input, recipe) {
  for (let i = 0; i < recipe.length; i++) {
    const element = recipe[i];
    const ingredientLowerCase = element.ingredient.toLowerCase();
    if (ingredientLowerCase.match(input)) {
      return true;
    }
  }
  return false;
}

export function filterRecipeByIngredientTags(recipeIngredients) {
  const ingredientTags = Array.from(tagList.ingredients);
  // transform array objet to a new string array with only the name of ingredient(string) objects
  const ingredients_ = recipeIngredients.map(ingredient => ingredient.ingredient.toLowerCase());

  for (let index = 0; index < ingredientTags.length; index++) {
    const ingredientTag = ingredientTags[index].toLowerCase();
    if (!ingredients_.includes(ingredientTag)) {
      return false;
    }
  }
  return true;
}

export function filterRecipeByUstensilsTags(recipeUstensils) {
  const ustensilTags = Array.from(tagList.ustensils);

  for (let index = 0; index < ustensilTags.length; index++) {
    const ustensil = ustensilTags[index];
    if (!recipeUstensils.includes(ustensil)) {
      return false;
    }
  }
  return true;
}

/**
 * @description Filter tags. Get nodeList from DOM. Calling function that check if tag matche with searchText.
 * @param {*} field 
 */
export function filterDisplayedTags(field) {
  let nodeList = document.querySelectorAll(`#${field.dataset.type}List li`);
  filterTagsMatchingWithSearchText(nodeList, field.value.toLowerCase());
}
/**
 * @description If string matches with searchText, add class 'display block' css rule to the node, if not display none.
 * @param {Object} nodelist array of nodes
 * @param {String} searchText
 */
function filterTagsMatchingWithSearchText(nodeList, searchText) {
  for (let i = 0; i < nodeList.length; i++) {
    const element = nodeList[i];
    if (element.textContent.toLowerCase().match(searchText)) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }
}

/**
 * @description Display all tags (kind of a reset).
 * @param {String} fieldType
 */
export function displayAllDropdownTags(fieldType) {
  let nodeList = document.querySelectorAll(`#${fieldType}List li`);
  for (let i = 0; i < nodeList.length; i++) {
    const element = nodeList[i];
    element.style.display = 'block';
  }
}

/**
 * @description Filter recipes by removing the recipes that don't match the searchquery
 * @param {Object} node
 * @returns {Object} array of filtered recipes
 */
export function updateFilteredRecipes(input) {
  let currentFilteredRecipes = [...recipesFullList];

  const searchWithTextField = input.value.length > 2;
  for (let i = 0; i < currentFilteredRecipes.length; i++) {
    const recipe = currentFilteredRecipes[i];
    if (
      (
        searchWithTextField &&
        !recipe.name.toLowerCase().match(input.value) &&
        !recipe.description.toLowerCase().match(input.value) &&
        !filterByIngredients(input.value, recipe.ingredients)
      ) ||
      (tagList.ingredients.size > 0 && !filterRecipeByIngredientTags(recipe.ingredients)) ||
      (tagList.appliance && recipe.appliance != tagList.appliance) ||
      (tagList.ustensils.size > 0 && !filterRecipeByUstensilsTags(recipe.ustensils))
    ) {
      currentFilteredRecipes.splice(i, 1);
      i--;
    }
  }
  // console.log('currentFilteredRecipes : ', currentFilteredRecipes);
  return currentFilteredRecipes;
}
