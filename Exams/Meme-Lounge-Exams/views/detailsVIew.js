import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (meme, isOWner) => html`
<section id="meme-details">
            <h1>Meme Title: ${meme.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${meme.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${meme.description}</p>
                    ${isOWner
        ? getButtons(meme._id)
        : ""}
                </div>
            </div>
        </section>
`;

function getButtons(id) {
    return html`
    <a class="button warning" href="/edit/${id}">Edit</a>
    <button class="button danger" @click=${onDelete}>Delete</button>
    `;
}

let context = null;

export async function showDetailsView(ctx) {
    context = ctx;
    const id = context.params.id;
    const meme = await dataService.memeDetails(id);
    const isOwner = userHelper.isOWner(meme._ownerId);
    context.render(detailsTemplate(meme, isOwner));
}

async function onDelete(event) {
    const id = context.params.id;
    const choice = confirm('Are you sure?');
    if (choice) {
        await dataService.deleteItem(id);
        context.goTo('/dashboard');
    }
}