import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const createMovieTemplate = () => html`
<section id="add-movie" class="view-section">
        <form @submit=${onCreate}
          id="add-movie-form"
          class="text-center border border-light p-5"
          action="#"
          method=""
        >
          <h1>Add Movie</h1>
          <div class="form-group">
            <label for="title">Movie Title</label>
            <input
              id="title"
              type="text"
              class="form-control"
              placeholder="Title"
              name="title"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea id='description'
              class="form-control"
              placeholder="Description"
              name="description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input
              id="imageUrl"
              type="text"
              class="form-control"
              placeholder="Image Url"
              name="img"
              value=""
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </section>

`;

let context = null;

export function showCreateView(ctx) {
  context = ctx;
  context.render(createMovieTemplate());
}

async function onCreate(event) {

  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const img = document.getElementById('imageUrl').value;
  if (!title || !description || !img) {
    return alert("All fields are required!");
  }
  await dataService.createAMovie({ title, description, img });
  context.goTo('/');
}