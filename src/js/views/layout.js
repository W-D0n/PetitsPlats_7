let logoPath = '../../icons/logo.png';
let zones = ['footer', 'main', 'header'];
let sections = ['result__section', 'dropdown__section', 'tag-list__section', 'searchArea'];
let category = ['ingredients', 'appliance', 'ustensils'];

/**
 * @description Create the main structure of the page
 * @param {Object} array array of elements to add
 * @returns {string} HTML string
 */
const createZone = (element) => {
  return `
  <${element}></${element}>
  `;
}
/**
 * @description Create the logo of the page
 * @param {string} img image path
 * @returns {string} HTML string
 */
const createLogo = (img) => {
  return `
  <a class="homepage__link" href="../../../index.html" aria-label="link to homepage">
    <img class="logo" src="${img}" alt="" />
  </a> 
  `;
}
/**
 * @description Create section
 * @param {*} sectionName 
 * @returns {string} HTML string
 */
const createSection = (sectionName) => {
  return `
  <div id="${sectionName}"></div>
  `;
}
/**
 * @description Create principal search field
 * @returns {string} HTML string
 */
const createSearchField = () => {
  return `
  <form id="searchBar" class="searchBar">
    <label class="offscreen" for="mainField"></label>
    <input type="text" spellcheck="true" id="mainField" data-type="global" autocomplete="off" aria-label="search by name, ingredient or description" placeholder="Rechercher un ingrédient, un appareil, un ustensile, une recette…">
    <span class="bi bi-search"></span>
  </form>
  `;
}

/** 
 * @description create navbar
 * @returns {string} HTML string
 */
const createNavbar = () => {
  return `
    <nav class="navbar"></nav>
  `;
}
/**
 * @description create dropdown
 * @param {String} cat
 * @returns {string} HTML string
 */
const createDropdown = (cat) => {
  return `
    <div class="dropdown__container ${cat}">
      <input type="text" class="search__field dropdown" data-type="${cat}" autocomplete="off" placeholder="${cat}" aria-label="search by ${cat}">
      <span class="chevron"></span>
      <ul class="dropdown__content" id="${cat}List"></ul>
    </div>
  `;
}
/**
 * @description Generic function that create first structure of the page
 * @param {string} type name
 * @param {Object} array array of elements to add
 * @param {string} parent previous html node
 */
function addHTMLStructure(type, array, parent) {
  array.forEach((el) => {
    let element = type(el);
    parent[0].insertAdjacentHTML('afterbegin', element);
  });
}
function addLogoDOM(img) {
  const parent = document.getElementsByTagName('header');
  parent[0].insertAdjacentHTML('beforeend', createLogo(img));
}
function addSearchField() {
  const parent = document.getElementById('searchArea');
  parent.insertAdjacentHTML('beforeend', createSearchField());
}
/**
 * @description adding tag and dropdown navbars to the DOM
 */
function addNavbars() {
  const parent = document.getElementById('dropdown__section');
  parent.insertAdjacentHTML('beforeend', createNavbar());
  const section = document.getElementById('tag-list__section');
  const ul = document.createElement('ul');
  ul.classList.add('tag-list');
  section.appendChild(ul);
}
function addDropdowns(array) {
  const parent = document.querySelector('.navbar');
  array.forEach((el) => {
    parent.insertAdjacentHTML('beforeend', createDropdown(el));
  });

}

/**
 * @description
 * @param {*} type 
 * @returns {string} HTML string
 */
const createSelectedTag = (type, value) => {
  return `
  <li class="tag-list__item" data-type="${type}" data-value="${value}">${value}<span class="tag__close"></span></li>
  `;
}

export function addSelectedTag(type, value) {
  const parent = document.querySelector('.tag-list');
  // if tag isn't already in the list, add it
  if (!parent.querySelector(`[data-type="${type}"][data-value="${value}"]`)) {
    parent.insertAdjacentHTML('beforeend', createSelectedTag(type, value));
  }
  return;
}

// display error message when search field input don't match any result
export function displayError() {
  const parent = document.getElementById('result__section');
  const error = document.createElement('p');
  error.classList.add('error');
  error.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
  parent.insertAdjacentElement('beforeend', error);
}


/**
 * @description inject layout
 */
export function renderDOMTree() {
  addHTMLStructure(createZone, zones, document.getElementsByTagName('body'));
  addHTMLStructure(createSection, sections, document.getElementsByTagName('main'));
  addLogoDOM(logoPath);
  addSearchField();
  addNavbars();
  addDropdowns(category);
}