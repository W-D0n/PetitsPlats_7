import {inputFilter, updateFilter, updateFilteredRecipes} from './filters';
import { renderCard } from '../views/recipes';

export let currentFilteredRecipes = [];


function checkCurrentFilteredRecipes(array){
  if(currentFilteredRecipes.length == 0){
    return currentFilteredRecipes = [...array];
  }
  console.log('tableau filled');
  return currentFilteredRecipes;
}

function principalFieldResearch(str, array){
  const value = str.toLowerCase();
  const filtered = array.filter((recipe) => {
    return inputFilter(value, recipe);      
  });
  return currentFilteredRecipes = filtered;
}

function updateCurrent(str, array, category) {
  const value = str.toLowerCase();
  const filtered = array.filter((recipe) => {
    return updateFilter(value, recipe, category);      
  });
  return currentFilteredRecipes = filtered;
}


/**
 * @description 
 * @param {*} array
 */
function researchEvent(array) {
  let currentArray = checkCurrentFilteredRecipes(array);
  const searchFields = [...document.querySelectorAll('.search__field')];
  for (const field of searchFields) {
    const fieldType = field.dataset.type;
    field.addEventListener('input', () => {
      if (field.value.length > 2 && fieldType === 'global') {
        principalFieldResearch(field.value, currentArray);
        console.log('updateCurrent Principal: ', currentFilteredRecipes);
        renderCard(currentFilteredRecipes);
      }
      if (field.value.length > 2 && (fieldType === 'ingredients' || fieldType === 'appliance' || fieldType === 'ustensils')) {
        updateCurrent(field.value, currentFilteredRecipes, fieldType);
        console.log('updateCurrent Drop: ', currentFilteredRecipes);
        renderCard(currentFilteredRecipes);
      }
    });
  }
  const mainSearchField = document.getElementById('mainField');
  mainSearchField.addEventListener('input', () => {
    console.log('ok');
    const filteredRecipes = updateFilteredRecipes();
    renderCard(filteredRecipes);
  });
}

// currentFilteredRecipes = principalFieldResearch(currentFilteredRecipes);

export function searchEventHandler(recipesArray) {
  researchEvent(recipesArray);
}