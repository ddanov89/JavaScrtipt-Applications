import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const recordsTemplate = (records) => html`
<h3 class="heading">Market</h3>
        <section id="dashboard">
          ${records && records.length > 0
        ? records.map(recordTemplate)
        : html`<h3 class="empty">No Items Yet</h3>`}
        </section>
        
`;

const recordTemplate = (record) => html`
<div class="item">
    <img src="../.${record.imageUrl}" alt="example1" />
    <h3 class="model">${record.item}</h3>
    <div class="item-info">
        <p class="price">Price: €${record.price}</p>
        <p class="availability">${record.availability}</p>
        <p class="type">Type: ${record.type}</p>
    </div>
    <a class="details-btn" href="/details/${record._id}">Uncover More</a>
</div>
`;

export async function showDashboardView(ctx) {
    const records = await dataService.getAllRecords();
    ctx.render(recordsTemplate(records));
}