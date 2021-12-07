import { updateFilteredRecipes } from './filters';
import { renderDropdowns } from '../views/tags';
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
 * @description 
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
        console.log(tagList);
      } else {
        tagList[itemType] = itemValue;
        console.log(tagList);
      }
      addSelectedTag(itemType, itemValue);
      filteredRecipes = updateFilteredRecipes(mainSearchField);
      
      console.log('AFTER Add Tag', filteredRecipes);
      renderCard(filteredRecipes);
      renderDropdowns(filteredRecipes);
    });
  }
}

function removeSearchTag() {
  const mainSearchField = document.getElementById('mainField');
  const selectedTagList = document.querySelectorAll('.tag-list');
  for (const item of selectedTagList) {
    item.addEventListener('click', (e) => {
      // console.log(e.target);
      item.remove(e.target);
      const itemType = e.target.dataset.type;
      const itemValue = e.target.dataset.value;
      console.log('itemType', itemType);
      console.log('itemValue', itemValue);

      if (itemType!='appliance') {
        tagList[itemType].delete(itemValue);
        console.log('tagList', tagList);
      } else {
        tagList[itemType].delete(itemValue);
        console.log('tagList', tagList);
      }
      filteredRecipes = updateFilteredRecipes(mainSearchField);
      console.log('AFTER Remove Tag', filteredRecipes);
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
  // removeSearchTag();
}