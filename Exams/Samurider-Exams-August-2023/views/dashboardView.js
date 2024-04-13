import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const dashboardTemplate = (items) => html`
<h2>Available Motorcycles</h2>
        <section id="dashboard">
          ${items && items.length > 0
        ? items.map(motorcycleCardTemplate)
        : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`
    }
        </section>
`;

const motorcycleCardTemplate = (item) => html`
 </div><div class="motorcycle">
            <img src="${item.imageUrl}" alt="example1" />
            <h3 class="model">${item.model}</h3>
            <p class="year">Year: ${item.year}</p>
            <p class="mileage">Mileage: ${item.mileage} km.</p>
            <p class="contact">Contact Number: ${item.contact}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
          </div>
`;

export async function showDashboardView(ctx) {
    const items = await dataService.getAllMotorcycles();
    ctx.render(dashboardTemplate(items));
}