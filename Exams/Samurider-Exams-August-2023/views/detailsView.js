import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (item, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${item.year}</p>
                <p class="mileage">Mileage: ${item.mileage} km.</p>
                <p class="contact">Contact Number: ${item.contact}</p>
                   <p id = "motorcycle-description">${item.about}</p>
              </div>
               ${isOwner
        ? getButtons(item._id)
        : null
    }
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
    const id = ctx.params.id;
    const item = await dataService.itemDetails(id);
    const isOwner = userHelper.isOwner(item._ownerId);
    ctx.render(detailsTemplate(item, isOwner));
}