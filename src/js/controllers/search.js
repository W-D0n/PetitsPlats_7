import { renderCard } from '../views/recipesCards';
import { displayError } from '../views/layout';
import { renderDropdowns } from '../views/tags';
import { updateFilteredRecipes, filterDisplayedTags, displayAllDropdownTags } from './filters';

/**
 * @description event listeners (search bar + dropdown inputs) which update the filtered recipes
 */
function researchEvent() {
  const mainSearchField = document.getElementById('mainField');
  const searchFields = [...document.querySelectorAll('.search__field')];
  let filteredRecipes = [];

  mainSearchField.addEventListener('input', () => {
    filteredRecipes = updateFilteredRecipes(mainSearchField);
    renderCard(filteredRecipes);
    renderDropdowns(filteredRecipes);

    //if filteredRecipes is empty, display error message
    if (filteredRecipes.length === 0) {
      displayError();
    }
  });

  for (const field of searchFields) {
    field.addEventListener('input', () => {
      if (field.value.length > 2) {
        filterDisplayedTags(field);
      } else if (field.value.length < 3) {
        displayAllDropdownTags(field.dataset.type);
      }
    });
  }
}
function preventSubmit() {
  const form = document.querySelector('.searchBar');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

export function searchEventHandler(recipesArray) {
  researchEvent(recipesArray);
  preventSubmit();
}