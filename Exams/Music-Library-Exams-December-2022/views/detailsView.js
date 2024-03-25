import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";


const detailsTemplate = (album, hasUser, hasLiked, ownerId, totalLikes) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
        <img src="../.${album.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
            <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>

        ${hasUser ? html`<div id="action-buttons">
            ${userHelper.isOwner(ownerId)
            ? getButtons(album._id)
            : (hasLiked == 0
                ? html` <a href="javascript:void(0)" @click=${onLike} id="like-btn">Like</a>`
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
let albumId = null;
let album = null;
let hasUser = null;
let ownerId = null;
let hasLiked = null;
let userId = null;

export async function showDetailsView(ctx) {

    context = ctx;
    albumId = ctx.params.id;
    album = await dataService.getAlbumDetails(albumId);
    ownerId = album._ownerId;
    const user = userHelper.getUserData();
    userId = user?._id;
    hasUser = !!user;
    hasLiked = await dataService.hasLiked(albumId, userId);
    const totalLikes = await dataService.getTotalLikes(albumId);
    context.render(detailsTemplate(album, hasUser, hasLiked, ownerId, totalLikes));

}

async function onLike(event) {
    await dataService.likeAnALbum({albumId});
    hasLiked = await dataService.hasLiked(albumId, userId);
    const totalLikes = await dataService.getTotalLikes(albumId);
    
    context.render(detailsTemplate(album, hasUser, hasLiked, ownerId, totalLikes));
}