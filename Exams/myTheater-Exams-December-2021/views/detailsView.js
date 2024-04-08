import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (movie, hasUser, isOwner, hasLiked, totalLikes) => html`
<section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${movie.title}</h1>
                    <div>
                        <img src="../.${movie.imageUrl}"/>
                    </div>
                </div>
                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${movie.description}</p>
                    <h4>Date: ${movie.date}</h4>
                    <h4>Author: ${movie.author}</h4>
                    <p class="likes">Likes: ${totalLikes}</p>
                    ${hasUser
        ? html`<div class="buttons">
                            ${isOwner
                ? getButtons(movie._id)
                : (!hasLiked
                    ? html`<a class="btn-like" href="javascript:void(0)" @click=${onLike} >Like</a>`
                    : null)}
                </div>`
        : null}
            </div>
        </section>
`;

function getButtons(id) {
    return html`
    <a class="btn-delete" href="/delete/${id}">Delete</a>
    <a class="btn-edit" href="/edit/${id}">Edit</a>
    `;
}


let context = null;
let theaterId = null;
let movie = null;
let userId = null;
let hasUser = null;
let isOwner = null;

export async function showDetailsView(ctx) {
    context = ctx;
    theaterId = context.params.id;
    movie = await dataService.movieDetails(theaterId);
    const user = userHelper.getUserData();
    userId = user._id;
    hasUser = !!user;
    isOwner = userHelper.isOwner(movie._ownerId);
    const totalLikes = await dataService.totalLikes(theaterId);
    const hasLiked = await dataService.hasLiked(theaterId, userId);
    context.render(detailsTemplate(movie, hasUser, isOwner, hasLiked, totalLikes));
}

async function onLike(event) {
    await dataService.likeAMovie({ theaterId });
    const totalLikes = await dataService.totalLikes(theaterId);
    const hasLiked = await dataService.hasLiked(theaterId, userId);
    context.render(detailsTemplate(movie, hasUser, isOwner, hasLiked, totalLikes));
}