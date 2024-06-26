import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (car) => html`
<section id="edit-listing">
            <div class="container">
                <form @submit=${onEdit} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>
                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value="${car.brand}">
                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value="${car.model}">
                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value="${car.description}">
                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value="${car.year}">
                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${car.imageUrl}">
                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value="${car.price}">
                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
`;

let context = null;
let carId = null;

export async function showEditView(ctx) {
    context = ctx;
    carId = context.params.id;
    const car = await dataService.listingDetails(carId);
    context.render(editTemplate(car));
}

async function onEdit(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { brand, model, description, year, imageUrl, price } = Object.fromEntries(formData);

    if (!brand || !model || !description || !year || !imageUrl || !price) {
        return alert('All fields are required!');
    }

    await dataService.createAListing(carId, { brand, model, description, year, imageUrl, price });
    context.goTo(`/details/${carId}`);
}