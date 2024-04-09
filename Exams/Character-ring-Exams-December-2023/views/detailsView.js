import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { userHelper } from "../util/userHelper.js";

const characterTemplate = (character, ownerId) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src='./..${character.imageUrl}' alt="example1" />
            <div>
            <p id="details-category">${character.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${character.description}
                  </p>
                   <p id ="more-info">
                    ${character.moreInfo}</p>
              </div>
            </div>
              <h3>Is This Useful:<span id="likes">0</span></h3>
              ${userHelper.isOwner(ownerId) ? getButtons(character._id) : ""}
             <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="" id="like-btn">Like</a>

          </div>
            </div>
        </div>
      </section>
`;

function getButtons(id) {

    return html`
    <div id="action-buttons">
            <a href='/edit/${id}' id="edit-btn">Edit</a>
            <a href='/delete/${id}' id="delete-btn">Delete</a>
            </div>
    `;
}

export async function showDetailsView(ctx) {

    const characterID = ctx.params.id;
    const character = await dataService.getCharacterDetails(characterID);
    const ownerId = character._ownerId;
    ctx.render(characterTemplate(character, ownerId));
}