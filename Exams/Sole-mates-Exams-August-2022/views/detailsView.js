import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (shoes, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="../.${shoes.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoes.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoes.release}</span></p>
              <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
              <p>Value: <span id="details-value">${shoes.value}</span></p>
            </div>
            ${isOwner ? getButton(shoes._id) : ''}
          </div>
        </section>
`;

function getButton(id) {
    return html`
    <div id="action-buttons">
              <a href="/edit/${id}" id="edit-btn">Edit</a>
              <a href="/delete/${id}" id="delete-btn">Delete</a>
            </div>
            `;
}

export async function showDetailsView(ctx) {
    const id = ctx.params.id;
    const shoes = await dataService.productDetails(id);
    const isOwner = userHelper.isOwner(shoes._ownerId);
    ctx.render(detailsTemplate(shoes, isOwner));
}