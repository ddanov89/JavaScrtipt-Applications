import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (offer, hasUser, hasApplied, isOWner, totalApplications) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${offer.imageUrl}" alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${totalApplications}</strong></p>
            ${hasUser
        ? html`<div id="action-buttons">
                ${isOWner
                ? getButtons(offer._id)
                : (!hasApplied
                    ? html`<a href=javascript:void(0) @click=${onApply} id="apply-btn">Apply</a>`
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
let offerId = null;
let offer = null;
let userId = null;
let hasUser = null;
let isOWner = null;

export async function showDetailsView(ctx) {

    context = ctx;
    offerId = ctx.params.id;

    offer = await dataService.offerDetails(offerId);
    const user = userHelper.getUserData();
    userId = user?._id;
    hasUser = !!user;
    isOWner = userHelper.isOWner(offer._ownerId);
    const totalApplications = await dataService.getTotalApplications(offerId);
    const hasApplied = await dataService.hasApplied(offerId, userId);
    context.render(detailsTemplate(offer, hasUser, hasApplied, isOWner, totalApplications));
}

async function onApply(event) {
    const hasApplied = await dataService.hasApplied(offerId, userId);
    const totalApplications = await dataService.getTotalApplications(offerId);
    context.render(detailsTemplate(offer, hasUser, hasApplied, isOWner, totalApplications));
}