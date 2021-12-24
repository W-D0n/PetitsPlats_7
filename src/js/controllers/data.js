const urlAPI = '/public/data/Recipes.json';

/**
 * Request data from API, test response and return data.
 * @param {Object} uri 
 * @returns {Object} recipesFullList
 */
async function getAllRecipes() {
  let req = new Request(urlAPI, {
    method: 'GET',
    mode: 'cors',
  });

  try {
    const response = await fetch(req);
    const jsonRecipesData = await response.json();

    return jsonRecipesData.recipes;
  } catch (error) {
    console.error(error.status)
  }
}

const recipesFullList = await getAllRecipes();
export default recipesFullList;