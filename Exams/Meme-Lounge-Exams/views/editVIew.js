import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { notification } from "./notifications.js";

const editTemplate = (meme) => html`
<section id="edit-meme">
            <form @submit=${onEdit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`;

let context = null;
let memeId = null;

export async function showEditView(ctx) {
    context = ctx;
    memeId = context.params.id;
    const meme = await dataService.memeDetails(memeId);
    context.render(editTemplate(meme));
}

async function onEdit(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { title, description, imageUrl } = Object.fromEntries(formData);
    if (!title || !description || !imageUrl) {
        return notification("All fields are required!");
    }
    await dataService.updateMeme(memeId, { title, description, imageUrl });
    context.goTo(`/details/${memeId}`);
}