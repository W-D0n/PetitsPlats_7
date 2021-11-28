//domelement > data > fct
const navbar = document.createElement('nav');
navbar.setAttribute('class', 'navbar');

let ingredientList = [];
let applianceList = [];
let ustensilList = [];

/**
 * Setting all dropdown items from ingredients, ustensils and appliance on first pageload.
 */
export function setTagLists (data) {
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
 * DOM Creation of dropdown menu.
 * @param {String} category
 */
function createDropdown (category) {
  const parentHtml = document.getElementById('app');
  parentHtml.appendChild(navbar);
  const dropdownContainer = document.createElement('div');
  dropdownContainer.setAttribute('class', `dropdown__container ${category}`);
  navbar.appendChild(dropdownContainer);

  const inputfield = document.createElement('input');
  dropdownContainer.appendChild(inputfield);
  inputfield.setAttribute('type', 'text');
  inputfield.setAttribute('id', 'dropdownSearchField');
  inputfield.setAttribute('class', 'dropdown-search__field');
  inputfield.setAttribute('autocomplete', 'false');
  inputfield.setAttribute('placeholder', 'Type to filter...');

  const inputfieldBorder = document.createElement('span');
  dropdownContainer.appendChild(inputfieldBorder);
  inputfieldBorder.setAttribute('class', 'border');

  const list = document.createElement('ul');
  list.setAttribute('class', `dropdown__content ${category}`);
  list.setAttribute('id', `${category}List`);
  dropdownContainer.appendChild(list);
}

/**
 * DOM creation of dropdown menu, and set all dropdown items and show tags.
 */
export function createDropdownByCategories() {
  createDropdown ('ingredients');
  createDropdown ('appliance');
  createDropdown ('ustensils');
}

/**
 * DOM creation of items inside dropdown menu.
 * @param {*} arr array of tags
 */
function populateDropdowns (array, category) {
  console.log(array) 
  const ul = document.getElementById(`${category}List`);  
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    // console.log(element);
    const li = document.createElement('li');
    li.setAttribute('class', 'dropdown-item');
    li.setAttribute('data-value', `${element}`);
    li.setAttribute('data-type', `${category}`);
    li.textContent = element;
    ul.appendChild(li);
  }
}
export function createDropdownItems(data) {
  const { ingredientList, applianceList, ustensilList } = setTagLists(data);
  populateDropdowns(ingredientList, 'ingredients');
  populateDropdowns(applianceList, 'appliance');
  populateDropdowns(ustensilList, 'ustensils');
}

export function renderDropdowns(data) {
  createDropdownByCategories();
  createDropdownItems(data);
}