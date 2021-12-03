import { filterByText, filterByIngredients,filterByAppliance, filterByUstensils } from './filters'

/* render
  filter objectdata
*/
let currentFilteredRecipes = [];

const checkIfcurrentListFill = (current) => {
  if (!current.length === 0) {
    console.log('la liste courrante des recettes n\'est pas vide');
    return true;
  }
  return false;
}

/**
 * @description For each recipe in recipes array, if input string comparison is true then push into filtered array.
 * @returns {object} filtered array
 */
function searchRecipes (str, recipesArray) {
  const searchInput = str.toLowerCase();
  for (let i = 0; i < recipesArray.length; i++) {
  const recipe = recipesArray[i];
    if (filterByText(searchInput, recipe) || filterByIngredients(searchInput, recipe.ingredients)) { // si c'est le global, toujours chercher sur la totalité.
      currentFilteredRecipes.push(recipe);
    }
  }
  console.log('currentFilteredRecipes : ', currentFilteredRecipes);
  return currentFilteredRecipes;
}


/**
 * @description je veux update current en fonction des recherches faites sur les dropdowns
 * @param {Object} array of current recipes
 */
function updateCurrentRecipesList(str, array) {
  for (let i = 0; i < array.length; i++) {
    const tempArray = [...array];
    const searchInput = str.toLowerCase();
    const recipe = recipesArray[i];
    if (filterByIngredients(searchInput, recipe.ingredients)){
      
    }
    currentFilteredRecipes.splice(i, 1);
    i--;
  }
}


/**
 * @description sur chaque input, je veux lancer une recherche spécifique, globale ou triée
 * @param {*} array 
 */
function searchOnInput(array) {
  const searchFields = [...document.querySelectorAll('.search__field')];
  for (const field of searchFields) {
    const fieldType = field.dataset.type;
    field.addEventListener('input', () => {
      currentFilteredRecipes = [];
      if (field.value.length > 2) {
        searchRecipes(fieldType, field.value.toLowerCase(), array);
      }
      if (fieldType === 'ingredients' || fieldType === 'appliance' || fieldType === 'ustensils'  ) {
        updateCurrentRecipesList(field.value.toLowerCase(), array);
      }
    });
  }  
}

/**
 *@description ici je veux utiliser le current pour faire les recherches (si vide recherche sur tout, sinon sur current)
 * @param {*} recipesArray 
 */
function research(recipesArray) {
  if (checkIfcurrentListFill(currentFilteredRecipes)) {
    console.log('true');
    searchOnInput(currentFilteredRecipes);
  } else {
    console.log('liste courrante vide');
    currentFilteredRecipes = [...recipesArray];
    searchOnInput(currentFilteredRecipes);
  }
}

export function searchEventHandler(recipesArray) {
  research(recipesArray);
}

//recherche par input

// re populate les listes d'items en fonction des recettes résultantes de la recherche
// OU Sinon je refais un setTagList avec un nouveau tableau de recettes.