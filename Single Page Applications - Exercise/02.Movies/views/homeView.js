import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";

const homeTemplate = (movies, userId) => html`
<section id="home-page" class="view-section">
  <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40">
      <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg" class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px"/>
    <h1 class="display-4">Movies</h1>
    <p class="lead"> Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
</div>
  <h1 class="text-center">Movies</h1>
  ${userId
    ? html`
    <section id="add-movie-button" class="user">
    <a href="addMovie" class="btn btn-warning">Add Movie</a>`
    : ""
  }
  </section>
  <section id="movie">
    <div class="mt-3">
      <div class="row d-flex d-wrap">
        <ul id="movies-list" class="card-deck d-flex justify-content-center">
          ${movies.length > 0
    ? movies.map(movieCardTemplate)
    : null
  }
        </ul>
      </div>
    </div>
  </section>
</section>
`;

const movieCardTemplate = (movie) => html`
<section>
<img src=${movie.img} class="img-fluid" alt="Responsive image" style="width: 90%; height: 400px"/>
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}">
            <button data-id=${movie._id} type="button" class="btn btn-info"> Details </button>
        </a>
    </div>
    </section>
`;

export async function showHomeView(ctx) {
  const userData = userHelper.getUserData();
  const userId = userData?._id;
  const movies = await dataService.getAllMovies();
  ctx.render(homeTemplate(movies, userId));
}