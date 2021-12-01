import './src/scss/style.scss';
import './public/data/Recipes.json';
import { renderDOMTree } from './src/js/views/layout';
import { renderDropdowns, showEventHandlers } from './src/js/views/tags';

import { searchEventHandlers } from './src/js/controllers/search';
// import { filterRecipes, searchEventHandlers } from './src/js/controllers/search';
import recipesFullList from './src/js/controllers/data';

/**
 * @description Invok of DOM tree creation functions
 */
renderDOMTree();
renderDropdowns(recipesFullList);
showEventHandlers();
// filterRecipes(recipesFullList);
searchEventHandlers(recipesFullList);