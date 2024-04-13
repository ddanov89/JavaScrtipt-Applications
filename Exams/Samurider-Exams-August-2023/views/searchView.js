import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { notify } from "../util/notification.js";


const searchTemplate = (foundItem) => html`
<section id="search">
    <div class="form">
  <h4>Search</h4>
  <form class="search-form">
    <input type="text" name="search" id="search-input"/>
    <button @click=${onSearch} class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
  <div class="search-result">
 
  <!--If there are matches display a div with information about every motorcycle-->
  ${foundItem.length > 0

        ? html`

        ${foundItem.map((item) => resultCardTemplate(item))}`

        : html`

        <h2 class="no-avaliable">No result.</h2>`
    }
  </div>
</section>
`;

const resultCardTemplate = (item) => html`
<div class="motorcycle">
  <img src="${item.imageUrl}" alt="example1" />
  <h3 class="model">${item.model}</h3>
    <a class="details-btn" href="/details/${item._id}">More Info</a>
</div>
`;

let context = null;

export function showSearchView(ctx) {
    context = ctx;
    context.render(searchTemplate([]));
}

async function onSearch(event) {

    event.preventDefault();
    const searchParameter = document.getElementById('search-input').value;
    if (searchParameter == '') {
        return notify('The field is required');
    }
    const searchQuery = await dataService.getItemByName(searchParameter);
    context.render(searchTemplate(searchQuery));
}
