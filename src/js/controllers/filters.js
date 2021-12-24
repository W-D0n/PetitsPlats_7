import recipesFullList from './data';
import { tagList } from './tags';

/**
 * @description Check if the search input match with ingredients
 * @param {Object} recipeUstensils 
 * @returns {Boolean}
 */
function isInputMatchIngredient (input, recipe) {
  for (let i = 0; i < recipe.length; i++) {
    const element = recipe[i];
    const ingredientLowerCase = element.ingredient.toLowerCase();    
    if (ingredientLowerCase.match(input)) {
      return true;
    }
  }
  return false;
}

/**
 * @description Check if the ingredient tag is in the recipe ingredients list
 * @param {Object} recipeUstensils 
 * @returns {Boolean}
 */
export function isTagInRecipeIngredientsList (recipeIngredients) {  
  const ingredientTags = Array.from(tagList.ingredients);
  // transform array objet to a new string array with only the name of ingredient(string) objects
  const ingredients_ = recipeIngredients.map(ingredient => ingredient.ingredient.toLowerCase());
  
  for (let index = 0; index < ingredientTags.length; index++) {      
    const ingredientTag = ingredientTags[index].toLowerCase();      
    if (ingredients_.includes(ingredientTag)) { //
        return true;
      }
    }
}

/**
 * @description Check if the ustensil tag is in the recipe ustensils list
 * @param {Object} recipeUstensils 
 * @returns {Boolean}
 */
export function isTagInRecipeUstensilsList(recipeUstensils) {
  const ustensilTags = Array.from(tagList.ustensils);
  for (let index = 0; index < ustensilTags.length; index++) {
    const ustensil = ustensilTags[index];
    if (recipeUstensils.includes(ustensil)) {
      return true;
    }
  }
}

/**
 * @description Filter tags. Get nodeList from DOM. Calling function that check if tag match with searchText.
 * @param {String} field 
 */
export function filterDisplayedTags (field) {
  let nodeList = document.querySelectorAll(`#${field.dataset.type}List li`);
  filterTagsMatchingWithSearchText(nodeList, field.value.toLowerCase());
}
/**
 * @description If string match with searchText, add class 'display block' css rule to the node, if not display none.
 * @param {Object} nodelist array of nodes
 * @param {String} searchText
 */
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
 * @description Save recipes that match with conditions (inputs and tags).
 * @param {Object} node
 * @returns {Object} array of filtered recipes
 */
export function updateFilter(input) {
  let temp = [...recipesFullList];
  const searchWithTextField = input.value.length > 2;

  temp = recipesFullList.filter(recipe => {
    return (
      !searchWithTextField ||
      recipe.name.toLowerCase().match(input.value) ||
      recipe.description.toLowerCase().match(input.value) ||
      isInputMatchIngredient(input.value, recipe.ingredients)
    ) &&
      (tagList.ingredients.size == 0 || isTagInRecipeIngredientsList(recipe.ingredients)) ||
      (!tagList.appliance || recipe.appliance == tagList.appliance) ||
      (tagList.ustensils.size == 0 || isTagInRecipeUstensilsList(recipe.ustensils));
  });

  // const currentFilteredRecipes = recipesFullList.filter(n => !temp.includes(n));

  return temp;
}