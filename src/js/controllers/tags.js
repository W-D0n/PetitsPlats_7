import { updateFilteredRecipes } from './filters';
import { renderDropdowns, removeDropdownItem } from '../views/tags';
import { renderCard } from '../views/recipesCards';
import { addSelectedTag } from '../views/layout';

let filteredRecipes = [];

/**
 * @description
 */
export let tagList = {
  'ingredients': new Set(),
  'appliance': '',
  'ustensils': new Set()
};

/**
 * @description when a tag is clicked, it is added to the "search" tagList, and update the filteredRecipes
 */
export function addSearchTag() {
  const mainSearchField = document.getElementById('mainField');
  const tags = [...document.querySelectorAll('.dropdown-item')];

  for (const item of tags) {
    item.addEventListener('click', () => {
      const itemType = item.dataset.type;
      const itemValue = item.dataset.value;

      if (itemType!='appliance') {
        tagList[itemType].add(itemValue);
      } else {
        tagList[itemType] = itemValue;
      }
      addSelectedTag(itemType, itemValue);
      filteredRecipes = updateFilteredRecipes(mainSearchField);
      
      // console.log('AFTER Add Tag', filteredRecipes);
      renderCard(filteredRecipes);
      renderDropdowns(filteredRecipes);
      removeDropdownItem(itemType, itemValue);
    });
  }
}
/**
 * @description when close__tag is clicked, remove the tag from the list, and update the filteredRecipes
 */
export function removeSearchTag() {
  const mainSearchField = document.getElementById('mainField');
  const tagCloseButtonList = document.querySelectorAll('.tag-list__item span');
  for (const item of tagCloseButtonList) {
    item.addEventListener('click', () => {
      const li = item.parentNode;
      const itemType = item.parentNode.dataset.type;
      const itemValue = item.parentNode.dataset.value;
      
      li.remove();
      if (itemType!='appliance') {
        tagList[itemType].delete(itemValue);
      } else {
        // if itemType is appliance (=string), override with empty string.
        tagList.appliance ='';
      }
      filteredRecipes = updateFilteredRecipes(mainSearchField);
      renderCard(filteredRecipes);
      renderDropdowns(filteredRecipes);
    });
  }
}

/**
 * @description
 */
export function tagsEventHandler(recipesArray) {
  renderCard(recipesArray);
}