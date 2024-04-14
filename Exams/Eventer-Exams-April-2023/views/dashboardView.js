import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const dashboardTemplate = (events) => html`
<h2>Current Events</h2>
        <section id="dashboard">
          ${events.length > 0
        ? events.map(event => eventCardTemplate(event))
        : html`<h4>No Events yet.</h4>`}
        </section>
`;

const eventCardTemplate = (event) => html`
<div class="event">
            <img src="../.${event.imageUrl}" alt="example1" />
            <p class="title">${event.name}</p>
            <p class="date">${event.date}</p>
            <a class="details-btn" href="/details/${event._id}">Details</a>
          </div>
`;

export async function showDashboardView(ctx) {
    const events = await dataService.getAllEvents();
    ctx.render(dashboardTemplate(events));
}