import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (offer) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${offer.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${offer.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${offer.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              >${offer.description}</textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              >${offer.requirements}</textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${offer.salary}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

let context = null;
let id = null;

export async function showEditView(ctx) {
    
    context = ctx;
    id = ctx.params.id;
    const offer = await dataService.offerDetails(id);
    context.render(editTemplate(offer));
}

async function onEdit(event) {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(formData);

    if (!title || !imageUrl || !category || !description || !requirements || !salary) {
        return alert('All fields are required!');
    }
    await dataService.updateOffer(id, { title, imageUrl, category, description, requirements, salary });
    context.goTo(`/details/${id}`);
}