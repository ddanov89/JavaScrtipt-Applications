import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const searchTemplate = (albums, hasUser) => html`
<section id="searchPage">
            <h1>Search by Name</h1>
            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                <!--If have matches-->
                ${albums
        ? albums.length > 0
            ? albums.map(album => albumTemplate(album, hasUser))
            : html`<p class="no-result">No result.</p>`
        : null}
            </div>
        </section>
`;

const albumTemplate = (album, hasUser) => html`
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

let context = null;
let hasUser = null;

export function showSearchView(ctx) {
    
    context = ctx;
    const user = userHelper.getUserData();
    hasUser = !!user;
    ctx.render(searchTemplate(undefined, hasUser));
}

async function onSearch(event) {
    const searchQuery = document.getElementById('search-input').value;
    const result = await dataService.getAlbumsByName(searchQuery);
    context.render(searchTemplate(result, hasUser));
}