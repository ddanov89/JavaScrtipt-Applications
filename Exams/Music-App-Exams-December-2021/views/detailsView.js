import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (album, isOwner) => html`
<section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${album.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">
                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>
                    ${isOwner
        ? getButtons(album._id)
        : ""}
                </div>
            </div>
        </section>
`;

function getButtons(id) {
    return html`
    <div class="actionBtn">
        <a href="/edit/${id}" class="edit">Edit</a>
        <a href="/delete/${id}" class="remove">Delete</a>
    </div>
    `;
}

export async function showDetailsView(ctx) {
    const albumId = ctx.params.id;
    const album = await dataService.albumDetails(albumId);
    const isOwner = userHelper.isOwner(album._ownerId);
    ctx.render(detailsTemplate(album, isOwner));
}