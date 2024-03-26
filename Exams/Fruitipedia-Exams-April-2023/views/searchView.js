import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const searchTemplate = (data) => html`
<section id="search">
<div class="form">
  <h2>Search</h2>
  <form @submit=${onSearch} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
  </div>
  <h4>Results:</h4>
  <div class="search-result">
    ${data ? data.length > 0
        ? html`${data.map(searchResultTemplate)}`
        : html`<p class="no-result">No result.</p>`
        : ""
    }
  </div>
`;
const searchResultTemplate = (fruit) => html`
  
 
  <!--If there are matches display a div with information about every fruit-->
 <div class="fruit">
  <img src="../.${fruit.imageUrl}" alt="example1" />
  <h3 class="title">${fruit.name}</h3>
  <p class="description">${fruit.description}</p>
  <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>
</section>
`;


let context = null;

export function showSearchView(ctx) {
    context = ctx;
    context.render(searchTemplate(undefined));
}

async function onSearch(event) {

    event.preventDefault();
    const query = document.getElementById('search-input').value;
    if (!query) {
        return alert("Please type in a search parameter!");
    }
    const results = await dataService.getFruitsByName(query);
    context.render(searchTemplate(results));
}