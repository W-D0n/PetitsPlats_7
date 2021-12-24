/**
 * @description Create the DOM element for a recipe (from filtered recipes)
 * @param {Object} recipe
 * @returns {string}
 */
const createDOM = ({ id, name, photo, time, description }) => {
  return `
  <div class="card__container" data-id="${id}">
    <img src="https://via.placeholder.com/350x150" alt="${photo}" class="card__thumb">
    <div class="card__content">
      <div class="card__head">
        <h2 class="recipe__name">${name}</h2>
        <div class="time">          
          <p class="duration"><span class="clock"></span> ${time} min</p>
        </div>
      </div>
      <div class="card__info">
        <div class="card__details">       
          <ul class="ingredients__details" id="ingredientList${id}"></ul>
        </div>
        <div class="card__desc">
          <p class="description">${description}</p>
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * @description
 * @param {Object} recipe
 */
function addIngredients({ id, ingredients }) {
  const ul = document.getElementById(`ingredientList${id}`);
  for (let index = 0; index < ingredients.length; index++) {
    const element = ingredients[index];
    ul.insertAdjacentHTML('beforeend', ingredientDOM(element));

    element.quantity == undefined ? element.quantity = "" : element.quantity;
    element.unit == undefined ? element.unit = "" : element.unit;
    element.unit == "grammes" ? element.unit = "g" : element.unit;
    element.unit == "cuillères à soupe" ? element.unit = "cs" : element.unit;
    element.unit == "Cuillères à soupe" ? element.unit = "cs" : element.unit;
    element.unit == "cuillères à café" ? element.unit = "cc" : element.unit;
  }
}

/**
 * @description create the DOM element for each ingredient
 * @param {Object} recipe
 */
const ingredientDOM = (element) => {
  return `
    <li>${element.ingredient}  <span>${element.quantity} ${element.unit}</span></li>
  `;
}

/**
 * @description adding card to the DOM element for each recipe
 * @param {Object} filteredrecipes
 */
function addCards(recipesArray) {
  const parent = document.getElementById('result__section');
  parent.innerHTML = '';
  for (let index = 0; index < recipesArray.length; index++) {
    const recipe = recipesArray[index];
    parent.insertAdjacentHTML('beforeend', createDOM(recipe));
    addIngredients(recipe);
  }
}
/**
 * @description calling the function to create/add cards to the DOM
 * @param {Object} filteredrecipe
 */
export function renderCard(filteredRecipes) {
  addCards(filteredRecipes);
}