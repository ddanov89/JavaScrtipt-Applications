import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";


const createTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form @submit=${onCreate} class="create-form">
              <input type="text" name="name" id="name" placeholder="Product Name"/>
              <input type="text" name="imageUrl" id="product-image" placeholder="Product Image"/>
              <input type="text" name="category" id="product-category" placeholder="Category"/>
              <textarea id="product-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>
              <input type="text" name="price" id="product-price" placeholder="Price"/>
              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;

let context = null;

export async function showCreateView(ctx) {
    context = ctx;
    context.render(createTemplate());

}

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { name, imageUrl, category, description, price } = Object.fromEntries(formData);

    if (!name || !imageUrl || !category || !description || !price) {
        return alert("All fields are required!");
    }
    await dataService.createProduct({ name, imageUrl, category, description, price });
    context.goTo('/dashboard');
}