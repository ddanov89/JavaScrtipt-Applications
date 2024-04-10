import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (car, isOWner) => html`
<section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${car.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${car.brand}</li>
                    <li><span>Model:</span>${car.model}</li>
                    <li><span>Year:</span>${car.year}</li>
                    <li><span>Price:</span>${car.price}$</li>
                </ul>
                <p class="description-para">${car.description}</p>
                ${isOWner
        ? getButton(car._id)
        : null}
            </div>
        </section>
`;

function getButton(id) {
    return html`
     <div class="listings-buttons">
                    <a href="/edit/${id}" class="button-list">Edit</a>
                    <a href="/delete/${id}" class="button-list">Delete</a>
                </div>
                `;
}



export async function showDetailsView(ctx) {

    const carId = ctx.params.id;
    const car = await dataService.listingDetails(carId);
    const isOWner = userHelper.isOWner(car._ownerId);
    ctx.render(detailsTemplate(car, isOWner));
}