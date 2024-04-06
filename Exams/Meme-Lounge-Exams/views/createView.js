import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { notification } from "./notifications.js";

const createTemplate = () => html`
<section id="create-meme">
            <form @submit=${onCreate} id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
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
    const { title, description, imageUrl } = Object.fromEntries(formData);
    if (!title || !description || !imageUrl) {
        return notification("All fields are required!");
    }
    await dataService.createAMeme({ title, description, imageUrl });
    context.goTo('/dashboard');
}