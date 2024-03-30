import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const gamesTemplate = (games) => html`
<section id="catalog-page">
            <h1>All Games</h1>
            ${games && games.length > 0
        ? games.map(gameCardTemplate)
        : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
`;
const gameCardTemplate = (game) => html`
<div class="allGames">
                <div class="allGames-info">
                    <img src="${game.imageUrl}">
                    <h6>${game.category}</h6>
                    <h2>${game.title}</h2>
                    <a href="/details/${game._id}" class="details-button">Details</a>
                </div>
                </div>
`;

export async function showCatalogueView(ctx) {
    const gameId = ctx.params.id;
    const games = await dataService.getAllGames(gameId);
    ctx.render(gamesTemplate(games));
}