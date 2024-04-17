import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (solution) => html`
<section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
                .value=${solution.type}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${solution.imageUrl}
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
              >${solution.description}</textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
              >${solution.learnMore}</textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

let context = null;
let solutionId = null;

export async function showEditView(ctx) {
    context = ctx;
    solutionId = context.params.id;
    const solution = await dataService.solutionDetails(solutionId);
    context.render(editTemplate(solution));
}

async function onEdit(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const type = formData.get('type');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const learnMore = formData.get('more-info');
    if (!type || !imageUrl || !description || !learnMore) {
        return alert('All fields are required!');
    }
    await dataService.updateASolution(solutionId, { type, imageUrl, description, learnMore });
    context.goTo(`/details/${solutionId}`);
}