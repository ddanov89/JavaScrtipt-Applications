import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { notification } from "./notifications.js";

const editTemplate = (theater) => html`
<section id="editPage">
            <form @submit=${onEdit} class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value="${theater.title}">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${theater.date}">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        value="${theater.author}">
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">${theater.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        value="${theater.imageUrl}">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;

let context = null;
let theaterId = null;

export async function showEditView(ctx) {
    context = ctx;
    theaterId = context.params.id;
    const theater = await dataService.movieDetails(theaterId);
    context.render(editTemplate(theater));
}

async function onEdit(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { title, date, author, description, imageUrl } = Object.fromEntries(formData);

    if (!title || !date || !author || !imageUrl || !description) {
        return notification("All fields are required!");
    }
    await dataService.updateAMovie(theaterId, { title, date, author, description, imageUrl });
    context.goTo(`/details/${theaterId}`);
}