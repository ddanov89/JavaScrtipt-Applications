import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (event) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                .value=${event.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                .value=${event.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                .value=${event.category}
              />
              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${event.description}</textarea>
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              .value=${event.date}
            />
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

let context = null;
let eventId = null;

export async function showEditView(ctx) {
    context = ctx;
    eventId = context.params.id;
    const event = await dataService.eventDetails(eventId);
    context.render(editTemplate(event));
}

async function onEdit(event) {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    const {name, imageUrl, category, description, date} = Object.fromEntries(formData);
    if (!name || !imageUrl || !category || !description || !date) {
        return alert("All fields are required!");
    }
    await dataService.updateAnEvent(eventId, {name, imageUrl, category, description, date});
    context.goTo(`/details/${eventId}`);
}