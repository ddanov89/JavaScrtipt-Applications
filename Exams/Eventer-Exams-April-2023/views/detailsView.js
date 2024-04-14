import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (event, hasUser, isOwner, isGoing, totalGoing) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="../.${event.imageUrl}" alt="example1" />
            <p id="details-title">${event.name}</p>
            <p id="details-category">
              Category: <span id="categories">${event.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${event.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${event.description}</span>
              </div>
            </div>
            <h3>Going: <span id="go">${totalGoing}</span> times.</h3>
            ${hasUser
        ? html`<div id="action-buttons">
              ${isOwner
                ? getButtons(event._id)
                : (!isGoing
                    ? html`<a href="javascript:void(0)" @click=${onGoing} id="go-btn">Going</a>`
                    : null)}
            </div>`
        : null}
          </div>
        </section>
`;

function getButtons(id) {
    return html`
            <a href="/edit/${id}" id="edit-btn">Edit</a>
            <a href="/delete/${id}" id="delete-btn">Delete</a>
    `;
}

let context = null;
let event = null;
let hasUser = null;
let eventId = null;
let userId = null;
let isOwner = null;

export async function showDetailsView(ctx) {
    context = ctx;
    eventId = context.params.id;
    event = await dataService.eventDetails(eventId);
    const user = userHelper.getUserData();
    userId = user?._id;
    hasUser = !!user;
    const isGoing = await dataService.isGoing(eventId, userId);
    const totalGoing = await dataService.getTotalGoing(eventId);
    isOwner = userHelper.isOwner(event._ownerId);
    context.render(detailsTemplate(event, hasUser, isOwner, isGoing, totalGoing));
}

async function onGoing(e) {
    await dataService.postAGoing({eventId});
    const totalGoing = await dataService.getTotalGoing(eventId);
    const isGoing = await dataService.isGoing(eventId, userId);
    context.render(detailsTemplate(event, hasUser, isOwner, isGoing, totalGoing));
}