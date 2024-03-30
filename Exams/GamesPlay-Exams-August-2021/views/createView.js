import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const createTemplate = () => html`
<section id="create-page" class="auth">
            <form @submit=${onCreate} id="create">
                <div class="container">

                    <h1>Create Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title...">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category...">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input class="btn submit" type="submit" value="Create Game">
                </div>
            </form>
        </section>
`;
let context = null;

export function showCreateView(ctx) {
    context = ctx;
    context.render(createTemplate());
}

async function onCreate(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { title, category, maxLevel, imageUrl, summary } = Object.fromEntries(formData);
    if (!title || !category || !maxLevel || !imageUrl || !summary) {
        return alert('All fields are required!');
    }
    await dataService.createAGame({ title, category, maxLevel, imageUrl, summary });
    context.goTo('/');
}