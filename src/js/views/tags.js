import { addSearchTag, removeSearchTag } from '../controllers/tags';

let ingredientList = [];
let applianceList = [];
let ustensilList = [];

/**
 * @description Setting all dropdown items for each category
 * @param {*} data current list of recipes
 * @returns {Objects} Fill each array with updated informations
 */
function setTagLists(data) {
  ingredientList = [];
  applianceList = [];
  ustensilList = [];
  for (let i in data) {
    const recipe = data[i];
    recipe.ingredients.forEach(el => {
      if (!ingredientList.includes(el.ingredient)) {
        ingredientList.push(el.ingredient);
      }
    })
    recipe.ustensils.forEach(ustensil => {
      if (!ustensilList.includes(ustensil)) {
        ustensilList.push(ustensil);
      }
    })
    if (!applianceList.includes(recipe.appliance)) {
      applianceList.push(recipe.appliance);
    }
  }
  return {
    ingredientList,
    applianceList,
    ustensilList
  };
}

/**
 * @description update all dropdown items information
 * @param {Object} data current list of recipes
 */
export function createDropdownItems(data) {
  const { ingredientList, applianceList, ustensilList } = setTagLists(data);
  populateDropdowns(ingredientList, 'ingredients');
  populateDropdowns(applianceList, 'appliance');
  populateDropdowns(ustensilList, 'ustensils');
  addSearchTag();
  removeSearchTag();
}
/**
 * @description function that inject items inside dropdown menu. reset for updating list
 * @param {Object} arr array of tags
 * @param {String} category type of dropdown menu
 */
function populateDropdowns(array, category) {
  const ul = document.getElementById(`${category}List`);
  ul.innerHTML = '';
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const li = document.createElement('li');
    li.setAttribute('class', 'dropdown-item');
    li.setAttribute('data-value', `${element}`);
    li.setAttribute('data-type', `${category}`);
    li.textContent = element;
    ul.appendChild(li);
  }
}
/**
 * @description Show/Hide taglist of each dropdown menu
 */
function showDropdownTagLists() {
  const dpArray = Array.from(document.querySelectorAll('.dropdown__container'));
  const ingList = document.getElementById('ingredientsList');
  const appList = document.getElementById('applianceList');
  const ustList = document.getElementById('ustensilsList');

  for (const element of dpArray) {
    element.addEventListener('mouseover', () => {
      if (element.contains(document.querySelector('.ingredients'))) {
        ingList.classList.add("show");
      }
      if (element.contains(document.querySelector('.appliance'))) {
        appList.classList.add("show");
      }
      if (element.contains(document.querySelector('.ustensils'))) {
        ustList.classList.add("show");
      }
    });
    element.addEventListener('mouseout', () => {
      if (element.contains(document.querySelector('.ingredients'))) {
        ingList.classList.remove("show");
      }
      if (element.contains(document.querySelector('.appliance'))) {
        appList.classList.remove("show");
      }
      if (element.contains(document.querySelector('.ustensils'))) {
        ustList.classList.remove("show");
      }
    });
  }
}

/**
 * @description remove selected tag from dropdown
 * @param {Object} data current list of recipes
 */
export function removeDropdownItem(type, value) {
  const li = document.querySelector(`#${type}List > li[data-value="${value}"]`);
  li.style.display = 'none';
}

/**
 * @description calling render function
 * @param {Object} data current list of recipes
 */
export function renderDropdowns(data) {
  createDropdownItems(data);
}

/**
 * @description event handlers
 */
export function showDropdownEventHandlers() {
  showDropdownTagLists();
}