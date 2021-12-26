import './src/scss/style.scss';
// import './public/data/Recipes.json';
import { renderDOMTree } from './src/js/views/layout';
import { renderDropdowns, showDropdownEventHandlers } from './src/js/views/tags';

import recipesFullList from './src/js/controllers/data';
import { searchEventHandler } from './src/js/controllers/search';
import { tagsEventHandler } from './src/js/controllers/tags';
import { renderCard } from './src/js/views/recipesCards';

/**
 * @description After the loading page, Initialize the page with first recipes and renders
 * @param {Object} recipesFullList 
 */
const initApp = (recipesFullList) => {
  renderDOMTree();
  renderDropdowns(recipesFullList);
  showDropdownEventHandlers(recipesFullList);
  renderCard(recipesFullList);
  // console.log('init', recipesFullList);
}

document.addEventListener('DOMContentLoaded', initApp(recipesFullList));

/**
 * @description Search event handlers
 */
searchEventHandler(recipesFullList);
tagsEventHandler(recipesFullList);