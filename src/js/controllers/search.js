import { renderCard } from '../views/recipesCards';
import { renderDropdowns } from '../views/tags';
import { updateFilteredRecipes, filterDisplayedTags, displayAllDropdownTags } from './filters';

/**
 * @description filter recipes by input in search fields and then filter dropdown tags
 * @param {*} array
 */
function researchEvent() {
  const mainSearchField = document.getElementById('mainField');
  const searchFields = [...document.querySelectorAll('.search__field')];
  let filteredRecipes = [];

  mainSearchField.addEventListener('input', () => {
    filteredRecipes = updateFilteredRecipes(mainSearchField);
    renderCard(filteredRecipes);
    renderDropdowns(filteredRecipes);
    // console.log('mainSearchField', mainSearchField);
    // filterDisplayedTags(mainSearchField);
  });

  for (const field of searchFields) {
    field.addEventListener('input', () => {      
      if (field.value.length > 2) {
        filterDisplayedTags(field);
      } else if (field.value.length == 0) {
        displayAllDropdownTags(field.dataset.type);
      }
    });
  }
}

export function searchEventHandler(recipesArray) {
  researchEvent(recipesArray);
}