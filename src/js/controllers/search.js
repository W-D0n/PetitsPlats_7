import { renderCard } from '../views/recipesCards';
import { createDropdownItems } from '../views/tags';
import { updateFilteredRecipes, filterDisplayedTags, displayAllDropdownTags } from './filters';

/**
 * @description filter recipes by input in search fieds and filter dropdown tags
 * @param {*} array
 */
function researchEvent() {
  const searchFields = [...document.querySelectorAll('.search__field')];
  const mainSearchField = document.getElementById('mainField');
  let filteredRecipes = [];

  mainSearchField.addEventListener('input', () => {
    filteredRecipes = updateFilteredRecipes();
    renderCard(filteredRecipes);
    createDropdownItems(filteredRecipes);
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