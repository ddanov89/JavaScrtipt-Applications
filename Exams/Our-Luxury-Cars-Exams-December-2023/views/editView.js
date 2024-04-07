import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (car) => html`
<section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form @submit=${onEdit} class="edit-form">
              <input type="text" name="model" id="model" placeholder="Model" 
              value=${car.model} />
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
                value=${car.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                value=${car.price}
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
                value=${car.weight}
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
                value=${car.speed}
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              >${car.about}</textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

let context = null;
let id = null;

export async function showEditView(ctx) {
    context = ctx;
    id = context.params.id;
    const car = await dataService.getCarDetails(id);
    context.render(editTemplate(car));
}

async function onEdit(e) {
    
    e.preventDefault();
    
    const formData = new FormData(e.target);
    let { model, imageUrl, price, weight, speed, about } = Object.fromEntries(formData);
    if (!model || !weight || !imageUrl || !price || !speed || !about) {
        return alert('Edit error! All fields must be filled!');
    }
    
    const car = { model, imageUrl, price, weight, speed, about };
    await dataService.updateCar(id, car);
    context.goTo(`/details/${id}`);
}