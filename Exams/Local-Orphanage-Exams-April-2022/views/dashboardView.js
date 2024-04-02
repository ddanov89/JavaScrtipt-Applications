import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../services/dataService.js";


const postsTemplate = (posts) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    <div class="all-posts">
    ${ posts && posts.length > 0
        ? posts.map(postTemplate)
        : html`<h1 class="title no-posts-title">No posts yet!</h1>`}
    </div>
</section>
`;

const postTemplate = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src="${post.imageUrl}" alt="Kids clothes">
    <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>
`;

export async function showDashboardView(ctx) {
    const id = ctx.params.id;
    const posts = await dataService.getAllPosts(id);
    ctx.render(postsTemplate(posts));
}