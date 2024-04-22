import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const detailsTemplate = (movie, hasLiked, hasUser, isOwner, totalLikes) => html`
<section id="movie-example" class="view-section">
        <div class="container">
          <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${movie.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>${movie.description}</p>
              ${hasUser
    ? isOwner
      ? getButtons(movie._id)
      : !hasLiked
        ? html`<a class="btn btn-primary" href="javascript:void(0)" @click=${onLike}>Like</a>`
        : ''
    : ""
  }
              <span class="enrolled-span">Liked ${totalLikes}</span>
            </div>
          </div>
        </div>
      </section>
  `;

function getButtons(id) {
  return html`
    <a class="btn btn-danger" href="/delete/${id}">Delete</a>
    <a class="btn btn-warning" href="/edit/${id}">Edit</a>
`;
}

let context = null;
let movieId = null;
let movie = null;
let hasLiked = null;
let isOwner = null;
let hasUser = null;
let userId = null;

export async function showDetailsView(ctx) {
  context = ctx;
  movieId = context.params.id;
  const user = userHelper.getUserData();
  userId = user?._id;
  hasUser = !!user;
  const movies = await dataService.getAllMovies();
  movie = movies.filter(x => x._id == movieId)[0];
  const isOwner = userHelper.isOwner(movie?._ownerId);
  const totalLikes = await dataService.getTotalLikes(movieId);
  hasLiked = await dataService.hasLiked(movieId, userId);
  context.render(detailsTemplate(movie, hasLiked, hasUser, isOwner, totalLikes));
}

async function onLike(event) {
  await dataService.postALike({ movieId });
  hasLiked = await dataService.hasLiked(movieId, userId);
  const totalLikes = await dataService.getTotalLikes(movieId);
  context.render(detailsTemplate(movie, hasLiked, hasUser, isOwner, totalLikes));
}