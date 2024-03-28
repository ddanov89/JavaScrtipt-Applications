import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { userHelper } from "../util/userHelper.js";

const createFunFactTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
`;
let context = null;

export function showCreateView(ctx) {
  context = ctx;
  ctx.render(createFunFactTemplate());

}

async function onCreate(event) {

  event.preventDefault();

  const formData = new FormData(event.target);
  const category = formData.get('category');
  const imageUrl = formData.get('image-url');
  const description = formData.get('description');
  const moreInfo = formData.get('additional-info');

  if (!category || !imageUrl || !description || !moreInfo) {
    return alert('All fields must be completed!');
  }

  await dataService.createAFunFact({ category, imageUrl, description, moreInfo });
  context.goTo('/dashboard');
}