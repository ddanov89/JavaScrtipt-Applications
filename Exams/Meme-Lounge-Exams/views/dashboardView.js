import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const memesTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes && memes.length > 0
        ? memes.map(meme => memeCardTemplate(meme))
        : html` <p class="no-memes">No memes in database.</p>`}
	</div>
</section>
`;

const memeCardTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>
`;

let context = null;
let memeId = null;

export async function showDashboardView(ctx) {
    context = ctx;
    memeId = ctx.params.id;
    const memes = await dataService.getAllMemes(memeId);
    context.render(memesTemplate(memes));
}