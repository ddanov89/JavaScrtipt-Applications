import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (product) => html`
<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                .value=${product.brand}
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                .value=${product.model}
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                .value=${product.imageUrl}
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                .value=${product.release}
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                .value=${product.designer}
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                .value=${product.value}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

let context = null;
let productId = null;

export async function showEditView(ctx) {
    debugger

    context = ctx;
    productId = context.params.id;
    const product = await dataService.productDetails(productId);
    context.render(editTemplate(product));
}

async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(formData);

    if (!brand || !model || !imageUrl || !release || !designer || !value) {
        return alert('All fields are required!');
    }

    await dataService.updateProduct(productId, { brand, model, imageUrl, release, designer, value });
    context.goTo(`/details/${productId}`);
}