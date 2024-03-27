import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const productsTemplate = (products) => html`
<h2>Products</h2>
        <section id="dashboard">
        ${products.length > 0
        ? products.map(productTemplate)
        : html`<h2>No products yet.</h2>`}
        </section>
`;

const productTemplate = (product) => html`
<div class="product">
            <img src="../.${product.imageUrl}" alt="example1" />
            <p class="title">${product.name}</p>
            <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
            <a class="details-btn" href="/details/${product._id}">Details</a>
          </div>
`;

export async function showDashboardView(ctx) {
    const products = await dataService.getAllProducts();
    ctx.render(productsTemplate(products));
}