import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const fruitsTemplate = (fruits) => html`
<h2>Fruits</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${fruits.length > 0
        ? fruits.map(fruitCardTemplate)
        : html`
         <!-- Display an h2 if there are no posts -->
         <h2>No fruit info yet.</h2>`
    }
        </section>
`;

const fruitCardTemplate = (fruit) => html`
<div class="fruit">
            <img src="../.${fruit.imageUrl}" alt="example1" />
            <h3 class="title">${fruit.name}</h3>
            <p class="description">${fruit.description}</p>
            <a class="details-btn" href="/details/${fruit._id}">More Info</a>
          </div>
`;

export async function showDashboardView(ctx) {
    const fruits = await dataService.getAllFruits();
    ctx.render(fruitsTemplate(fruits));
}