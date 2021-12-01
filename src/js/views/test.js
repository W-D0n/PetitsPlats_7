var data = [
  // Data here
];

// loop through the data
data.forEach((datarecord, idx) => {
  // for each record we call out to a function to create the template
  let markup = createSeries(datarecord, idx);
  // We make a div to contain the resultant string
  let container = document.createElement("div");
  // container.classList.add("as-Series");
  // We make the contents of the container be the result of the function
  container.innerHTML = markup;
  // Append the created markup to the DOM
  document.body.appendChild(container);
});

function createSeries(datarecord, idx) {
  return `
    <div class="a-Series_Title">${datarecord.Title}</div>
  `;
}



/**
 * @description model
 */
 function createDOM() {
  return `

  `;
}