import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const createTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Create Offer</h2>
            <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
              />
              <button type="submit">post</button>
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
    const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(formData);

    if (!title || !imageUrl || !category || !description || !requirements || !salary) {
        return alert('All fields are required!');
    }
    
    await dataService.createAnOffer({ title, imageUrl, category, description, requirements, salary });
    context.goTo('/dashboard');
}