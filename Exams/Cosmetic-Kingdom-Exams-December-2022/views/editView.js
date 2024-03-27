import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";


const editTemplate = (product) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value=${product.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value=${product.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value=${product.category}
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${product.description}</textarea>

              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value=${product.price}
              />
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
    const product = await dataService.getProductDetails(id);
    context.render(editTemplate(product));
}

async function onEdit(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { name, imageUrl, category, description, price } = Object.fromEntries(formData);

    if (!name || !imageUrl || !category || !description || !price) {
        return alert("All fields are required!");
    }
    await dataService.updateAProduct(id, { name, imageUrl, category, description, price });
    context.goTo(`/details/${id}`);
}