import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (game) => html`
<section id="edit-page" class="auth">
            <form @submit=${onEdit} id="edit">
                <div class="container">
                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value="${game.title}">
                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value="${game.category}">
                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}">
                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}">
                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary">${game.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">
                </div>
            </form>
        </section>
`;
let context = null;
let gameId = null;

export async function showEditVIew(ctx) {
    context = ctx;
    gameId = ctx.params.id;
    const game = await dataService.gameDetails(gameId);
    context.render(editTemplate(game));
}

async function onEdit(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const { title, category, maxLevel, imageUrl, summary } = Object.fromEntries(formData);
    debugger
    if (!title || !category || !maxLevel || !imageUrl || !summary) {
        return alert("All fields are required!");
    }

    await dataService.updateAGame(gameId, { title, category, maxLevel, imageUrl, summary });
    context.goTo(`/details/${gameId}`);
}