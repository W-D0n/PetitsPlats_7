/**
 * @description click et push eventlistener
 */
export let itemSearchObject = {
  'ingredients': new Set(),
  'appliance': '',
  'ustensils': new Set()
};

function x () {
  // event pour chaque li
}

/**
 * @description NEED REWORK au click populate les array
 */
const addTag = () => {
  const items = [...document.querySelectorAll('.dropdown-item')];

  for (const item of items) {
    item.addEventListener('click', () => {
      const itemType = item.dataset.type;
      const itemValue = item.dataset.value;
      
      if (itemType!='appliance') {
        itemSearchObject[itemType].add(itemValue);
        console.log(itemSearchObject);
      } else {
        itemSearchObject[itemType] = itemValue;
        console.log(itemSearchObject);
      }
      // TODO update le dom
    });
  }
}

// fct (en param model de data) { filter en fonction des tags des tableau} 
