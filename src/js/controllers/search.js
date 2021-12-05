import { renderCard } from '../views/recipes';
import { createDropdownItems } from '../views/tags';
// import { inputFilter, updateFilter, updateFilteredRecipes } from './filters';
import { updateFilteredRecipes, filterDisplayedTags, displayAllTags } from './filters';


// function checkCurrentFilteredRecipes(array){
//   if(currentFilteredRecipes.length == 0){
//     return currentFilteredRecipes = [...array];
//   }
//   console.log('tableau filled');
//   return currentFilteredRecipes;
// }

// function principalFieldResearch(str, array){
//   const value = str.toLowerCase();
//   const filtered = array.filter((recipe) => {
//     return inputFilter(value, recipe);      
//   });
//   return currentFilteredRecipes = filtered;
// }

// function updateCurrent(str, array, category) {
//   const value = str.toLowerCase();
//   const filtered = array.filter((recipe) => {
//     return updateFilter(value, recipe, category);      
//   });
//   return currentFilteredRecipes = filtered;
// }


/**
 * @description 
 * @param {*} array
 */
function researchEvent() {
  // let currentArray = checkCurrentFilteredRecipes(array);
  const searchFields = [...document.querySelectorAll('.search__field')];
  const mainSearchField = document.getElementById('mainField');
  let filteredRecipes = [];

  for (const field of searchFields) {
    // const fieldType = field.dataset.type;
    field.addEventListener('input', () => {
      // if (field.value.length > 2 && fieldType === 'global') {
      //   principalFieldResearch(field.value, currentFilteredRecipes);
      //   console.log('updateCurrent Principal: ', currentFilteredRecipes);
      //   renderCard(currentFilteredRecipes);
      // }
      // if (field.value.length > 2 && (fieldType === 'ingredients' || fieldType === 'appliance' || fieldType === 'ustensils')) {
      //   updateCurrent(field.value, currentFilteredRecipes, fieldType);
      //   console.log('updateCurrent Drop: ', currentFilteredRecipes);
      //   renderCard(currentFilteredRecipes);
      // }
      if (field.value.length > 2) {
        filterDisplayedTags(field);
      } else if (field.value.length == 0) {
        displayAllTags(field.dataset.type);
      }
    });
  }
  mainSearchField.addEventListener('input', () => {
    filteredRecipes = updateFilteredRecipes();
    renderCard(filteredRecipes);
    createDropdownItems(filteredRecipes);
  });
}

export function searchEventHandler(recipesArray) {
  researchEvent(recipesArray);
}