import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsView = (fact, hasUser, hasLiked, isOwner, totalLikes) => html`
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="./..${fact.imageUrl}" alt="example1" />
    <p id="details-category">${fact.category}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p id="description">${fact.description}</p>
        <p id ="more-info">${fact.moreInfo}</p>
      </div>
      <h3>Likes:<span id="likes">${totalLikes}</span></h3>
      ${hasUser
    ? html`<div id="action-buttons">
          ${isOwner
        ? getButtons(fact._id)
        : (hasLiked == 0
          ? html`<a href="javascript:void(0)" @click=${onLike} id="like-btn">Like</a>`
          : null)}
            </div>`
    : null}
            </div>
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
let factId = null;
let fact = null;
let hasUser = null;
let hasLiked = null;
let userId = null;
let isOwner = null;

export async function showDetailsView(ctx) {
  context = ctx;
  factId = ctx.params.id;
  fact = await dataService.getFunFactDetails(factId);
  const user = userHelper.getUserData();
  userId = user?._id;
  hasUser = !!user;
  hasLiked = await dataService.hasLiked(factId, userId);
  const totalLikes = await dataService.getTotalLikesById(factId);
  isOwner = userHelper.isOwner(fact._ownerId);
  context.render(detailsView(fact, hasUser, hasLiked, isOwner, totalLikes));
}

async function onLike(event) {
  await dataService.likeAFact({ factId });
  hasLiked = await dataService.hasLiked(factId, userId);
  const totalLikes = await dataService.getTotalLikesById(factId);
  context.render(detailsView(fact, hasUser, hasLiked, isOwner, totalLikes));
}