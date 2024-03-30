import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";
import { userHelper } from "../util/userHelper.js";


const detailsTemplate = (game, isOwner, hasUser, comments) => html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">
                <div class="game-header">
                    <img class="game-img" src="${game.imageUrl}" />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>
                <p class="text">${game.summary}</p>
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        ${comments && comments.length > 0
        ? comments.map(commentTemplate)
        : html`<p class="no-comment">No comments.</p>`
    }
                    </ul>
                </div>
                ${isOwner
        ? getButtons(game._id)
        : ''}
            </div>
            ${hasUser && !isOwner
        ? html`<article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>`
        : ""}
        </section>
`;


const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>
`;
function getButtons(id) {
    return html`
    <div class="buttons">
        <a href="/edit/${id}" class="button">Edit</a>
        <a href="/delete/${id}" class="button">Delete</a>                
    </div>
    `;
}

let context = null;
let gameId = null;
let isOwner = null;
let hasUser = null;
let game = null;

export async function showDetailsView(ctx) {

    context = ctx;
    gameId = context.params.id;
    game = await dataService.gameDetails(gameId);
    isOwner = userHelper.isOwner(game._ownerId);
    const user = userHelper.getUserData();
    hasUser = !!user;
    const comments = await dataService.getAllCommentsByGame(gameId);
    context.render(detailsTemplate(game, isOwner, hasUser, comments));
}
async function onComment(event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    const comment = formData.get('comment');
    await dataService.postAComment({ gameId, comment });
    const comments = await dataService.getAllCommentsByGame(gameId);
    context.render(detailsTemplate(game, isOwner, hasUser, comments));
    event.target.reset();
}