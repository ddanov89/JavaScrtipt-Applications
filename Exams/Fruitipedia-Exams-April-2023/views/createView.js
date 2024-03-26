import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const createFruitTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form  @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
`;

let context = null;

export function showCreateView(ctx) {

    context = ctx;
    context.render(createFruitTemplate());

}

async function onCreate(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { name, imageUrl, description, nutrition } = Object.fromEntries(formData);
    if (!name || !imageUrl || !description || !nutrition) {
        return alert('All fields are required!');
    }
    await dataService.createFruit({ name, imageUrl, description, nutrition });
    context.goTo('/dashboard');
}