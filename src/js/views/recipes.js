// ici on affiche les cards correspondant à la liste des recettes triées.card__container{}
const createRecipeCard = ({id, name, ingredients, photo, time, description}) => {
  // const name ='';
  // const ingredients = [];
  // à inclure ds une loop ? const { ingredient, quantity, unit } = ingredients;
  return `
  <div class="card__container" data-id="${id}">
    <img src="https://via.placeholder.com/350x150" alt="${photo}" class="card__thumb">
    <div class="card__content">
      <div class="card__head">
        <h2 class="recipe__name">${name} ${id}</h2>
        <div class="time">
          <span class="clock"></span>
          <p class="duration">${time} min</p>
        </div>
      </div>
      <div class="card__info">
        <div class="card__details">       
          <ul class="ingredients__details">
          </ul>
        </div>
        <div class="card__desc">
          <p class="description">${description}</p>
        </div>
      </div>
    </div>
  </div>
  `;
}
// ici je récupère le tableau avec les noms des ingrédients, leur quantité et leur unité
function populateIngredients(ingredients) {
  const ul = document.querySelector('.ingredients__details');
  // const ingredients = ;
  for (let index = 0; index < ingredients.length; index++) {
    // const element = ingredients[index];
    // const li = document.createElement('li');
    // li.setAttribute('class', 'ingredient-name');
    // ul.appendChild(li);
    // li.textContent = `
    //   <span class="quant">${element.quantity} ${element.unit}</span>
    // `;
  }
}

function addCards(array) {
  const parent =document.getElementById('result__section');
  parent.innerHTML = '';
  array.forEach(element => {
    parent.insertAdjacentHTML('beforeend', createRecipeCard(element));
    populateIngredients(element.ingredients);
  });
}

export function renderCard(filteredRecipes){
  addCards(filteredRecipes);
}