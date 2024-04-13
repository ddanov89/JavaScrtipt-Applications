import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { notify } from "../util/notification.js";


const editTemplate = (item) => html`
<section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form @submit=${onEdit} class="edit-form">
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  .value=${item.model}
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  .value=${item.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                .value=${item.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value=${item.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value=${item.contact}
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
              >${item.about}</textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`;

let context = null;
let id = null;

export async function showEditView(ctx) {
    context = ctx;
    id = context.params.id;
    const item = await dataService.itemDetails(id);
    context.render(editTemplate(item));
}

async function onEdit(event) {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    const { model, imageUrl, year, mileage, contact, about } = Object.fromEntries(formData);

    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
        return alert("All fields are required!");
    }
    await dataService.updateAnItem(id, { model, imageUrl, year, mileage, contact, about });
    context.goTo(`/details/${id}`);
}