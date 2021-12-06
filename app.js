import './src/scss/style.scss';
import './public/data/Recipes.json';
import { renderDOMTree } from './src/js/views/layout';
import { renderDropdowns, showDropdownEventHandlers } from './src/js/views/tags';

import recipesFullList from './src/js/controllers/data';
import { searchEventHandler } from './src/js/controllers/search';
import { tagsEventHandler } from './src/js/controllers/tags';
import { renderCard } from './src/js/views/recipesCards';

const initApp = (recipesFullList) => {
  renderDOMTree();
  renderDropdowns(recipesFullList);
  showDropdownEventHandlers(recipesFullList);
  renderCard(recipesFullList);
}

document.addEventListener('DOMContentLoaded', initApp(recipesFullList));

searchEventHandler(recipesFullList);
tagsEventHandler(recipesFullList);
//render(updateFilteredRecipes(recipesArray, searchField));
//render avec la current list ?
// renderDropdowns(recipesFullList);
// renderCard(recipesFullList);
// renderFilteredRecipes(filteredRecipes)

// showDropdownEventHandlers();

// filterRecipes(recipesFullList);