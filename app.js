import './src/scss/style.scss';
import './public/data/Recipes.json';
import recipesFullList from './src/controllers/data';
import { renderDropdowns } from './src/views/tags';
import { test } from './src/controllers/tags';

// document.addEventListener('DOMContentLoaded', renderDropdowns(recipesFullList));
renderDropdowns(recipesFullList);
test();

// appel de fct controllers tags (en param data)