import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const createTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />
              <button type="submit">post</button>
            </form>
          </div>
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
    const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(formData);
    if (!brand || !model || !imageUrl || !release || !designer || !value) {
        return alert('All fields are required!');
    }
    await dataService.createAProduct({ brand, model, imageUrl, release, designer, value });
    context.goTo('/dashboard');
}