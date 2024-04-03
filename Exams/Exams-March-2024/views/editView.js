import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { notification } from "./notification.js";

const editTemplate = (record) => html`
<section id="edit">
          <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form @submit=${onEdit} class="edit-form">
              <input type="text" name="item" id="item" placeholder="Item" .value=${record.item} />
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
                .value=${record.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value=${record.price}
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
                .value=${record.availability}
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
                .value=${record.type}
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
              >${record.description}</textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

let context = null;
let recordId = null;

export async function showEditView(ctx) {
    context = ctx;
    recordId = context.params.id;
    const record = await dataService.recordDetails(recordId);
    context.render(editTemplate(record));
}

async function onEdit(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const { item, imageUrl, price, availability, type, description } = Object.fromEntries(formData);

    if (!item || !imageUrl || !price || !availability || !type || !description) {
        return notification('All fields are required!');
    }
    await dataService.updateARecord(recordId, { item, imageUrl, price, availability, type, description });
    context.goTo(`/details/${recordId}`);
}