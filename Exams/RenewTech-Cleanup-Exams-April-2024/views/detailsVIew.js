import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (solution, hasUser, isOwner, hasLiked, totalLikes) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="../.${solution.imageUrl}" alt="example1"/>
            <div>
              <p id="details-type">${solution.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">${solution.description}</p>
                  <p id="more-info">${solution.learnMore}</p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">${totalLikes}</span></h3>
              ${hasUser
    ? html`<div id="action-buttons">
              ${isOwner
        ? getButtons(solution._id)
        : (!hasLiked
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

let solution = null;
let context = null;
let solutionId = null;
let hasUser = null;
let isOwner = null;
let userId = null;
let hasLiked = null;

export async function showDetailsView(ctx) {
  context = ctx;
  solutionId = context.params.id;
  solution = await dataService.solutionDetails(solutionId);
  const user = userHelper.getUserData();
  userId = user?._id;
  hasUser = !!user;
  isOwner = userHelper.isOwner(solution._ownerId);
  const totalLikes = await dataService.getTotalLikes(solutionId);
  hasLiked = await dataService.hasLiked(solutionId, userId);
  context.render(detailsTemplate(solution, hasUser, isOwner, hasLiked, totalLikes));
}

async function onLike(event) {
  debugger
  await dataService.getALike({ solutionId });
  hasLiked = await dataService.hasLiked(solutionId, userId);
  const totalLikes = await dataService.getTotalLikes(solutionId);
  context.render(detailsTemplate(solution, hasUser, isOwner, hasLiked, totalLikes));
}