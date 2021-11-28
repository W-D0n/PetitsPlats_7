//click et push eventlistener
let itemSearchObject = {
  'ingredients': new Set(),
  'appliance': new Set(),
  'ustensils': new Set(),
};

function x () {
  // event pour chaque li
}


// A REWORK au click populare les array
const addTag = () => {

  const items = Array.from(document.querySelectorAll('.dropdown-item'));
  
  // spread operator spread+push chacun des éléments.
  // const items = [...document.querySelectorAll('.dropdown-item')];

  // const arr = document.querySelectorAll('.dropdown-item').value;

  for (const item of items) {
    item.addEventListener('click', () => {
      const itemType = item.dataset.type;
      const itemValue = item.dataset.value;
      // itemType est la clé dynamique qui correspond au type cliqué ${categroy}
      // ici on utilise l'API de Set().

      itemSearchObject[itemType].add(itemValue);
      console.log(itemSearchObject);
    });
  }
}

// fct (en param model de data) { filter en fonction des tags des tableau} 
