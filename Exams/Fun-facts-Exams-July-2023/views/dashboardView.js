import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";

const dashboardTemplate = (facts) => html`
<h2>Fun Facts</h2>
        <section id="dashboard">
        ${facts.length > 0
        ?
        facts.map(funFactTemplate)
        :
        html`
        <h2>No Fun Facts yet.</h2>`
        }  
        </section>
`;

const funFactTemplate = (fact) => html`
<div class="fact">
            <img src="./..${fact.imageUrl}" alt="example1" />
            <h3 class="category">${fact.category}</h3>
            <p class="description">${fact.description}</p>
            <a class="details-btn" href="/details/${fact._id}">More Info</a>
          </div>
`;

export async function showDashboardView(ctx) {
    const factsData = await dataService.getAllFunFacts();
    ctx.render(dashboardTemplate(factsData));
}