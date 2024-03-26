import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (fruit, ownerId) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="../.${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${fruit.nutrition}</p>
              </div>
               <!--Edit and Delete are only for creator-->
               ${userHelper.isOWner(ownerId) ? getButtons(fruit._id) : ""}
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
    const fruit = await dataService.fruitDetails(id);
    const ownerId = fruit._ownerId;
    ctx.render(detailsTemplate(fruit, ownerId));
}