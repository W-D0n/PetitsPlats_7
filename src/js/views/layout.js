
let logoPath = '/public/icons/logo.png';
let zones = ['footer', 'main', 'header'];
let sections = ['result__section', 'dropdown__section', 'tagList__section', 'searchArea'];
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
  <div class="homepage__link" href="#" role="logo" aria-label="link to homepage">
    <img class="logo" src="${img}" alt="" />
  </div> 
  `;
}
/**
 * @description Create section
 * @param {*} sectionName 
 * @returns {string} HTML string
 */
const createSection = (sectionName) => {
  return `
  <section id="${sectionName}"></section>
  `;
}

/**
 * @description Create principal search field
 * @returns {string} HTML string
 */
const createSearchField = () => {
  return `
  <form id="searchBar" class="searchBar" role="search">
    <label class="offscreen" for="inputSearch"></label>
    <input type="search" spellcheck="true" class="inputSearch" autocomplete="off" role="searchbox" placeholder="Rechercher un ingrédient, un appareil, un ustensile, une recette…">
    <div id="clear" class="none button clear" role="button" tabindex="0" aria-label="Clear search terms">
      <i class="fas fa-times"></i>
    </div>
    <button id="searchButton" class="button searchButton" type="submit" aria-label="Submit button">
      <span class="bi bi-search"></span>
    </button>
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
      <input type="text" id="dropdownSearchField" autocomplete="false" placeholder="Type to filter...">
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
    // parent[0].insertAdjacentHTML('afterbegin', element);
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
function addNavbar() {
  const parent = document.getElementById('dropdown__section');
  parent.insertAdjacentHTML('beforeend', createNavbar());
}
function addDropdowns(array) {
  const parent = document.querySelector('.navbar');
  array.forEach((el) => {
    parent.insertAdjacentHTML('beforeend', createDropdown(el));
  });
  
}


/**
 * @description inject layout
 */
export function renderDOMTree() {
  addHTMLStructure(createZone, zones, document.getElementsByTagName('body'));
  addHTMLStructure(createSection, sections, document.getElementsByTagName('main'));
  addLogoDOM(logoPath);
  addSearchField();
  addNavbar();
  addDropdowns(category);
}