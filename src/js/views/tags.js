import {addSearchTag} from '../controllers/tags';

//domelement > data > fct
let ingredientList = [];
let applianceList = [];
let ustensilList = [];

/**
 * @description Setting all dropdown items for each category
 * @param {*} data array of tags
 * @returns {Objects} Fill each array
 */
function setTagLists (data) {
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
 * @description inject all dropdown items
 * @param {Object} data 
 */
export function createDropdownItems(data) {
  const { ingredientList, applianceList, ustensilList } = setTagLists(data);
  // console.log('ingredientList : ', ingredientList);
  // console.log('applianceList : ', applianceList);
  // console.log('ustensilList : ', ustensilList);
  populateDropdowns(ingredientList, 'ingredients');
  populateDropdowns(applianceList, 'appliance');
  populateDropdowns(ustensilList, 'ustensils');
  addSearchTag();
}

/**
 * @description function that inject items inside dropdown menu. reset for updating list
 * @param {Object} arr array of tags
 * @param {String} category type of dropdown menu
 */
function populateDropdowns (array, category) {
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
function showDropdownTagLists () {
  const dpArray = Array.from(document.querySelectorAll('.dropdown__container'));
  const ingList = document.getElementById('ingredientsList');
  const appList = document.getElementById('applianceList');
  const ustList = document.getElementById('ustensilsList');
  
  for (const element of dpArray) {
    element.addEventListener('click', (e) => {
      if(element.contains(document.querySelector('.ingredients'))) {
        ingList.classList.toggle("show");
      }
      if(element.contains(document.querySelector('.appliance'))) {
        appList.classList.toggle("show");
      }
      if(element.contains(document.querySelector('.ustensils'))) {
        ustList.classList.toggle("show");
      }
    });
  }  
  // NEED REWORK - on outside click, close all dropdowns
  const container = document.querySelector('#dropdown__section');
}
/**
 * @description render function
 * @param {Object} data 
 */
export function renderDropdowns(data) {
  createDropdownItems(data);
}

/**
 * @description event handlers
 * 
 */
export function showDropdownEventHandlers() {
  showDropdownTagLists();
}