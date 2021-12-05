import { updateFilteredRecipes } from './filters';
import { createDropdownItems } from '../views/tags';
import { renderCard } from '../views/recipes';

/**
 * @description click et push eventlistener
 */
export let tagsSearchObject = {
  'ingredients': new Set(),
  'appliance': '',
  'ustensils': new Set()
};

function addTagToSearch() {
  const tags = [...document.querySelectorAll('.dropdown-item')];

  for (const item of tags) {
    item.addEventListener('click', () => {      
      const itemType = item.dataset.type;
      const itemValue = item.dataset.value;
      if (itemType!='appliance') {
        tagsSearchObject[itemType].add(itemValue);
        console.log(tagsSearchObject);
      } else {
        tagsSearchObject[itemType] = itemValue;
        console.log(tagsSearchObject);
      }
      const currentFilteredRecipes = updateFilteredRecipes();
      console.log(currentFilteredRecipes);
      renderCard(currentFilteredRecipes);
      createDropdownItems(currentFilteredRecipes);
    });
  }
  // au click sur un tag lancer la recherche de recipes
  // update du dom
  // ajout d'un tag cliquable dans la tag-list__section
}

function removeTagToSearch(obj) {
  // prendre les tags des dropdown ET les tags de la tag-list__section
  const tags = [...document.querySelectorAll('.dropdown-item')];
  for (const item of tags) {
    item.addEventListener('click', () => {

    });
  }
  // au click sur un tag = remove de l'object tagsSearchObject si présent
  // if (tagsSearchObject.contains(item))

  // relancer la recherche de recipes

  // update du dom
}
/**
 * @description NEED REWORK au click populate les array
 */
export function tagsEventHandler(recipesArray) {
  addTagToSearch(recipesArray);
  renderCard(recipesArray);
}

// fct (en param model de data) { filter en fonction des tags des tableau} 


//recherche par tag clické
