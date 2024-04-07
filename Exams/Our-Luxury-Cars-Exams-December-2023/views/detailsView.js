import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsViewTemplate = (car, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src='./..${car.imageUrl}' alt="example1" />
            <p id="details-title">${car.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="price">Price: €${car.price}</p>
                <p class="weight">Weight: ${car.weight} kg</p>
                <p class="top-speed">Top Speed: ${car.speed} kph</p>
                <p id="car-description">${car.about}</p>
              </div>
              ${isOwner ? getButtons(car._id) : ""}
            </div>
          </div>
        </section>
`;

function getButtons(id) {
    return html `
    <div id="action-buttons">
        <a href=/edit/${id} id="edit-btn">Edit</a>
        <a href=/delete/${id} id="delete-btn">Delete</a>
    </div>
    `;
}

export async function showDetailsView(ctx) {
    const carId = ctx.params.id;
    const car = await dataService.getCarDetails(carId);
    const isOwner = userHelper.hasOwner(car._ownerId);
    ctx.render(detailsViewTemplate(car, isOwner));
}