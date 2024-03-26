import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (fruit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                .value=${fruit.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                .value=${fruit.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
              >${fruit.description}</textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
              >${fruit.nutrition}</textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

let context = null;
let id = null;

export async function showEditView(ctx) {

    context = ctx;
    id = ctx.params.id;
    const fruit = await dataService.fruitDetails(id);
    context.render(editTemplate(fruit));
}

async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { name, imageUrl, description, nutrition } = Object.fromEntries(formData);

    if (!name || !imageUrl || !description || !nutrition) {
        return alert('All fields are required!');
    }

    await dataService.updateFruit(id, { name, imageUrl, description, nutrition });

    context.goTo(`/details/${id}`);
}