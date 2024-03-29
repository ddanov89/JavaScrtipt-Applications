import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const searchTemplate = (products, hasUser) => html`
<section id="search">
          <h2>Search by Brand</h2>
          <form @submit=${onSearch} class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>
          <h3>Results:</h3>

          <div id="search-container">
            <ul class="card-wrapper">
              <!-- Display a li with information about every post (if any)-->
              ${products
        ? products.length > 0
            ? products.map(product => productCardTemplate(product, hasUser))
            : html`<h2>There are no results found.</h2>`
        : null}
            </ul>
          </div>
        </section>
`;

const productCardTemplate = (product, hasUser) => html`
<li class="card">
                <img src="../.${product.imageUrl}" />
                <p>
                  <strong>Brand: </strong><span class="brand">${product.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${product.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${product.value}</span>$</p>
                ${hasUser ? html`<a class="details-btn" href="/details/${product._id}">Details</a>` : ""}
              </li>
`;

let context = null;

export async function showSearchView(ctx) {

    context = ctx;
    context.render(searchTemplate(undefined, false));
}

async function onSearch(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const searchQuery = formData.get('search');

    if (!searchQuery) {
        return alert('Search parameter is required!');
    }
    const products = await dataService.getProductsByBrand(searchQuery);
    const user = userHelper.getUserData();
    const hasUser = !!user;
    context.render(searchTemplate(products, hasUser));
}