import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (record, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <div>
              <img id="details-img" src="${record.imageUrl}" alt="example1" />
              <p id="details-title">${record.item}</p>
            </div>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="details-price">Price: €${record.price}</p>
                <p class="details-availability">${record.availability}</p>
                <p class="type">Type: ${record.type}</p>
                <p id="item-description">${record.description}</p>
              </div>
              ${isOwner
        ? getButtons(record._id)
        : ""}
            </div>
          </div>
        </section>
`;

function getButtons(id) {
    return html`
    <div id="action-buttons">
        <a href="/edit/${id}" id="edit-btn">Edit</a>
        <a href="/delete/${id}" id="delete-btn">Delete</a>
    </div>
    `;
}

export async function showDetailsView(ctx) {
    const recordID = ctx.params.id;
    const record = await dataService.recordDetails(recordID);
    const isOwner = userHelper.isOwner(record._ownerId);
    ctx.render(detailsTemplate(record, isOwner));
}