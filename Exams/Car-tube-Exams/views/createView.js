import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const createTemplate = () => html`
<section id="create-listing">
            <div class="container">
                <form @submit=${onCreate} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>
                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">
                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">
                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">
                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">
                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">
                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">
                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
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
    const { brand, model, description, year, imageUrl, price } = Object.fromEntries(formData);

    if (!brand || !model || !description || !year || !imageUrl || !price) {
        return alert('All fields are required!');
    }
    await dataService.createAListing({ brand, model, description, year, imageUrl, price });
    context.goTo('/dashboard');
}