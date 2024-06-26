import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const albumsTemplate = (albums, hasUser) => html`
<section id="catalogPage">
            <h1>All Albums</h1>
            ${albums && albums.length > 0
        ? albums.map(album => albumCardTemplate(album, hasUser))
        : html` <p>No Albums in Catalog!</p>`}
        </section>
`;

const albumCardTemplate = (album, hasUser) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
            <div class="btn-group">
            ${hasUser
        ? html`<a href="/details/${album._id}" id="details">Details</a>`
        : null}
        </div>
    </div>
</div>
`;

export async function showCatalogView(ctx) {
    const albums = await dataService.getAllAlbums();
    const user = userHelper.getUserData();
    const hasUser = !!user;
    ctx.render(albumsTemplate(albums, hasUser));
}
