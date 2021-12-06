import { updateFilteredRecipes } from './filters';
import { createDropdownItems } from '../views/tags';
import { renderCard } from '../views/recipesCards';
import { addSelectedTag, removeSelectedTag } from '../views/layout';

/**
 * @description click et push eventlistener
 */
export let tagList = {
  'ingredients': new Set(),
  'appliance': '',
  'ustensils': new Set()
};

/**
 * @description click et push eventlistener
 */
function addSearchTag() {
  const tags = [...document.querySelectorAll('.dropdown-item')];

  for (const item of tags) {
    item.addEventListener('click', () => {     
      const itemType = item.dataset.type;
      console.log('itemType : ', itemType);
      const itemValue = item.dataset.value;
      console.log('itemValue : ', itemValue);

      if (itemType!='appliance') {
        tagList[itemType].add(itemValue);
        console.log(tagList);
      } else {
        tagList[itemType] = itemValue;
        console.log(tagList);
      }
      const currentFilteredRecipes = updateFilteredRecipes();
      
      console.log(currentFilteredRecipes);
      renderCard(currentFilteredRecipes);
      createDropdownItems(currentFilteredRecipes);
      addSelectedTag(itemType, itemValue);
    });
  }
  // au click sur un tag lancer la recherche de recipes grace à tagList
  
  // update du dom
  // ajout d'un tag cliquable dans la tag-list__section
}

function removeSearchTag(obj) {
  // prendre les tags des dropdown ET les tags de la tag-list__section
  const tags = [...document.querySelectorAll('.dropdown-item')];
  for (const item of tags) {
    item.addEventListener('click', () => {

    });
  }
  // à tester element.quantity ? undefined : li.remove();
  // au click sur un tag = remove de l'object tagList si présent
  // if (tagList.contains(item))

  // relancer la recherche de recipes

  // update du dom
}
/**
 * @description
 */
export function tagsEventHandler(recipesArray) {
  addSearchTag();
  renderCard(recipesArray);
}