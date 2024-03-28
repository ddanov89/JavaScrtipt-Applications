import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";

const editViewTemplate = (fact) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              .value=${fact.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${fact.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
          >${fact.description}</textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
          >${fact.moreInfo}</textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
`;

let context = null;
let id = null;

export async function ShowEditView(ctx) {
    context = ctx;
    id = ctx.params.id;
    const fact = await dataService.getFunFactDetails(id);
    ctx.render(editViewTemplate(fact));
}

async function onSubmit(event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const category = formData.get('category');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const moreInfo = formData.get('additional-info');
    
    if (!category || !imageUrl || !description || !moreInfo) {
        return alert('All fields are required!');
    }
    
    await dataService.updateAFact({ category, imageUrl, description, moreInfo }, id);
    context.goTo(`/details/${id}`);
}