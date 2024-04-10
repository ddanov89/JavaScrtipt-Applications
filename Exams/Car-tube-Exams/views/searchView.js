import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const searchTemplate = (foundListing) => html`
<section id="search-cars">
            <h1>Filter by year</h1>
            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>
            <h2>Results:</h2>
            <div class="listings">
                ${foundListing.length > 0
        ? html`
        ${foundListing.map(car => listingCard(car))}`
        : html`<p class="no-cars"> No results.</p>`}
            </div>
        </section>
`;

const listingCard = (car) => html`
<div class="listing">
                    <div class="preview">
                        <img src=${car.image}>
                    </div>
                    <h2>${car.brand} ${car.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${car.price}</h3>
                            <h3>Price: ${car.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${car._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>
`;

let context = null;

export async function showSearchView(ctx) {
    context = ctx;
    context.render(searchTemplate([]));
}

async function onSearch(event) {

    event.preventDefault();

    const searchParameter = document.getElementById('search-input').value;
    if (searchParameter == "") {
        return alert('Field is required!');
    }

    let foundListing = await dataService.getCarsByYear(searchParameter);

    context.render(searchTemplate(foundListing));
}