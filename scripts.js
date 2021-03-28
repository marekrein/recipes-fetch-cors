const endPoint = "http://www.recipepuppy.com/api";
const proxyPoint = "https://cors.bridged.cc";
const form = document.querySelector("form.search");
const recipesGrid = document.querySelector(".recipes");

async function fetchRecipes(query) {
  const res = await fetch(`${proxyPoint}/${endPoint}?q=${query}`);
  const data = await res.json();
  console.log(data);
  return data;
}

async function handleSubmit(e) {
  e.preventDefault();
  const el = e.currentTarget;
  fetchAndDisplay(form.query.value);
}

async function fetchAndDisplay(query){
    form.submit.disabled = true;
    const recipes = await fetchRecipes(query);
    form.submit.disabled = false;
    displayRecipes(recipes.results);
    console.log(recipes.results);

}

function displayRecipes(recipes) {
  const html = recipes.map(
    (recipe) =>
      `<div class="recipe">
            <h2>${recipe.title}</h2>
            <p>${recipe.ingredients}</p>
                ${
                  recipe.thumbnail &&
                  `<img scr="${recipe.thumbnail}" alt="${recipe.title}"/>`
                }
                <a href="${recipe.href}">View recipe -></a>
        </div>`
  );
  recipesGrid.innerHTML = html.join("");
}

form.addEventListener("submit", handleSubmit);
fetchAndDisplay('pizza');
