import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";


const dashboardTemplate = (cars) => html`
<h3 class="heading">Our Cars</h3>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${cars.length > 0 ? cars.map(car => carCardTemplate(car)) : noCarsTemplate()}
        </section>
        <!-- Display an h2 if there are no posts -->
`;

const carCardTemplate = (car) => html`
<div id=${car._ownerId} class="car">
            <img src='../.${car.imageUrl}' alt="example1" />
            <h3 class="model">${car.model}</h3>
            <div class="specs">
              <p class="price">Price: €${car.price}</p>
              <p class="weight">Weight: ${car.weight} kg</p>
              <p class="top-speed">Top Speed: ${car.speed} kph</p>
            </div>
            <a class="details-btn" href="/details/${car._id}">More Info</a>
          </div>
`;

const noCarsTemplate = () => html`
<h3 class="nothing">Nothing to see yet</h3>
`;

export async function showDashboardView(ctx) {
    const cars = await dataService.getAllCars();
    ctx.render(dashboardTemplate(cars));
}