import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const createTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
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
    const { name, imageUrl, category, description, date } = Object.fromEntries(formData);
    if (!name || !imageUrl || !category || !description || !date) {
        return alert("All fields are required!");
    }
    await dataService.createAnEvent({ name, imageUrl, category, description, date });
    context.goTo('/');
}