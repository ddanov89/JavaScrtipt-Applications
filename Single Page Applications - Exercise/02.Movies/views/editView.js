import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";

const editTemplate = (movie) => html`
<section id="edit-movie" class="view-section">
        <form @submit=${onEdit} class="text-center border border-light p-5" action="#" method="">
          <h1>Edit Movie</h1>
          <div class="form-group">
            <label for="title">Movie Title</label>
            <input
              id="title"
              type="text"
              class="form-control"
              placeholder="Movie Title"
              name="title"
              .value="${movie.title}"
            />
          </div>
          <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea
              class="form-control"
              placeholder="Movie Description..."
              name="description"
            >${movie.description}</textarea>
          </div>
          <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input
              id="imageUrl"
              type="text"
              class="form-control"
              placeholder="Image Url"
              .value=${movie.img}
              name="img"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </section>
`;

let context = null;
let movieId = null;
export async function showEditView(ctx) {
    context = ctx;
    movieId = context.params.id;
    const movies = await dataService.getAllMovies();
    const movie = movies.filter(x => x._id == movieId)[0];
    context.render(editTemplate(movie));
}

async function onEdit(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const { title, description, img } = Object.fromEntries(formData);
    if (!title || !description || !img) {
        return alert('All fields are required!');
    }
    await dataService.updateMovie(movieId, { title, description, img });
    context.goTo(`/details/${movieId}`);
}